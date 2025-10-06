# kolam_analyzer.py
"""
Kolam analyzer backend using Flask.
Requires: opencv-python, numpy, scikit-image, matplotlib, flask, flask-cors

To run:
1. Make sure you have a virtual environment set up and activated in the `backend` folder.
2. Install the required libraries:
   pip install -r requirements.txt
3. Run the Flask app:
   python kolam_analyzer.py
"""
import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from skimage.filters import threshold_otsu
from skimage.morphology import skeletonize, remove_small_objects
from skimage.measure import label, regionprops

app = Flask(__name__)
CORS(app)  # This will allow your frontend to make requests to this backend

def analyze_kolam(image_stream):
    """
    Analyzes an image of a Kolam design to extract its features using advanced classification.
    """
    # Read the image from the stream provided by the HTTP request
    nparr = np.frombuffer(image_stream.read(), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError("Could not decode image from stream")

    # 1. Preprocessing
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    thresh = threshold_otsu(gray)
    bw = gray < thresh  # Assuming dark lines on a light background
    bw_cleaned = remove_small_objects(bw, min_size=100)

    # 2. Dot Detection
    labeled_dots = label(bw_cleaned == 0)
    props = regionprops(labeled_dots)
    dots = [p.centroid for p in props if 50 < p.area < 2000 and p.solidity > 0.8]

    # 3. Curve and Loop Detection
    contours, _ = cv2.findContours((bw_cleaned * 255).astype(np.uint8),
                                     cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    closed_loops = [c for c in contours if cv2.contourArea(c) > 200]

    # 4. Circularity Analysis
    all_points = np.vstack(contours) if contours else np.array([])
    if all_points.any():
        (_, _), radius = cv2.minEnclosingCircle(all_points)
        circle_area = np.pi * radius**2
        contours_area = sum(cv2.contourArea(c) for c in contours)
        circularity = contours_area / circle_area if circle_area > 0 else 0
    else:
        circularity = 0

    # 5. NEW Classification Logic
    if circularity > 0.65:
        design_type = "Mandala Kolam"
    elif len(dots) > 5:
        if len(closed_loops) > 3:
            design_type = "Pulli Kolam"
        else:
            design_type = "Sikku Kolam"
    else:
        design_type = "Freestyle Rangoli"

    return {
        "dots": len(dots),
        "curves": len(contours),
        "closed_loops": len(closed_loops),
        "circularity": round(circularity, 2),
        "classification": design_type,
    }

@app.route("/api/kolam_analyzer", methods=["POST"])
def analyze():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        try:
            analysis_results = analyze_kolam(file.stream)
            return jsonify(analysis_results)
        except Exception as e:
            return jsonify({"error": str(e)}), 500

# This part is for local development and will be ignored by Vercel
if __name__ == "__main__":
    app.run(debug=True, port=5001)


"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Navigation } from "~/components/landing/navigation";

// Define the structure for the analysis results
interface AnalysisResult {
  dots: number;
  curves: number;
  closed_loops: number;
  circularity: number;
  classification: string;
}

export default function AnalyzeKolamPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const headerStyle = {
    backgroundColor: "#5ba293",
    color: "white",
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      // Reset previous results
      setAnalysis(null);
      setError(null);
    }
  };

  const handleAnalyzeClick = async () => {
    if (!selectedFile) {
      setError("Please select a file to analyze.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Send the image to the Python backend
      const response = await fetch("/api/kolam_analyzer", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Server responded with an error: ${response.statusText}`
        );
      }

      const data: AnalysisResult = await response.json();
      setAnalysis(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(
          `Failed to analyze the image. Please ensure the backend server is running. ${err.message}`
        );
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <main className="relative z-10 container mx-auto p-4 md:p-8 pt-24">
        <div className="text-center mb-12 floating-element">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">
            Kolam Analyzer
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Upload your Kolam to explore its geometric beauty and cultural
            meaning.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Side: Upload and Preview */}
          <Card className="hover-lift glass-morphism border-2 border-border/50 shadow-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                Upload Your Design
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center gap-6">
                <div className="w-full ">
                  <Input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleFileChange}
                    className="w-full h-12 text-lg border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    Supports PNG, JPEG, and JPG formats
                  </p>
                </div>

                {preview && (
                  <div className="mt-6 w-full">
                    <div className="relative border-4 border-dashed border-primary/30 p-4 rounded-2xl bg-gradient-to-br from-card/50 to-muted/30 backdrop-blur-sm">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt="Selected Kolam"
                        className="max-w-full h-auto rounded-xl mx-auto shadow-lg transition-transform hover:scale-105"
                        style={{ maxHeight: "400px" }}
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleAnalyzeClick}
                  disabled={isLoading || !selectedFile}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Analyzing Design...
                      </>
                    ) : (
                      "Analyze Design"
                    )}
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Right Side: Analysis Results */}
          <Card className="hover-lift glass-morphism border-2 border-border/50 shadow-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="min-h-[400px]">
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                  <p className="text-lg text-muted-foreground animate-pulse">
                    Analyzing your beautiful design...
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-destructive/10 border-2 border-destructive/30 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-destructive text-xl">⚠</span>
                  </div>
                  <p className="text-destructive font-medium">{error}</p>
                </div>
              )}

              {analysis ? (
                <div className="space-y-6">
                  {/* Classification highlight */}
                  <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/30 rounded-2xl p-6 text-center">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Classification
                    </h3>
                    <p className="text-3xl font-bold text-primary">
                      {analysis.classification}
                    </p>
                  </div>

                  {/* Detailed metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card/50 border border-border rounded-xl p-4 text-center hover:bg-card/70 transition-colors">
                      <div className="text-2xl font-bold text-foreground">
                        {analysis.dots}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        Detected Dots
                      </div>
                    </div>
                    <div className="bg-card/50 border border-border rounded-xl p-4 text-center hover:bg-card/70 transition-colors">
                      <div className="text-2xl font-bold text-foreground">
                        {analysis.curves}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        Detected Curves
                      </div>
                    </div>
                    <div className="bg-card/50 border border-border rounded-xl p-4 text-center hover:bg-card/70 transition-colors">
                      <div className="text-2xl font-bold text-foreground">
                        {analysis.closed_loops}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        Closed Loops
                      </div>
                    </div>
                    <div className="bg-card/50 border border-border rounded-xl p-4 text-center hover:bg-card/70 transition-colors">
                      <div className="text-2xl font-bold text-foreground">
                        {analysis.circularity.toFixed(3)}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        Circularity Score
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-accent/10 to-secondary/10 border border-accent/30 rounded-xl p-6">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <span className="text-accent">✨</span>
                      Cultural Insights
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Your {analysis.classification.toLowerCase()} design
                      showcases the mathematical precision inherent in
                      traditional Indian art forms. The {analysis.dots} dots and{" "}
                      {analysis.curves} curves create a harmonious pattern that
                      reflects centuries of cultural wisdom.
                    </p>
                  </div>
                </div>
              ) : (
                !isLoading &&
                !error && (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                    <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center">
                      <span className="text-3xl">🎨</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Ready to Analyze
                      </h3>
                      <p className="text-muted-foreground">
                        Upload a Kolam image to discover its geometric patterns
                        and cultural significance.
                      </p>
                    </div>
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="glass-morphism border border-border/50">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                About the Analyzer
              </h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary text-xl">🔍</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Pattern Recognition
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced algorithms detect dots, curves, and geometric
                    patterns in your designs.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-secondary text-xl">📐</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Mathematical Analysis
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Calculates circularity scores and identifies structural
                    elements of traditional art.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-accent text-xl">🎭</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Cultural Context
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Provides insights into the cultural significance and
                    artistic traditions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

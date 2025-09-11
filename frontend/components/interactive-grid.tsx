"use client";

import { useState, useRef, useCallback } from "react";
import { Stage, Layer, Line, Circle, Arc, Rect } from "react-konva";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RotateCcw, Download, Palette } from "lucide-react";
import Konva from "konva";

const GRID_SIZE = 25;
const CELL_SIZE = 20;
const CANVAS_WIDTH = GRID_SIZE * CELL_SIZE;
const CANVAS_HEIGHT = GRID_SIZE * CELL_SIZE;

export function InteractiveGrid() {
  const [drawLines, setDrawLines] = useState<any[]>([]); // free drawing lines data
  const [patternShapes, setPatternShapes] = useState<JSX.Element[]>([]); // JSX elements for sample pattern
  const isDrawing = useRef(false);
  const stageRef = useRef<Konva.Stage>(null);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    const pos = e.target.getStage()?.getPointerPosition();
    if (pos) {
      setDrawLines([...drawLines, { points: [pos.x, pos.y] }]);
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    if (point) {
      setDrawLines((prevLines) => {
        const newLines = [...prevLines];
        const lastLine = { ...newLines[newLines.length - 1] };
        lastLine.points = [...lastLine.points, point.x, point.y];
        newLines[newLines.length - 1] = lastLine;
        return newLines;
      });
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const clearGrid = useCallback(() => {
    setDrawLines([]);
    setPatternShapes([]);
  }, []);

  const createSymmetricPattern = useCallback(() => {
    const spacing = CELL_SIZE * 2;
    const size = 9; // Larger 9x9 pattern size
    const centerX = CANVAS_WIDTH / 2;
    const centerY = CANVAS_HEIGHT / 2;
    const startX = centerX - ((size - 1) * spacing) / 2;
    const startY = centerY - ((size - 1) * spacing) / 2;

    const newShapes: JSX.Element[] = [];

    for (let i = 0; i < size - 1; i++) {
      for (let j = 0; j < size - 1; j++) {
        if (
          Math.abs(i - (size - 2) / 2) + Math.abs(j - (size - 2) / 2) <=
          (size - 2) / 2
        ) {
          const topLeft = { x: startX + i * spacing, y: startY + j * spacing };
          const topRight = {
            x: startX + (i + 1) * spacing,
            y: startY + j * spacing,
          };
          const bottomRight = {
            x: startX + (i + 1) * spacing,
            y: startY + (j + 1) * spacing,
          };
          const bottomLeft = {
            x: startX + i * spacing,
            y: startY + (j + 1) * spacing,
          };
          const arcRadius = spacing / 4;

          newShapes.push(
            <Arc
              key={`arc-tl-${i}-${j}`}
              x={topLeft.x + arcRadius}
              y={topLeft.y + arcRadius}
              innerRadius={arcRadius}
              outerRadius={arcRadius}
              angle={90}
              rotation={180}
              stroke="black"
              strokeWidth={2}
            />,
            <Arc
              key={`arc-tr-${i}-${j}`}
              x={topRight.x - arcRadius}
              y={topRight.y + arcRadius}
              innerRadius={arcRadius}
              outerRadius={arcRadius}
              angle={90}
              rotation={270}
              stroke="black"
              strokeWidth={2}
            />,
            <Arc
              key={`arc-br-${i}-${j}`}
              x={bottomRight.x - arcRadius}
              y={bottomRight.y - arcRadius}
              innerRadius={arcRadius}
              outerRadius={arcRadius}
              angle={90}
              rotation={0}
              stroke="black"
              strokeWidth={2}
            />,
            <Arc
              key={`arc-bl-${i}-${j}`}
              x={bottomLeft.x + arcRadius}
              y={bottomLeft.y - arcRadius}
              innerRadius={arcRadius}
              outerRadius={arcRadius}
              angle={90}
              rotation={90}
              stroke="black"
              strokeWidth={2}
            />
          );
        }
      }
    }

    setPatternShapes(newShapes);
    setDrawLines([]); // clear user drawing when showing pattern
  }, []);

  const handleExport = () => {
    const uri = stageRef.current?.toDataURL();
    if (uri) {
      const link = document.createElement("a");
      link.download = "kolam.png";
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const dots = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      dots.push(
        <Circle
          key={`${i}-${j}`}
          x={i * CELL_SIZE + CELL_SIZE / 2}
          y={j * CELL_SIZE + CELL_SIZE / 2}
          radius={1}
          fill="gray"
        />
      );
    }
  }

  return (
    <section
      id="create"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Interactive Kolam Designer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Use our interactive canvas to design your own Kolam patterns. Click
            and drag to draw and create beautiful, symmetric designs.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Interactive Canvas */}
          <div>
            <Card className="shadow-lg border rounded-2xl">
              <CardHeader>
                <CardTitle>Interactive Kolam Canvas</CardTitle>
                <CardDescription>
                  Click and drag to create patterns. Follow the traditional
                  principles of symmetry and flow.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Toolbar */}
                <div className="flex flex-wrap gap-2 mb-6 items-center justify-center lg:justify-start">
                  <Button
                    onClick={createSymmetricPattern}
                    variant="outline"
                    size="sm"
                  >
                    <Palette className="h-4 w-4 mr-2" />
                    Sample Pattern
                  </Button>
                  <Button
                    onClick={clearGrid}
                    variant="outline"
                    size="sm"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Clear Grid
                  </Button>
                  <Button
                    onClick={handleExport}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Save Design
                  </Button>
                </div>

                {/* Canvas */}
                <div className="p-0 rounded-xl border shadow-sm overflow-hidden bg-white">
                  <Stage
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    ref={stageRef}
                    className="block"
                    style={{ background: "white", borderRadius: "0.75rem" }}
                  >
                    <Layer>
                      <Rect
                        x={0}
                        y={0}
                        width={CANVAS_WIDTH}
                        height={CANVAS_HEIGHT}
                        fill="white"
                        listening={false} // prevents capturing pointer events
                      />
                      {dots}
                    </Layer>
                    <Layer>
                      {drawLines.map((line, idx) => (
                        <Line
                          key={idx}
                          points={line.points}
                          stroke="black"
                          strokeWidth={2}
                          tension={0.5}
                          lineCap="round"
                        />
                      ))}
                      {patternShapes}
                    </Layer>
                  </Stage>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Instructions */}
          <div className="space-y-6">
            <Card className="max-w-md mx-auto lg:mx-0 shadow border rounded-xl">
              <CardHeader>
                <CardTitle>How to Create</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">1. Start Drawing</h4>
                  <p className="text-sm text-muted-foreground">
                    Click and drag on the canvas to start drawing your Kolam
                    lines.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">2. Create Patterns</h4>
                  <p className="text-sm text-muted-foreground">
                    Draw continuous lines that flow around the grid of dots.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">3. Maintain Symmetry</h4>
                  <p className="text-sm text-muted-foreground">
                    Traditional Kolams are symmetric. Try to balance your design
                    from the center.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">4. Complete the Loop</h4>
                  <p className="text-sm text-muted-foreground">
                    Authentic Kolams form closed loops, symbolizing the eternal
                    cycle of life.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="max-w-md mx-auto lg:mx-0 shadow border rounded-xl">
              <CardHeader>
                <CardTitle>Traditional Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Try recreating these classic Kolam motifs:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Lotus (Padma)
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Peacock (Mayil)
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Star (Nakshatra)
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Spiral (Chakra)
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

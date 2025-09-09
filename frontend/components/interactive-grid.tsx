"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RotateCcw, Download, Palette } from "lucide-react"

const GRID_SIZE = 15

export function InteractiveGrid() {
  const [grid, setGrid] = useState<boolean[][]>(
    Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(false)),
  )
  const [isDrawing, setIsDrawing] = useState(false)

  const toggleDot = useCallback((row: number, col: number) => {
    setGrid((prev) => {
      const newGrid = prev.map((r) => [...r])
      newGrid[row][col] = !newGrid[row][col]
      return newGrid
    })
  }, [])

  const handleMouseDown = useCallback(
    (row: number, col: number) => {
      setIsDrawing(true)
      toggleDot(row, col)
    },
    [toggleDot],
  )

  const handleMouseEnter = useCallback(
    (row: number, col: number) => {
      if (isDrawing) {
        toggleDot(row, col)
      }
    },
    [isDrawing, toggleDot],
  )

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false)
  }, [])

  const clearGrid = useCallback(() => {
    setGrid(
      Array(GRID_SIZE)
        .fill(null)
        .map(() => Array(GRID_SIZE).fill(false)),
    )
  }, [])

  const createSymmetricPattern = useCallback(() => {
    setGrid((prev) => {
      const newGrid = prev.map((r) => [...r])
      const center = Math.floor(GRID_SIZE / 2)

      // Create a simple symmetric pattern
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          const distanceFromCenter = Math.sqrt((i - center) ** 2 + (j - center) ** 2)
          if (distanceFromCenter > 2 && distanceFromCenter < 6) {
            newGrid[i][j] = true
          }
        }
      }

      return newGrid
    })
  }, [])

  return (
    <section id="create" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Interactive Kolam Designer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Use our interactive grid to design your own Kolam patterns. Click and drag to connect dots and create
            beautiful, symmetric designs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interactive Grid */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Kolam Grid</CardTitle>
                <CardDescription>
                  Click and drag to create patterns. Follow the traditional principles of symmetry and flow.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Button onClick={createSymmetricPattern} variant="outline" size="sm">
                    <Palette className="h-4 w-4 mr-2" />
                    Sample Pattern
                  </Button>
                  <Button onClick={clearGrid} variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Clear Grid
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Save Design
                  </Button>
                </div>

                <div
                  className="inline-block p-4 bg-card border border-border rounded-lg"
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
                    {grid.map((row, rowIndex) =>
                      row.map((isActive, colIndex) => (
                        <button
                          key={`${rowIndex}-${colIndex}`}
                          className={`w-4 h-4 rounded-full border transition-all duration-150 ${
                            isActive
                              ? "bg-primary border-primary shadow-sm"
                              : "bg-background border-border hover:border-primary/50"
                          }`}
                          onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                          onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                        />
                      )),
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Instructions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>How to Create</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">1. Start with Dots</h4>
                  <p className="text-sm text-muted-foreground">
                    Click on the grid to place dots. These form the foundation of your Kolam.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">2. Create Patterns</h4>
                  <p className="text-sm text-muted-foreground">
                    Drag to connect dots and form continuous lines that flow around the grid.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">3. Maintain Symmetry</h4>
                  <p className="text-sm text-muted-foreground">
                    Traditional Kolams are symmetric. Try to balance your design from the center.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">4. Complete the Loop</h4>
                  <p className="text-sm text-muted-foreground">
                    Authentic Kolams form closed loops, symbolizing the eternal cycle of life.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traditional Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Try recreating these classic Kolam motifs:</p>
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
  )
}

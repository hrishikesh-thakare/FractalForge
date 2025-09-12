// frontend/utils/svgPathGenerator.ts

import { Grid, PathInstruction } from "~/types/kolam";

export class SVGPathGenerator {
  /**
   * Converts abstract [row, col] coordinates to SVG [x, y] coordinates.
   */
  private static gridToSvgCoords(
    point: [number, number],
    grid: Grid,
    padding = 50,
    scale = 100
  ): [number, number] {
    const [row, col] = point;
    const x = col * scale + padding;
    const y = row * scale + padding;
    return [x, y];
  }

  /**
   * Generates an SVG path string from a series of high-level instructions.
   */
  static generatePathFromInstructions(
    instructions: PathInstruction[],
    grid: Grid
  ): string {
    let pathData = "";

    instructions.forEach((instruction) => {
      if (instruction.type === "move") {
        const [x, y] = this.gridToSvgCoords(instruction.to, grid);
        pathData += `M ${x} ${y} `;
      } else if (instruction.type === "curve") {
        const [cp1x, cp1y] = this.gridToSvgCoords(instruction.cp1, grid);
        const [cp2x, cp2y] = this.gridToSvgCoords(instruction.cp2, grid);
        const [tox, toy] = this.gridToSvgCoords(instruction.to, grid);
        pathData += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${tox} ${toy} `;
      }
    });

    return pathData.trim();
  }
}

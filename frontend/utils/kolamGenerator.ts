// frontend/utils/kolamGenerator.ts

import {
  KOLAM_CURVE_PATTERNS,
  CONNECTIVITY_RULES,
  PATTERN_COMPATIBILITY,
} from "~/data/kolamCurvePatterns";
import {
  KolamPattern,
  CurvePoint,
  Dot,
  Line,
  KolamGrid,
  GridCell,
  Grid,
} from "~/types/kolam";
import { kolamPatternsNew } from "~/data/kolamPatternsNew";
import { SVGPathGenerator } from "./svgPathGenerator";

export class KolamGenerator {
  private static readonly CELL_SPACING = 60;

  // Core constants for kolam generation from zen-kolam
  private static readonly pt_dn = CONNECTIVITY_RULES.pt_dn;
  private static readonly pt_rt = CONNECTIVITY_RULES.pt_rt;
  private static readonly mate_pt_dn = CONNECTIVITY_RULES.mate_pt_dn;
  private static readonly mate_pt_rt = CONNECTIVITY_RULES.mate_pt_rt;
  private static readonly h_inv = CONNECTIVITY_RULES.h_inv;
  private static readonly v_inv = CONNECTIVITY_RULES.v_inv;
  private static readonly h_self = KolamGenerator.findSelfInverse(
    CONNECTIVITY_RULES.h_inv
  );
  private static readonly v_self = KolamGenerator.findSelfInverse(
    CONNECTIVITY_RULES.v_inv
  );

  /**
   * Find self-inverse elements: find(h_inv==1:16)
   */
  private static findSelfInverse(inv: number[]): number[] {
    const result: number[] = [];
    for (let i = 0; i < inv.length; i++) {
      if (inv[i] === i + 1) {
        // 1-indexed array handling
        result.push(i + 1);
      }
    }
    return result;
  }

  /**
   * Array intersection function
   */
  private static intersect(arr1: number[], arr2: number[]): number[] {
    return arr1.filter((x) => arr2.includes(x));
  }

  /**
   * Random array element selector
   */
  private static randomChoice(arr: number[]): number {
    if (arr.length === 0) return 1; // Default fallback
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * Create matrix filled with ones: ones(size)
   */
  private static ones(size: number): number[][] {
    const matrix: number[][] = [];
    for (let i = 0; i < size; i++) {
      matrix[i] = new Array(size).fill(1);
    }
    return matrix;
  }

  /**
   * Literal translation of propose_kolam1D.m from zen-kolam
   */
  static proposeKolam1D(size_of_kolam: number): number[][] {
    const odd = size_of_kolam % 2 !== 0;

    let hp: number;
    if (odd) {
      hp = Math.floor((size_of_kolam - 1) / 2);
    } else {
      hp = size_of_kolam / 2;
    }

    const Mat = this.ones(hp + 2); // Need hp+2 for the algorithm

    // Fill initial matrix pattern
    for (let i = 1; i <= hp; i++) {
      for (let j = 1; j <= hp; j++) {
        // Valid_by_Up=mate_pt_dn{pt_dn(Mat(i-1,j))+1};
        const ptDnValue = this.pt_dn[Mat[i - 1][j] - 1];
        const Valid_by_Up =
          this.mate_pt_dn[(ptDnValue + 1) as keyof typeof this.mate_pt_dn];

        // Valid_by_Lt=mate_pt_rt{pt_rt(Mat(i,j-1))+1};
        const ptRtValue = this.pt_rt[Mat[i][j - 1] - 1];
        const Valid_by_Lt =
          this.mate_pt_rt[(ptRtValue + 1) as keyof typeof this.mate_pt_rt];

        const Valids = this.intersect(Valid_by_Up, Valid_by_Lt);

        try {
          const V = this.randomChoice(Valids);
          Mat[i][j] = V;
        } catch {
          Mat[i][j] = 1;
        }
      }
    }

    // Set boundary conditions
    Mat[hp + 1][0] = 1;
    Mat[0][hp + 1] = 1;

    // Fill row boundary with vertical symmetry
    for (let j = 1; j <= hp; j++) {
      const ptDnValue = this.pt_dn[Mat[hp][j] - 1];
      const Valid_by_Up =
        this.mate_pt_dn[(ptDnValue + 1) as keyof typeof this.mate_pt_dn];

      const ptRtValue = this.pt_rt[Mat[hp + 1][j - 1] - 1];
      const Valid_by_Lt =
        this.mate_pt_rt[(ptRtValue + 1) as keyof typeof this.mate_pt_rt];

      let Valids = this.intersect(Valid_by_Up, Valid_by_Lt);
      Valids = this.intersect(Valids, this.v_self);

      try {
        const V = this.randomChoice(Valids);
        Mat[hp + 1][j] = V;
      } catch {
        Mat[hp + 1][j] = 1;
      }
    }

    // Fill column boundary with horizontal symmetry
    for (let i = 1; i <= hp; i++) {
      const ptDnValue = this.pt_dn[Mat[i - 1][hp + 1] - 1];
      const Valid_by_Up =
        this.mate_pt_dn[(ptDnValue + 1) as keyof typeof this.mate_pt_dn];

      const ptRtValue = this.pt_rt[Mat[i][hp] - 1];
      const Valid_by_Lt =
        this.mate_pt_rt[(ptRtValue + 1) as keyof typeof this.mate_pt_rt];

      let Valids = this.intersect(Valid_by_Up, Valid_by_Lt);
      Valids = this.intersect(Valids, this.h_self);

      try {
        const V = this.randomChoice(Valids);
        Mat[i][hp + 1] = V;
      } catch {
        Mat[i][hp + 1] = 1;
      }
    }

    // Fill corner with both symmetries
    const ptDnValue = this.pt_dn[Mat[hp][hp + 1] - 1];
    const Valid_by_Up =
      this.mate_pt_dn[(ptDnValue + 1) as keyof typeof this.mate_pt_dn];

    const ptRtValue = this.pt_rt[Mat[hp + 1][hp] - 1];
    const Valid_by_Lt =
      this.mate_pt_rt[(ptRtValue + 1) as keyof typeof this.mate_pt_rt];

    let Valids = this.intersect(Valid_by_Up, Valid_by_Lt);
    Valids = this.intersect(Valids, this.h_self);
    Valids = this.intersect(Valids, this.v_self);

    try {
      const V = this.randomChoice(Valids);
      Mat[hp + 1][hp + 1] = V;
    } catch {
      Mat[hp + 1][hp + 1] = 1;
    }

    // Create symmetric pattern matrix
    const Mat1: number[][] = [];
    for (let i = 1; i <= hp; i++) {
      Mat1[i - 1] = [];
      for (let j = 1; j <= hp; j++) {
        Mat1[i - 1][j - 1] = Mat[i][j];
      }
    }

    // Apply transformations for symmetry
    const Mat2: number[][] = [];
    for (let i = 0; i < hp; i++) {
      Mat2[i] = [];
      for (let j = hp - 1; j >= 0; j--) {
        Mat2[i][hp - 1 - j] = this.h_inv[Mat1[i][j] - 1];
      }
    }

    const Mat3: number[][] = [];
    for (let i = hp - 1; i >= 0; i--) {
      Mat3[hp - 1 - i] = [];
      for (let j = 0; j < hp; j++) {
        Mat3[hp - 1 - i][j] = this.v_inv[Mat1[i][j] - 1];
      }
    }

    const Mat4: number[][] = [];
    for (let i = hp - 1; i >= 0; i--) {
      Mat4[hp - 1 - i] = [];
      for (let j = 0; j < hp; j++) {
        Mat4[hp - 1 - i][j] = this.v_inv[Mat2[i][j] - 1];
      }
    }

    // Final assembly based on odd/even
    let M: number[][];
    if (odd) {
      const size = 2 * hp + 1;
      M = Array(size)
        .fill(null)
        .map(() => Array(size).fill(1));

      // Copy quadrants with boundary
      for (let i = 0; i < hp; i++) {
        for (let j = 0; j < hp; j++) {
          M[i][j] = Mat1[i][j];
        }
      }

      // Copy boundary elements
      for (let i = 1; i < hp + 1; i++) {
        M[i - 1][hp] = Mat[i][hp + 1];
      }

      for (let i = 0; i < hp; i++) {
        for (let j = 0; j < hp; j++) {
          M[i][hp + 1 + j] = Mat2[i][j];
        }
      }

      for (let j = 1; j < hp + 2; j++) {
        M[hp][j - 1] = Mat[hp + 1][j];
      }

      for (let i = 0; i < hp; i++) {
        for (let j = 0; j < hp; j++) {
          M[hp + 1 + i][j] = Mat3[i][j];
        }
      }

      for (let i = 0; i < hp; i++) {
        for (let j = 0; j < hp; j++) {
          M[hp + 1 + i][hp + 1 + j] = Mat4[i][j];
        }
      }
    } else {
      const size = 2 * hp;
      M = Array(size)
        .fill(null)
        .map(() => Array(size).fill(1));

      // Copy quadrants
      for (let i = 0; i < hp; i++) {
        for (let j = 0; j < hp; j++) {
          M[i][j] = Mat1[i][j];
        }
      }

      for (let i = 0; i < hp; i++) {
        for (let j = 0; j < hp; j++) {
          M[i][hp + j] = Mat2[i][j];
        }
      }

      for (let i = 0; i < hp; i++) {
        for (let j = 0; j < hp; j++) {
          M[hp + i][j] = Mat3[i][j];
        }
      }

      for (let i = 0; i < hp; i++) {
        for (let j = 0; j < hp; j++) {
          M[hp + i][hp + j] = Mat4[i][j];
        }
      }
    }

    return M;
  }

  /**
   * Convert matrix to visual kolam pattern using draw_kolam logic
   */
  static drawKolam(M: number[][]): KolamPattern {
    const m = M.length;
    const n = M[0].length;

    // Flip vertically to match MATLAB convention
    const flippedM: number[][] = [];
    for (let i = m - 1; i >= 0; i--) {
      flippedM[m - 1 - i] = [...M[i]];
    }

    const dots: Dot[] = [];
    const curves: Line[] = [];

    // Generate dots for each cell
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        // Add dot at grid position
        dots.push({
          id: `dot-${i}-${j}`,
          center: {
            x: (j + 1) * this.CELL_SPACING,
            y: (i + 1) * this.CELL_SPACING,
          },
          radius: 3,
          color: "#ffffff",
          filled: true,
          row: i,
          col: j,
        });
      }
    }

    // Generate traditional Kolam connecting curves based on the matrix values
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        const patternValue = flippedM[i][j];
        if (patternValue > 0) {
          // Create connecting curves based on pattern value
          this.addKolamConnections(curves, i, j, m, n, patternValue);
        }
      }
    }

    // Create legacy grid structure for backward compatibility
    const legacyDots: Dot[] = dots.map((dot) => ({
      ...dot,
      row: dot.row || 0,
      col: dot.col || 0,
    }));

    const legacyGrid: Grid = {
      rows: m,
      cols: n,
      dots: legacyDots,
    };

    return {
      id: `kolam-${m}x${n}`,
      name: `Zen Kolam ${m}×${n}`,
      grid: legacyGrid,
      curves,
      dots,
      lines: curves, // For backward compatibility
      symmetryType: "1D",
      dimensions: {
        width: (n + 1) * this.CELL_SPACING,
        height: (m + 1) * this.CELL_SPACING,
      },
      created: new Date(),
      modified: new Date(),
    };
  }

  /**
   * Add traditional Kolam connecting curves based on pattern value
   */
  private static addKolamConnections(
    curves: Line[],
    row: number,
    col: number,
    totalRows: number,
    totalCols: number,
    patternValue: number
  ): void {
    const centerX = (col + 1) * this.CELL_SPACING;
    const centerY = (row + 1) * this.CELL_SPACING;
    const offset = this.CELL_SPACING * 0.3; // Distance from center for curves

    // Create different connection patterns based on pattern value
    const patterns = [
      // Pattern 1: Horizontal line through center
      () =>
        this.createHorizontalCurve(curves, row, col, centerX, centerY, offset),
      // Pattern 2: Vertical line through center
      () =>
        this.createVerticalCurve(curves, row, col, centerX, centerY, offset),
      // Pattern 3: Diagonal from top-left to bottom-right
      () =>
        this.createDiagonalCurve(
          curves,
          row,
          col,
          centerX,
          centerY,
          offset,
          "tlbr"
        ),
      // Pattern 4: Diagonal from top-right to bottom-left
      () =>
        this.createDiagonalCurve(
          curves,
          row,
          col,
          centerX,
          centerY,
          offset,
          "trbl"
        ),
      // Pattern 5: L-shape (horizontal then vertical)
      () =>
        this.createLShapeCurve(
          curves,
          row,
          col,
          centerX,
          centerY,
          offset,
          "hr"
        ),
      // Pattern 6: L-shape (vertical then horizontal)
      () =>
        this.createLShapeCurve(
          curves,
          row,
          col,
          centerX,
          centerY,
          offset,
          "vr"
        ),
      // Pattern 7: Curved arc top to right
      () =>
        this.createArcCurve(curves, row, col, centerX, centerY, offset, "tr"),
      // Pattern 8: Curved arc right to bottom
      () =>
        this.createArcCurve(curves, row, col, centerX, centerY, offset, "rb"),
      // Pattern 9: Curved arc bottom to left
      () =>
        this.createArcCurve(curves, row, col, centerX, centerY, offset, "bl"),
      // Pattern 10: Curved arc left to top
      () =>
        this.createArcCurve(curves, row, col, centerX, centerY, offset, "lt"),
      // Pattern 11: S-curve horizontal
      () => this.createSCurve(curves, row, col, centerX, centerY, offset, "h"),
      // Pattern 12: S-curve vertical
      () => this.createSCurve(curves, row, col, centerX, centerY, offset, "v"),
      // Pattern 13: Loop top
      () =>
        this.createLoopCurve(curves, row, col, centerX, centerY, offset, "top"),
      // Pattern 14: Loop right
      () =>
        this.createLoopCurve(
          curves,
          row,
          col,
          centerX,
          centerY,
          offset,
          "right"
        ),
      // Pattern 15: Loop bottom
      () =>
        this.createLoopCurve(
          curves,
          row,
          col,
          centerX,
          centerY,
          offset,
          "bottom"
        ),
      // Pattern 16: Loop left
      () =>
        this.createLoopCurve(
          curves,
          row,
          col,
          centerX,
          centerY,
          offset,
          "left"
        ),
    ];

    // Use pattern value to select curve type (1-16)
    const patternIndex = Math.max(
      0,
      Math.min(patterns.length - 1, patternValue - 1)
    );
    patterns[patternIndex]();
  }

  private static createHorizontalCurve(
    curves: Line[],
    row: number,
    col: number,
    centerX: number,
    centerY: number,
    offset: number
  ): void {
    const path = `M ${centerX - offset} ${centerY} L ${
      centerX + offset
    } ${centerY}`;
    curves.push({
      id: `curve-h-${row}-${col}`,
      start: { x: centerX - offset, y: centerY },
      end: { x: centerX + offset, y: centerY },
      strokeWidth: 2,
      color: "#ffffff",
      path: path,
    });
  }

  private static createVerticalCurve(
    curves: Line[],
    row: number,
    col: number,
    centerX: number,
    centerY: number,
    offset: number
  ): void {
    const path = `M ${centerX} ${centerY - offset} L ${centerX} ${
      centerY + offset
    }`;
    curves.push({
      id: `curve-v-${row}-${col}`,
      start: { x: centerX, y: centerY - offset },
      end: { x: centerX, y: centerY + offset },
      strokeWidth: 2,
      color: "#ffffff",
      path: path,
    });
  }

  private static createDiagonalCurve(
    curves: Line[],
    row: number,
    col: number,
    centerX: number,
    centerY: number,
    offset: number,
    direction: "tlbr" | "trbl"
  ): void {
    let path: string;
    if (direction === "tlbr") {
      path = `M ${centerX - offset} ${centerY - offset} L ${centerX + offset} ${
        centerY + offset
      }`;
    } else {
      path = `M ${centerX + offset} ${centerY - offset} L ${centerX - offset} ${
        centerY + offset
      }`;
    }
    curves.push({
      id: `curve-d-${direction}-${row}-${col}`,
      start:
        direction === "tlbr"
          ? { x: centerX - offset, y: centerY - offset }
          : { x: centerX + offset, y: centerY - offset },
      end:
        direction === "tlbr"
          ? { x: centerX + offset, y: centerY + offset }
          : { x: centerX - offset, y: centerY + offset },
      strokeWidth: 2,
      color: "#ffffff",
      path: path,
    });
  }

  private static createLShapeCurve(
    curves: Line[],
    row: number,
    col: number,
    centerX: number,
    centerY: number,
    offset: number,
    type: "hr" | "vr"
  ): void {
    let path: string;
    if (type === "hr") {
      path = `M ${
        centerX - offset
      } ${centerY} L ${centerX} ${centerY} L ${centerX} ${centerY - offset}`;
    } else {
      path = `M ${centerX} ${centerY - offset} L ${centerX} ${centerY} L ${
        centerX + offset
      } ${centerY}`;
    }
    curves.push({
      id: `curve-l-${type}-${row}-${col}`,
      start:
        type === "hr"
          ? { x: centerX - offset, y: centerY }
          : { x: centerX, y: centerY - offset },
      end:
        type === "hr"
          ? { x: centerX, y: centerY - offset }
          : { x: centerX + offset, y: centerY },
      strokeWidth: 2,
      color: "#ffffff",
      path: path,
    });
  }

  private static createArcCurve(
    curves: Line[],
    row: number,
    col: number,
    centerX: number,
    centerY: number,
    offset: number,
    direction: "tr" | "rb" | "bl" | "lt"
  ): void {
    let path: string;
    let start: { x: number; y: number };
    let end: { x: number; y: number };

    switch (direction) {
      case "tr":
        start = { x: centerX, y: centerY - offset };
        end = { x: centerX + offset, y: centerY };
        path = `M ${start.x} ${start.y} Q ${centerX + offset / 2} ${
          centerY - offset / 2
        } ${end.x} ${end.y}`;
        break;
      case "rb":
        start = { x: centerX + offset, y: centerY };
        end = { x: centerX, y: centerY + offset };
        path = `M ${start.x} ${start.y} Q ${centerX + offset / 2} ${
          centerY + offset / 2
        } ${end.x} ${end.y}`;
        break;
      case "bl":
        start = { x: centerX, y: centerY + offset };
        end = { x: centerX - offset, y: centerY };
        path = `M ${start.x} ${start.y} Q ${centerX - offset / 2} ${
          centerY + offset / 2
        } ${end.x} ${end.y}`;
        break;
      case "lt":
        start = { x: centerX - offset, y: centerY };
        end = { x: centerX, y: centerY - offset };
        path = `M ${start.x} ${start.y} Q ${centerX - offset / 2} ${
          centerY - offset / 2
        } ${end.x} ${end.y}`;
        break;
    }

    curves.push({
      id: `curve-arc-${direction}-${row}-${col}`,
      start: start,
      end: end,
      strokeWidth: 2,
      color: "#ffffff",
      path: path,
    });
  }

  private static createSCurve(
    curves: Line[],
    row: number,
    col: number,
    centerX: number,
    centerY: number,
    offset: number,
    orientation: "h" | "v"
  ): void {
    let path: string;
    let start: { x: number; y: number };
    let end: { x: number; y: number };

    if (orientation === "h") {
      start = { x: centerX - offset, y: centerY };
      end = { x: centerX + offset, y: centerY };
      path = `M ${start.x} ${start.y} Q ${centerX - offset / 2} ${
        centerY - offset / 2
      } ${centerX} ${centerY} Q ${centerX + offset / 2} ${
        centerY + offset / 2
      } ${end.x} ${end.y}`;
    } else {
      start = { x: centerX, y: centerY - offset };
      end = { x: centerX, y: centerY + offset };
      path = `M ${start.x} ${start.y} Q ${centerX - offset / 2} ${
        centerY - offset / 2
      } ${centerX} ${centerY} Q ${centerX + offset / 2} ${
        centerY + offset / 2
      } ${end.x} ${end.y}`;
    }

    curves.push({
      id: `curve-s-${orientation}-${row}-${col}`,
      start: start,
      end: end,
      strokeWidth: 2,
      color: "#ffffff",
      path: path,
    });
  }

  private static createLoopCurve(
    curves: Line[],
    row: number,
    col: number,
    centerX: number,
    centerY: number,
    offset: number,
    position: "top" | "right" | "bottom" | "left"
  ): void {
    let path: string;
    let start: { x: number; y: number };
    let end: { x: number; y: number };

    switch (position) {
      case "top":
        start = { x: centerX - offset / 2, y: centerY };
        end = { x: centerX + offset / 2, y: centerY };
        path = `M ${start.x} ${start.y} Q ${centerX} ${centerY - offset} ${
          end.x
        } ${end.y}`;
        break;
      case "right":
        start = { x: centerX, y: centerY - offset / 2 };
        end = { x: centerX, y: centerY + offset / 2 };
        path = `M ${start.x} ${start.y} Q ${centerX + offset} ${centerY} ${
          end.x
        } ${end.y}`;
        break;
      case "bottom":
        start = { x: centerX + offset / 2, y: centerY };
        end = { x: centerX - offset / 2, y: centerY };
        path = `M ${start.x} ${start.y} Q ${centerX} ${centerY + offset} ${
          end.x
        } ${end.y}`;
        break;
      case "left":
        start = { x: centerX, y: centerY + offset / 2 };
        end = { x: centerX, y: centerY - offset / 2 };
        path = `M ${start.x} ${start.y} Q ${centerX - offset} ${centerY} ${
          end.x
        } ${end.y}`;
        break;
    }

    curves.push({
      id: `curve-loop-${position}-${row}-${col}`,
      start: start,
      end: end,
      strokeWidth: 2,
      color: "#ffffff",
      path: path,
    });
  }

  /**
   * Generate SVG path from curve points
   */
  private static generateSVGPath(points: CurvePoint[]): string {
    if (points.length === 0) return "";

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      const prevPoint = points[i - 1];

      if (point.controlX !== undefined && point.controlY !== undefined) {
        // Use control points if available
        path += ` Q ${point.controlX} ${point.controlY} ${point.x} ${point.y}`;
      } else {
        // Generate smooth curve using quadratic bezier
        const controlX = (prevPoint.x + point.x) / 2;
        const controlY = (prevPoint.y + point.y) / 2;
        path += ` Q ${controlX} ${controlY} ${point.x} ${point.y}`;
      }
    }

    return path;
  }

  /**
   * Main entry point - generate kolam pattern using zen-kolam algorithm
   */
  static generateKolam1D(size: number): KolamPattern {
    console.log(
      `🎨 Generating Zen Kolam of size ${size} using zen-kolam algorithm`
    );

    try {
      const matrix = this.proposeKolam1D(size);
      console.log(`📊 Generated matrix: ${matrix.length}x${matrix[0].length}`);

      // Convert to visual kolam pattern
      const pattern = this.drawKolam(matrix);
      console.log(
        `✅ Created kolam with ${pattern.dots.length} dots and ${
          pattern.curves?.length || 0
        } curves`
      );

      return pattern;
    } catch (error) {
      console.log(
        `⚠️ Zen algorithm failed for size ${size}, falling back to traditional patterns`
      );
      return this.generateFallbackKolam(size);
    }
  }

  /**
   * Fallback to traditional patterns when zen-kolam algorithm fails
   */
  static generateFallbackKolam(size: number): KolamPattern {
    // Filter patterns that are designed for the requested grid size
    const suitablePatterns = kolamPatternsNew.filter((p) => p.size === size);

    if (suitablePatterns.length === 0) {
      return this.generateSimpleKolam(size);
    }

    // Select a random pattern from the suitable ones
    const selectedPatternData =
      suitablePatterns[Math.floor(Math.random() * suitablePatterns.length)];

    // Create the grid of dots
    const dots: Dot[] = [];
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        dots.push({
          id: `dot-${row}-${col}`,
          row,
          col,
          center: {
            x: (col + 1) * this.CELL_SPACING,
            y: (row + 1) * this.CELL_SPACING,
          },
          radius: 3,
          color: "#ffffff",
          filled: true,
        });
      }
    }
    const grid: Grid = { rows: size, cols: size, dots };

    // Process the lines from the selected pattern data
    const lines: Line[] = selectedPatternData.lines.map((lineData, index) => {
      const path = SVGPathGenerator.generatePathFromInstructions(
        lineData.instructions,
        grid
      );
      return {
        id: `line-${index}`,
        path: path,
        start: { x: 0, y: 0 },
        end: { x: 0, y: 0 },
        strokeWidth: 2,
        color: "#ffffff",
      };
    });

    return {
      id: `fallback-kolam-${size}`,
      name: selectedPatternData.name,
      grid,
      lines,
      dots,
      curves: lines,
      dimensions: {
        width: (size + 1) * this.CELL_SPACING,
        height: (size + 1) * this.CELL_SPACING,
      },
    };
  }

  /**
   * Generate a simple traditional kolam for smaller sizes
   */
  static generateSimpleKolam(size: number): KolamPattern {
    const dots: Dot[] = [];
    const curves: Line[] = [];

    // Create simple dot grid
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        dots.push({
          id: `dot-${i}-${j}`,
          center: {
            x: (j + 1) * this.CELL_SPACING,
            y: (i + 1) * this.CELL_SPACING,
          },
          radius: 3,
          color: "#ffffff",
          filled: true,
          row: i,
          col: j,
        });
      }
    }

    // Add simple connecting curves
    const curvePoints: CurvePoint[] = [
      { x: this.CELL_SPACING, y: this.CELL_SPACING },
      { x: size * this.CELL_SPACING, y: this.CELL_SPACING },
      { x: size * this.CELL_SPACING, y: size * this.CELL_SPACING },
      { x: this.CELL_SPACING, y: size * this.CELL_SPACING },
      { x: this.CELL_SPACING, y: this.CELL_SPACING },
    ];

    const pathData = this.generateSVGPath(curvePoints);

    curves.push({
      id: `curve-border`,
      start: curvePoints[0],
      end: curvePoints[curvePoints.length - 1],
      curvePoints,
      strokeWidth: 2,
      color: "#ffffff",
      path: pathData,
    });

    const grid: Grid = {
      rows: size,
      cols: size,
      dots,
    };

    return {
      id: `simple-kolam-${size}x${size}`,
      name: `Simple Kolam ${size}×${size}`,
      grid,
      curves,
      dots,
      lines: curves,
      symmetryType: "1D",
      dimensions: {
        width: (size + 1) * this.CELL_SPACING,
        height: (size + 1) * this.CELL_SPACING,
      },
      created: new Date(),
      modified: new Date(),
    };
  }
}

/**
 * Legacy function for backward compatibility
 */
export function generateKolam1D(size: number): KolamPattern {
  return KolamGenerator.generateKolam1D(size);
}

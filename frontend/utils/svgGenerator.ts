// frontend/utils/svgGenerator.ts

import { KolamPattern } from '~/types/kolam';
import { SVGPathGenerator } from './svgPathGenerator';

export interface SVGOptions {
    width?: number;
    height?: number;
    padding?: number;
    brushColor?: string;
    brushWidth?: number;
    backgroundColor?: string;
    animationEnabled?: boolean;
    animationDuration?: number; // in seconds
}

export class SVGGenerator {
    /**
     * Creates the full SVG string for a given kolam pattern.
     */
    static createSVG(pattern: KolamPattern, options: SVGOptions = {}): { svg: string; width: number; height: number } {
        const {
            padding = 50,
            brushColor = '#FFFFFF',
            brushWidth = 5,
            backgroundColor = 'none',
            animationEnabled = false,
            animationDuration = 5,
        } = options;

        const grid = pattern.grid;
        const scale = 100; // The distance between dots
        const width = options.width || grid.cols * scale + padding * 2;
        const height = options.height || grid.rows * scale + padding * 2;

        const viewBox = `0 0 ${width} ${height}`;

        let animationStyles = '';
        if (animationEnabled) {
            animationStyles = `
        <style>
          .kolam-path {
            stroke-dasharray: var(--path-length);
            stroke-dashoffset: var(--path-length);
            animation: draw-line ${animationDuration}s ease-in-out forwards;
          }
          @keyframes draw-line {
            to {
              stroke-dashoffset: 0;
            }
          }
        </style>
      `;
        }

        const pathElements = pattern.lines.map(line => {
            const pathLength = animationEnabled ? this.calculatePathLength(line.path) : 0;
            return `<path
        d="${line.path}"
        fill="none"
        stroke="${brushColor}"
        stroke-width="${brushWidth}"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="kolam-path"
        style="--path-length: ${pathLength};"
      />`;
        }).join('\n');

        const svg = `
      <svg
        width="${width}"
        height="${height}"
        viewBox="${viewBox}"
        xmlns="http://www.w3.org/2000/svg"
        style="background-color: ${backgroundColor};"
      >
        ${animationStyles}
        <g>
          ${pathElements}
        </g>
      </svg>
    `;

        return { svg: svg.trim(), width, height };
    }

    /**
     * A helper function to calculate the length of an SVG path.
     * This requires a DOM environment (browser) to work.
     */
    private static calculatePathLength(pathData: string): number {
        if (typeof document === 'undefined') {
            return 1000; // Default length for non-browser environments
        }
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        return path.getTotalLength();
    }
}
// frontend/components/KolamDisplay.tsx

"use client";

import { KolamPattern } from "~/types/kolam";
import React, { useMemo } from "react";

interface KolamDisplayProps {
  pattern: KolamPattern;
  animate: boolean;
  animationState: "playing" | "paused" | "stopped";
  animationTiming: number; // Total duration in ms
  className?: string;
}

export const KolamDisplay: React.FC<KolamDisplayProps> = ({
  pattern,
  animate,
  animationState,
  animationTiming,
  className,
}) => {
  // Use pattern dimensions if available, otherwise calculate from grid
  const gridCols =
    "cols" in pattern.grid ? pattern.grid.cols : pattern.grid.size;
  const gridRows =
    "rows" in pattern.grid ? pattern.grid.rows : pattern.grid.size;
  const totalWidth = pattern.dimensions?.width || gridCols * 100 + 100;
  const totalHeight = pattern.dimensions?.height || gridRows * 100 + 100;
  const viewBox = `0 0 ${totalWidth} ${totalHeight}`;

  // Support both legacy lines and new curves structure
  const renderLines = pattern.curves || pattern.lines || [];

  // Memoize path lengths to avoid recalculating on every render
  const pathLengths = useMemo(() => {
    if (typeof document === "undefined") return []; // Guard for SSR
    return renderLines.map((line) => {
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute("d", line.path || "");
      return path.getTotalLength();
    });
  }, [renderLines]);

  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto max-w-2xl ${className}`}
      style={
        {
          "--animation-duration": `${animationTiming}ms`,
        } as React.CSSProperties
      }
    >
      <style>
        {`
          .kolam-path {
            stroke-dasharray: var(--path-length);
            stroke-dashoffset: ${animate ? "var(--path-length)" : "0"};
          }
          .animate .kolam-path {
            stroke-dashoffset: var(--path-length);
            animation: draw-line var(--animation-duration) ease-in-out forwards;
          }
          @keyframes draw-line {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
      <g className={animate ? "animate" : ""}>
        {/* Render the dot grid */}
        {pattern.dots?.map((dot) => {
          // Use dot center if available (new format), otherwise calculate from row/col (legacy)
          const x = dot.center?.x || (dot.col || 0) * 100 + 50;
          const y = dot.center?.y || (dot.row || 0) * 100 + 50;
          return (
            <circle
              key={dot.id}
              cx={x}
              cy={y}
              r={dot.radius || 3}
              fill={dot.color || "white"}
              opacity="0.6"
            />
          );
        })}

        {/* Render the pattern lines/curves */}
        {renderLines.map((line, index) => (
          <path
            key={line.id}
            d={line.path || ""}
            fill="none"
            stroke={line.color || "white"}
            strokeWidth={line.strokeWidth || 3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="kolam-path"
            style={
              {
                "--path-length": pathLengths[index] || 0,
              } as React.CSSProperties
            }
          />
        ))}
      </g>
    </svg>
  );
};

// frontend/data/kolamPatternsNew.ts

import { KolamPatternData } from "~/types/kolam";

// Authentic Kolam patterns following traditional rules
export const kolamPatternsNew: KolamPatternData[] = [
  // 3x3 Patterns - Simple traditional kolam with dots at intersections
  {
    name: "3x3 Simple Kolam",
    size: 3,
    lines: [
      {
        instructions: [
          // Starting from bottom-left, going around the center dot
          { type: "move", to: [0.2, 1.8] },
          { type: "curve", cp1: [0.2, 0.8], cp2: [0.8, 0.2], to: [1.8, 0.2] },
          { type: "curve", cp1: [2.8, 0.2], cp2: [2.8, 1.2], to: [1.8, 1.8] },
          { type: "curve", cp1: [1.2, 2.8], cp2: [0.2, 2.8], to: [0.2, 1.8] },
        ],
      },
    ],
  },
  {
    name: "3x3 Four Petals",
    size: 3,
    lines: [
      {
        instructions: [
          // Top petal
          { type: "move", to: [1, 0.2] },
          { type: "curve", cp1: [0.7, 0.7], cp2: [1.3, 0.7], to: [1, 0.2] },
        ],
      },
      {
        instructions: [
          // Right petal
          { type: "move", to: [2.8, 1] },
          { type: "curve", cp1: [2.3, 0.7], cp2: [2.3, 1.3], to: [2.8, 1] },
        ],
      },
      {
        instructions: [
          // Bottom petal
          { type: "move", to: [1, 2.8] },
          { type: "curve", cp1: [1.3, 2.3], cp2: [0.7, 2.3], to: [1, 2.8] },
        ],
      },
      {
        instructions: [
          // Left petal
          { type: "move", to: [0.2, 1] },
          { type: "curve", cp1: [0.7, 1.3], cp2: [0.7, 0.7], to: [0.2, 1] },
        ],
      },
    ],
  },

  // 4x4 Patterns
  {
    name: "4x4 Traditional Loop",
    size: 4,
    lines: [
      {
        instructions: [
          { type: "move", to: [0.2, 1.5] },
          { type: "curve", cp1: [0.2, 0.5], cp2: [1.5, 0.2], to: [2.5, 0.2] },
          { type: "curve", cp1: [3.8, 0.2], cp2: [3.8, 1.5], to: [3.8, 2.5] },
          { type: "curve", cp1: [3.8, 3.8], cp2: [2.5, 3.8], to: [1.5, 3.8] },
          { type: "curve", cp1: [0.2, 3.8], cp2: [0.2, 2.5], to: [0.2, 1.5] },
        ],
      },
    ],
  },
  {
    name: "4x4 Interlaced",
    size: 4,
    lines: [
      {
        instructions: [
          // Outer loop
          { type: "move", to: [0.3, 0.3] },
          { type: "curve", cp1: [1.5, 0.1], cp2: [2.5, 0.1], to: [3.7, 0.3] },
          { type: "curve", cp1: [3.9, 1.5], cp2: [3.9, 2.5], to: [3.7, 3.7] },
          { type: "curve", cp1: [2.5, 3.9], cp2: [1.5, 3.9], to: [0.3, 3.7] },
          { type: "curve", cp1: [0.1, 2.5], cp2: [0.1, 1.5], to: [0.3, 0.3] },
        ],
      },
      {
        instructions: [
          // Inner cross pattern
          { type: "move", to: [1.2, 1.2] },
          { type: "curve", cp1: [1.8, 1.2], cp2: [2.8, 1.2], to: [2.8, 1.8] },
          { type: "curve", cp1: [2.8, 2.8], cp2: [1.8, 2.8], to: [1.2, 2.8] },
          { type: "curve", cp1: [1.2, 1.8], cp2: [1.2, 1.2], to: [1.2, 1.2] },
        ],
      },
    ],
  },

  // 5x5 Patterns - More complex traditional designs
  {
    name: "5x5 Star Kolam",
    size: 5,
    lines: [
      {
        instructions: [
          // Center to top point
          { type: "move", to: [2, 0.2] },
          { type: "curve", cp1: [1.2, 1.2], cp2: [0.2, 1.8], to: [0.2, 2] },
          { type: "curve", cp1: [0.2, 2.2], cp2: [1.2, 2.8], to: [2, 4.8] },
          { type: "curve", cp1: [2.8, 2.8], cp2: [3.8, 2.2], to: [4.8, 2] },
          { type: "curve", cp1: [3.8, 1.8], cp2: [2.8, 1.2], to: [2, 0.2] },
        ],
      },
    ],
  },
  {
    name: "5x5 Flower Kolam",
    size: 5,
    lines: [
      {
        instructions: [
          // Outer boundary flowing around dots
          { type: "move", to: [1, 0.2] },
          { type: "curve", cp1: [2, 0.1], cp2: [3, 0.1], to: [4, 0.2] },
          { type: "curve", cp1: [4.8, 1], cp2: [4.8, 3], to: [4, 4.8] },
          { type: "curve", cp1: [3, 4.9], cp2: [2, 4.9], to: [1, 4.8] },
          { type: "curve", cp1: [0.2, 3], cp2: [0.2, 1], to: [1, 0.2] },
        ],
      },
      {
        instructions: [
          // Inner petals around center
          { type: "move", to: [2, 1.2] },
          { type: "curve", cp1: [1.2, 1.8], cp2: [1.2, 2.2], to: [2, 2.8] },
          { type: "curve", cp1: [2.8, 2.2], cp2: [2.8, 1.8], to: [2, 1.2] },
        ],
      },
    ],
  },

  // 6x6 Patterns
  {
    name: "6x6 Traditional Grid",
    size: 6,
    lines: [
      {
        instructions: [
          { type: "move", to: [1, 0.2] },
          { type: "curve", cp1: [3, 0.1], cp2: [5, 0.1], to: [5.8, 1] },
          { type: "curve", cp1: [5.9, 3], cp2: [5.9, 5], to: [5, 5.8] },
          { type: "curve", cp1: [3, 5.9], cp2: [1, 5.9], to: [0.2, 5] },
          { type: "curve", cp1: [0.1, 3], cp2: [0.1, 1], to: [1, 0.2] },
        ],
      },
      {
        instructions: [
          // Inner pattern weaving around center dots
          { type: "move", to: [2, 1.8] },
          { type: "curve", cp1: [2.2, 2], cp2: [2.8, 2], to: [3, 1.8] },
          { type: "curve", cp1: [3.2, 2], cp2: [3.8, 2], to: [4, 1.8] },
          { type: "curve", cp1: [3.8, 2.2], cp2: [3.8, 2.8], to: [4, 3] },
          { type: "curve", cp1: [3.8, 3.2], cp2: [3.8, 3.8], to: [4, 4] },
          { type: "curve", cp1: [3.8, 4.2], cp2: [3.2, 4.2], to: [3, 4] },
          { type: "curve", cp1: [2.8, 4.2], cp2: [2.2, 4.2], to: [2, 4] },
          { type: "curve", cp1: [1.8, 3.8], cp2: [1.8, 3.2], to: [2, 3] },
          { type: "curve", cp1: [1.8, 2.8], cp2: [1.8, 2.2], to: [2, 1.8] },
        ],
      },
    ],
  },

  // 7x7 Patterns
  {
    name: "7x7 Complex Kolam",
    size: 7,
    lines: [
      {
        instructions: [
          { type: "move", to: [3, 0.2] },
          { type: "curve", cp1: [1, 0.1], cp2: [0.1, 1], to: [0.1, 3] },
          { type: "curve", cp1: [0.1, 5], cp2: [1, 6.9], to: [3, 6.9] },
          { type: "curve", cp1: [5, 6.9], cp2: [6.9, 5], to: [6.9, 3] },
          { type: "curve", cp1: [6.9, 1], cp2: [5, 0.1], to: [3, 0.2] },
        ],
      },
      {
        instructions: [
          // Inner spiral pattern
          { type: "move", to: [2, 2] },
          { type: "curve", cp1: [4, 1.8], cp2: [5.2, 3], to: [5, 5] },
          { type: "curve", cp1: [4.8, 5.2], cp2: [3, 5.2], to: [2, 5] },
          { type: "curve", cp1: [1.8, 4], cp2: [1.8, 3], to: [2, 2] },
        ],
      },
    ],
  },

  // 8x8 Patterns
  {
    name: "8x8 Sacred Kolam",
    size: 8,
    lines: [
      {
        instructions: [
          { type: "move", to: [4, 0.2] },
          { type: "curve", cp1: [2, 0.1], cp2: [0.1, 2], to: [0.1, 4] },
          { type: "curve", cp1: [0.1, 6], cp2: [2, 7.9], to: [4, 7.9] },
          { type: "curve", cp1: [6, 7.9], cp2: [7.9, 6], to: [7.9, 4] },
          { type: "curve", cp1: [7.9, 2], cp2: [6, 0.1], to: [4, 0.2] },
        ],
      },
      {
        instructions: [
          // Inner lotus pattern
          { type: "move", to: [3, 2] },
          { type: "curve", cp1: [4, 1.8], cp2: [5, 2], to: [6, 3] },
          { type: "curve", cp1: [6.2, 4], cp2: [6, 5], to: [5, 6] },
          { type: "curve", cp1: [4, 6.2], cp2: [3, 6], to: [2, 5] },
          { type: "curve", cp1: [1.8, 4], cp2: [2, 3], to: [3, 2] },
        ],
      },
    ],
  },

  // 9x9 Patterns
  {
    name: "9x9 Elaborate Kolam",
    size: 9,
    lines: [
      {
        instructions: [
          { type: "move", to: [4, 0.2] },
          { type: "curve", cp1: [2, 0.1], cp2: [0.1, 2], to: [0.1, 4] },
          { type: "curve", cp1: [0.1, 6], cp2: [2, 8.9], to: [4, 8.9] },
          { type: "curve", cp1: [6, 8.9], cp2: [8.9, 6], to: [8.9, 4] },
          { type: "curve", cp1: [8.9, 2], cp2: [6, 0.1], to: [4, 0.2] },
        ],
      },
      {
        instructions: [
          // Multiple inner loops
          { type: "move", to: [3, 3] },
          { type: "curve", cp1: [5, 2.8], cp2: [6.2, 4], to: [6, 6] },
          { type: "curve", cp1: [5.8, 6.2], cp2: [4, 6.2], to: [3, 6] },
          { type: "curve", cp1: [2.8, 5], cp2: [2.8, 4], to: [3, 3] },
        ],
      },
    ],
  },

  // 10x10 Patterns
  {
    name: "10x10 Grand Kolam",
    size: 10,
    lines: [
      {
        instructions: [
          { type: "move", to: [5, 0.2] },
          { type: "curve", cp1: [2.5, 0.1], cp2: [0.1, 2.5], to: [0.1, 5] },
          { type: "curve", cp1: [0.1, 7.5], cp2: [2.5, 9.9], to: [5, 9.9] },
          { type: "curve", cp1: [7.5, 9.9], cp2: [9.9, 7.5], to: [9.9, 5] },
          { type: "curve", cp1: [9.9, 2.5], cp2: [7.5, 0.1], to: [5, 0.2] },
        ],
      },
      {
        instructions: [
          // Inner mandala
          { type: "move", to: [3, 3] },
          { type: "curve", cp1: [5, 2.8], cp2: [7.2, 4], to: [7, 7] },
          { type: "curve", cp1: [6.8, 7.2], cp2: [4, 7.2], to: [3, 7] },
          { type: "curve", cp1: [2.8, 6], cp2: [2.8, 4], to: [3, 3] },
        ],
      },
    ],
  },

  // 11x11 to 15x15 - Progressively more complex patterns
  {
    name: "11x11 Traditional Design",
    size: 11,
    lines: [
      {
        instructions: [
          { type: "move", to: [5, 0.2] },
          { type: "curve", cp1: [2.5, 0.1], cp2: [0.1, 2.5], to: [0.1, 5.5] },
          { type: "curve", cp1: [0.1, 8.5], cp2: [2.5, 10.9], to: [5.5, 10.9] },
          {
            type: "curve",
            cp1: [8.5, 10.9],
            cp2: [10.9, 8.5],
            to: [10.9, 5.5],
          },
          { type: "curve", cp1: [10.9, 2.5], cp2: [8.5, 0.1], to: [5, 0.2] },
        ],
      },
    ],
  },

  {
    name: "12x12 Sacred Pattern",
    size: 12,
    lines: [
      {
        instructions: [
          { type: "move", to: [6, 0.2] },
          { type: "curve", cp1: [3, 0.1], cp2: [0.1, 3], to: [0.1, 6] },
          { type: "curve", cp1: [0.1, 9], cp2: [3, 11.9], to: [6, 11.9] },
          { type: "curve", cp1: [9, 11.9], cp2: [11.9, 9], to: [11.9, 6] },
          { type: "curve", cp1: [11.9, 3], cp2: [9, 0.1], to: [6, 0.2] },
        ],
      },
    ],
  },

  {
    name: "13x13 Complex Design",
    size: 13,
    lines: [
      {
        instructions: [
          { type: "move", to: [6.5, 0.2] },
          { type: "curve", cp1: [3.5, 0.1], cp2: [0.1, 3.5], to: [0.1, 6.5] },
          { type: "curve", cp1: [0.1, 9.5], cp2: [3.5, 12.9], to: [6.5, 12.9] },
          {
            type: "curve",
            cp1: [9.5, 12.9],
            cp2: [12.9, 9.5],
            to: [12.9, 6.5],
          },
          { type: "curve", cp1: [12.9, 3.5], cp2: [9.5, 0.1], to: [6.5, 0.2] },
        ],
      },
    ],
  },

  {
    name: "14x14 Elaborate Pattern",
    size: 14,
    lines: [
      {
        instructions: [
          { type: "move", to: [7, 0.2] },
          { type: "curve", cp1: [3.5, 0.1], cp2: [0.1, 3.5], to: [0.1, 7] },
          { type: "curve", cp1: [0.1, 10.5], cp2: [3.5, 13.9], to: [7, 13.9] },
          {
            type: "curve",
            cp1: [10.5, 13.9],
            cp2: [13.9, 10.5],
            to: [13.9, 7],
          },
          { type: "curve", cp1: [13.9, 3.5], cp2: [10.5, 0.1], to: [7, 0.2] },
        ],
      },
    ],
  },

  {
    name: "15x15 Ultimate Kolam",
    size: 15,
    lines: [
      {
        instructions: [
          { type: "move", to: [7.5, 0.2] },
          { type: "curve", cp1: [4, 0.1], cp2: [0.1, 4], to: [0.1, 7.5] },
          { type: "curve", cp1: [0.1, 11], cp2: [4, 14.9], to: [7.5, 14.9] },
          { type: "curve", cp1: [11, 14.9], cp2: [14.9, 11], to: [14.9, 7.5] },
          { type: "curve", cp1: [14.9, 4], cp2: [11, 0.1], to: [7.5, 0.2] },
        ],
      },
      {
        instructions: [
          // Inner detailed pattern
          { type: "move", to: [5, 5] },
          { type: "curve", cp1: [7.5, 4.8], cp2: [10.2, 7.5], to: [10, 10] },
          { type: "curve", cp1: [9.8, 10.2], cp2: [7.5, 10.2], to: [5, 10] },
          { type: "curve", cp1: [4.8, 9.5], cp2: [4.8, 7.5], to: [5, 5] },
        ],
      },
    ],
  },
];

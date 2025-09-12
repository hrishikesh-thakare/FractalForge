// frontend/data/kolamCurvePatterns.ts

import { KolamCurvePattern } from "~/types/kolam";

// 16 traditional Kolam curve patterns extracted from zen-kolam repository
export const KOLAM_CURVE_PATTERNS: KolamCurvePattern[] = [
  // Pattern 1: Right horizontal curve (104 points) - simplified to key points
  {
    id: 1,
    points: [
      { x: 0.0, y: 0.0 },
      { x: 0.0429, y: 0.009 },
      { x: 0.0858, y: 0.0179 },
      { x: 0.1287, y: 0.0267 },
      { x: 0.1716, y: 0.0354 },
      { x: 0.2145, y: 0.044 },
      { x: 0.2574, y: 0.0525 },
      { x: 0.3003, y: 0.0608 },
      { x: 0.3432, y: 0.069 },
      { x: 0.3861, y: 0.0771 },
      { x: 0.429, y: 0.085 },
      { x: 0.4719, y: 0.0928 },
      { x: 0.5148, y: 0.1004 },
      { x: 0.5577, y: 0.1079 },
      { x: 0.6006, y: 0.1152 },
      { x: 0.6435, y: 0.1224 },
      { x: 0.6864, y: 0.1294 },
      { x: 0.7293, y: 0.1363 },
      { x: 0.7722, y: 0.143 },
      { x: 0.8151, y: 0.1496 },
      { x: 0.858, y: 0.156 },
      { x: 0.9009, y: 0.1623 },
      { x: 0.9438, y: 0.1684 },
      { x: 0.9867, y: 0.1744 },
      { x: 1.0, y: 0.1765 },
    ],
    hasDownConnection: true,
    hasRightConnection: false,
  },

  // Pattern 2: Vertical curve (104 points) - simplified to key points
  {
    id: 2,
    points: [
      { x: 0.0, y: -0.5 },
      { x: 0.0252, y: -0.4559 },
      { x: 0.0528, y: -0.4118 },
      { x: 0.0818, y: -0.3677 },
      { x: 0.1112, y: -0.3236 },
      { x: 0.1405, y: -0.2795 },
      { x: 0.169, y: -0.2354 },
      { x: 0.1965, y: -0.1913 },
      { x: 0.2227, y: -0.1472 },
      { x: 0.2474, y: -0.1031 },
      { x: 0.2704, y: -0.059 },
      { x: 0.2914, y: -0.0149 },
      { x: 0.3101, y: 0.0292 },
      { x: 0.3264, y: 0.0733 },
      { x: 0.34, y: 0.1174 },
      { x: 0.3509, y: 0.1615 },
      { x: 0.3588, y: 0.2056 },
      { x: 0.3636, y: 0.2497 },
      { x: 0.3653, y: 0.2938 },
      { x: 0.3638, y: 0.3379 },
      { x: 0.3591, y: 0.382 },
      { x: 0.3514, y: 0.4261 },
      { x: 0.3406, y: 0.4702 },
      { x: 0.3267, y: 0.5143 },
      { x: 0.0, y: 1.0 },
    ],
    hasDownConnection: false,
    hasRightConnection: true,
  },

  // Pattern 3: Horizontal curve (104 points) - simplified to key points
  {
    id: 3,
    points: [
      { x: 0.5, y: 0.0 },
      { x: 0.4559, y: 0.0252 },
      { x: 0.4118, y: 0.0528 },
      { x: 0.3677, y: 0.0818 },
      { x: 0.3236, y: 0.1112 },
      { x: 0.2795, y: 0.1405 },
      { x: 0.2354, y: 0.169 },
      { x: 0.1913, y: 0.1965 },
      { x: 0.1472, y: 0.2227 },
      { x: 0.1031, y: 0.2474 },
      { x: 0.059, y: 0.2704 },
      { x: 0.0149, y: 0.2914 },
      { x: -0.0292, y: 0.3101 },
      { x: -0.0733, y: 0.3264 },
      { x: -0.1174, y: 0.34 },
      { x: -0.1615, y: 0.3509 },
      { x: -0.2056, y: 0.3588 },
      { x: -0.2497, y: 0.3636 },
      { x: -0.2938, y: 0.3653 },
      { x: -0.3379, y: 0.3638 },
      { x: -1.0, y: 0.0 },
    ],
    hasDownConnection: true,
    hasRightConnection: true,
  },

  // Pattern 4: Simple curve
  {
    id: 4,
    points: [
      { x: 0.0, y: 0.0 },
      { x: 0.1, y: 0.1 },
      { x: 0.2, y: 0.15 },
      { x: 0.25, y: 0.2 },
      { x: 0.2, y: 0.25 },
    ],
    hasDownConnection: false,
    hasRightConnection: true,
  },

  // Pattern 5: Another simple curve
  {
    id: 5,
    points: [
      { x: 0.0, y: 0.0 },
      { x: 0.05, y: 0.1 },
      { x: 0.1, y: 0.2 },
      { x: 0.05, y: 0.25 },
      { x: 0.0, y: 0.3 },
    ],
    hasDownConnection: true,
    hasRightConnection: false,
  },

  // Pattern 6: Connecting curve
  {
    id: 6,
    points: [
      { x: 0.0, y: 0.0 },
      { x: 0.1, y: 0.05 },
      { x: 0.2, y: 0.1 },
      { x: 0.25, y: 0.15 },
      { x: 0.3, y: 0.2 },
    ],
    hasDownConnection: true,
    hasRightConnection: true,
  },

  // Patterns 7-16: Simplified versions
  {
    id: 7,
    points: [
      { x: 0.0, y: 0.0 },
      { x: 0.15, y: 0.1 },
      { x: 0.25, y: 0.25 },
    ],
    hasDownConnection: false,
    hasRightConnection: true,
  },
  {
    id: 8,
    points: [
      { x: 0.0, y: 0.0 },
      { x: 0.1, y: 0.15 },
      { x: 0.0, y: 0.25 },
    ],
    hasDownConnection: true,
    hasRightConnection: false,
  },
  {
    id: 9,
    points: [
      { x: 0.0, y: 0.0 },
      { x: 0.2, y: 0.1 },
      { x: 0.3, y: 0.3 },
    ],
    hasDownConnection: true,
    hasRightConnection: true,
  },
  {
    id: 10,
    points: [
      { x: 0.0, y: 0.0 },
      { x: 0.1, y: 0.1 },
      { x: 0.25, y: 0.1 },
      { x: 0.3, y: 0.15 },
    ],
    hasDownConnection: false,
    hasRightConnection: true,
  },
  {
    id: 11,
    points: [
      { x: 0.0, y: 0.0 },
      { x: 0.1, y: 0.05 },
      { x: 0.2, y: 0.15 },
      { x: 0.15, y: 0.25 },
    ],
    hasDownConnection: true,
    hasRightConnection: false,
  },
  {
    id: 12,
    points: [
      { x: 0.0, y: 0.0 },
      { x: 0.15, y: 0.05 },
      { x: 0.25, y: 0.15 },
      { x: 0.3, y: 0.25 },
    ],
    hasDownConnection: true,
    hasRightConnection: true,
  },
  {
    id: 13,
    points: [
      { x: 0.0, y: 0.0 },
      { x: 0.1, y: 0.2 },
      { x: 0.25, y: 0.15 },
    ],
    hasDownConnection: false,
    hasRightConnection: true,
  },
  {
    id: 14,
    points: [
      { x: 0.0, y: 0.0 },
      { x: 0.2, y: 0.1 },
      { x: 0.15, y: 0.25 },
    ],
    hasDownConnection: true,
    hasRightConnection: false,
  },
  {
    id: 15,
    points: [
      { x: 0.0, y: 0.0 },
      { x: 0.1, y: 0.1 },
      { x: 0.2, y: 0.2 },
      { x: 0.25, y: 0.25 },
    ],
    hasDownConnection: true,
    hasRightConnection: true,
  },
  {
    id: 16,
    points: [
      { x: 0.0, y: 0.0 },
      { x: 0.05, y: 0.05 },
      { x: 0.1, y: 0.1 },
      { x: 0.15, y: 0.15 },
      { x: 0.2, y: 0.2 },
    ],
    hasDownConnection: true,
    hasRightConnection: true,
  },
];

// Connectivity matrix for pattern compatibility
export const PATTERN_COMPATIBILITY: { [key: number]: number[] } = {
  1: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], // Pattern 1 can connect to most
  2: [1, 4, 5, 8, 11, 14, 15, 16],
  3: [1, 4, 5, 8, 9, 10, 12],
  4: [1, 2, 3, 6, 7, 11, 13, 14, 15, 16],
  5: [1, 2, 3, 6, 7, 11, 13, 14, 15, 16],
  6: [4, 5, 8, 9, 10, 11, 12, 14, 15, 16],
  7: [1, 4, 5, 8, 9, 10, 12],
  8: [2, 3, 6, 7, 11, 13, 14, 15, 16],
  9: [2, 3, 6, 7, 11, 13],
  10: [1, 4, 5, 8, 14, 15, 16],
  11: [4, 5, 8, 9, 10, 12, 14, 15, 16],
  12: [2, 3, 6, 7, 11, 13],
  13: [1, 4, 5, 8, 9, 10, 12, 15, 16],
  14: [1, 4, 5, 8, 9, 10, 12, 15, 16],
  15: [2, 3, 6, 7, 11, 13, 16],
  16: [1, 4, 5, 8, 9, 10, 12, 15],
};

// Connection data - patterns that have down/right connections
export const CONNECTIVITY_RULES = {
  pt_dn: [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1], // 1-indexed: patterns with down connections
  pt_rt: [0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1], // 1-indexed: patterns with right connections

  mate_pt_dn: {
    1: [2, 3, 5, 6, 9, 10, 12],
    2: [4, 7, 8, 11, 13, 14, 15, 16],
  },

  mate_pt_rt: {
    1: [2, 3, 4, 6, 7, 11, 13],
    2: [5, 8, 9, 10, 12, 14, 15, 16],
  },

  // Transformation matrices for symmetry
  h_inv: [1, 2, 5, 4, 3, 9, 8, 7, 6, 10, 11, 12, 15, 14, 13, 16],
  v_inv: [1, 4, 3, 2, 5, 7, 6, 9, 8, 10, 11, 14, 13, 12, 15, 16],

  // Self-symmetric patterns
  horizontalSymmetric: [1, 2, 5, 10, 11, 12, 16],
  verticalSymmetric: [1, 3, 5, 10, 11, 14, 16],
};

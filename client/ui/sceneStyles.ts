import { SceneVisual } from "@/data/gameTypes";

export interface SceneGradient {
  colors: readonly [string, string, ...string[]];
  start: { x: number; y: number };
  end: { x: number; y: number };
}

export function getSceneBackground(sceneVisual: SceneVisual): SceneGradient {
  const backgrounds: Record<SceneVisual, SceneGradient> = {
    coronation: {
      colors: ["#C9A961", "#8B5A00", "#3D2400"] as const,
      start: { x: 0.5, y: 0 },
      end: { x: 0.5, y: 1 },
    },
    council: {
      colors: ["#5C4033", "#2A1810", "#0D0D0D"] as const,
      start: { x: 0.5, y: 0 },
      end: { x: 0.5, y: 1 },
    },
    war: {
      colors: ["#8B0000", "#4A0000", "#0D0D0D"] as const,
      start: { x: 0.5, y: 0 },
      end: { x: 0.5, y: 1 },
    },
    famine: {
      colors: ["#4A4A4A", "#2A2A2A", "#0D0D0D"] as const,
      start: { x: 0.5, y: 0 },
      end: { x: 0.5, y: 1 },
    },
    scandal: {
      colors: ["#2F4F2F", "#1A2A1A", "#0A0A0A"] as const,
      start: { x: 0.5, y: 0 },
      end: { x: 0.5, y: 1 },
    },
    schism: {
      colors: ["#C9A961", "#5C3030", "#8B0000"] as const,
      start: { x: 0, y: 0.5 },
      end: { x: 1, y: 0.5 },
    },
    judgment: {
      colors: ["#1A1A1A", "#0A0A0A", "#000000"] as const,
      start: { x: 0.5, y: 0 },
      end: { x: 0.5, y: 1 },
    },
  };

  return backgrounds[sceneVisual];
}

export type SceneVisual = 
  | "coronation"
  | "council"
  | "war"
  | "famine"
  | "scandal"
  | "schism"
  | "judgment";

export interface GameStats {
  legitimacy: number;
  gold: number;
  piety: number;
  stability: number;
  curia: number;
}

export interface Relationships {
  france: number;
  england: number;
  holyRomanEmpire: number;
  castile: number;
}

export interface StatDelta {
  legitimacy?: number;
  gold?: number;
  piety?: number;
  stability?: number;
  curia?: number;
}

export interface RelationshipDelta {
  france?: number;
  england?: number;
  holyRomanEmpire?: number;
  castile?: number;
}

export interface Choice {
  id: string;
  text: string;
  statDeltas?: StatDelta;
  relationshipDeltas?: RelationshipDelta;
  addFlags?: string[];
  removeFlags?: string[];
  nextNodeId: string;
  requiresFlags?: string[];
  excludesFlags?: string[];
  consequence?: string;
}

export interface StoryNode {
  id: string;
  sceneVisual: SceneVisual;
  dialogue: string[];
  choices?: Choice[];
  timedDecision?: {
    timeLimit: number;
    defaultChoiceIndex: number;
  };
  isEnding?: boolean;
  endingTitle?: string;
  endingText?: string;
}

export interface GameState {
  currentNodeId: string;
  dialogueIndex: number;
  stats: GameStats;
  relationships: Relationships;
  flags: string[];
  hasStarted: boolean;
  isComplete: boolean;
}

export const INITIAL_STATS: GameStats = {
  legitimacy: 50,
  gold: 50,
  piety: 50,
  stability: 50,
  curia: 50,
};

export const INITIAL_RELATIONSHIPS: Relationships = {
  france: 0,
  england: 0,
  holyRomanEmpire: 0,
  castile: 0,
};

export const INITIAL_GAME_STATE: GameState = {
  currentNodeId: "opening",
  dialogueIndex: 0,
  stats: { ...INITIAL_STATS },
  relationships: { ...INITIAL_RELATIONSHIPS },
  flags: [],
  hasStarted: false,
  isComplete: false,
};

export const SCENE_ICONS: Record<SceneVisual, string> = {
  coronation: "award",
  council: "sun",
  war: "zap",
  famine: "cloud-drizzle",
  scandal: "alert-triangle",
  schism: "git-branch",
  judgment: "scale",
};

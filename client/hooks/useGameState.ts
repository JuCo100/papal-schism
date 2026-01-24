import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import {
  GameState,
  INITIAL_GAME_STATE,
  Choice,
  StatDelta,
  RelationshipDelta,
} from "@/data/gameTypes";
import { getNodeById } from "@/data/storyNodes";

const STORAGE_KEY = "@papal_schism_save";

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [isLoading, setIsLoading] = useState(true);
  const [lastStatChanges, setLastStatChanges] = useState<StatDelta>({});
  const [showConsequence, setShowConsequence] = useState<string | null>(null);

  useEffect(() => {
    loadGame();
  }, []);

  const loadGame = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setGameState(parsed);
      }
    } catch (error) {
      console.error("Failed to load game:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveGame = useCallback(async (state: GameState) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save game:", error);
    }
  }, []);

  const startGame = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const newState: GameState = {
      ...INITIAL_GAME_STATE,
      hasStarted: true,
    };
    setGameState(newState);
    saveGame(newState);
  }, [saveGame]);

  const continueGame = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const advanceDialogue = useCallback(() => {
    const currentNode = getNodeById(gameState.currentNodeId);
    if (!currentNode) return;

    const nextIndex = gameState.dialogueIndex + 1;
    
    if (nextIndex < currentNode.dialogue.length) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const newState = { ...gameState, dialogueIndex: nextIndex };
      setGameState(newState);
      saveGame(newState);
    }
  }, [gameState, saveGame]);

  const applyChoice = useCallback(
    (choice: Choice) => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      const newStats = { ...gameState.stats };
      const newRelationships = { ...gameState.relationships };
      let newFlags = [...gameState.flags];

      if (choice.statDeltas) {
        Object.entries(choice.statDeltas).forEach(([key, value]) => {
          if (value !== undefined) {
            const statKey = key as keyof typeof newStats;
            newStats[statKey] = Math.max(0, Math.min(100, newStats[statKey] + value));
          }
        });
        setLastStatChanges(choice.statDeltas);
      }

      if (choice.relationshipDeltas) {
        Object.entries(choice.relationshipDeltas).forEach(([key, value]) => {
          if (value !== undefined) {
            const relKey = key as keyof typeof newRelationships;
            newRelationships[relKey] = Math.max(-100, Math.min(100, newRelationships[relKey] + value));
          }
        });
      }

      if (choice.addFlags) {
        newFlags = [...new Set([...newFlags, ...choice.addFlags])];
      }

      if (choice.removeFlags) {
        newFlags = newFlags.filter((f) => !choice.removeFlags?.includes(f));
      }

      const nextNode = getNodeById(choice.nextNodeId);
      const isEnding = nextNode?.isEnding || false;

      if (choice.consequence) {
        setShowConsequence(choice.consequence);
      }

      const newState: GameState = {
        ...gameState,
        currentNodeId: choice.nextNodeId,
        dialogueIndex: 0,
        stats: newStats,
        relationships: newRelationships,
        flags: newFlags,
        isComplete: isEnding,
      };

      setGameState(newState);
      saveGame(newState);

      setTimeout(() => setLastStatChanges({}), 1500);
    },
    [gameState, saveGame]
  );

  const resetGame = useCallback(async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setGameState(INITIAL_GAME_STATE);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  const dismissConsequence = useCallback(() => {
    setShowConsequence(null);
  }, []);

  const hasSave = gameState.hasStarted && !gameState.isComplete;
  const currentNode = getNodeById(gameState.currentNodeId);
  const isAtChoices = currentNode 
    ? gameState.dialogueIndex >= currentNode.dialogue.length - 1 && currentNode.choices
    : false;

  return {
    gameState,
    isLoading,
    hasSave,
    currentNode,
    isAtChoices,
    lastStatChanges,
    showConsequence,
    startGame,
    continueGame,
    advanceDialogue,
    applyChoice,
    resetGame,
    dismissConsequence,
  };
}

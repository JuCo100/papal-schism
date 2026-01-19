import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  FadeIn,
  FadeOut,
  SlideInUp,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { GameColors, Spacing, Fonts } from "@/constants/theme";
import { StoryNode, Choice, GameState, SceneVisual } from "@/data/gameTypes";
import StatsOverlay from "@/components/StatsOverlay";
import ChoiceButton from "@/components/ChoiceButton";
import TimerBar from "@/components/TimerBar";
import ConsequenceOverlay from "@/components/ConsequenceOverlay";
import SceneCard from "@/ui/SceneCard";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface GameScreenProps {
  gameState: GameState;
  currentNode: StoryNode;
  isAtChoices: boolean;
  lastStatChanges: Record<string, number>;
  showConsequence: string | null;
  onAdvanceDialogue: () => void;
  onApplyChoice: (choice: Choice) => void;
  onReset: () => void;
}

const SCENE_BACKGROUNDS: Record<SceneVisual, { colors: string[]; start: { x: number; y: number }; end: { x: number; y: number } }> = {
  coronation: {
    colors: ["#C9A961", "#8B5A00", "#3D2400"],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  council: {
    colors: ["#5C4033", "#2A1810", "#0D0D0D"],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  war: {
    colors: ["#8B0000", "#4A0000", "#0D0D0D"],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  famine: {
    colors: ["#4A4A4A", "#2A2A2A", "#0D0D0D"],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  scandal: {
    colors: ["#2F4F2F", "#1A2A1A", "#0A0A0A"],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  schism: {
    colors: ["#C9A961", "#5C3030", "#8B0000"],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  },
  judgment: {
    colors: ["#1A1A1A", "#0A0A0A", "#000000"],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
};

export default function GameScreen({
  gameState,
  currentNode,
  isAtChoices,
  lastStatChanges,
  showConsequence,
  onAdvanceDialogue,
  onApplyChoice,
  onReset,
}: GameScreenProps) {
  const insets = useSafeAreaInsets();
  const [showStats, setShowStats] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const dialogueOpacity = useSharedValue(1);

  const sceneBackground = SCENE_BACKGROUNDS[currentNode.sceneVisual];
  const currentDialogue = currentNode.dialogue[gameState.dialogueIndex];
  const showChoices = isAtChoices && currentNode.choices;

  useEffect(() => {
    dialogueOpacity.value = 0;
    dialogueOpacity.value = withTiming(1, { duration: 400 });
  }, [gameState.dialogueIndex, gameState.currentNodeId]);

  useEffect(() => {
    if (showChoices && currentNode.timedDecision) {
      setTimeRemaining(currentNode.timedDecision.timeLimit);
    } else {
      setTimeRemaining(null);
    }
  }, [showChoices, currentNode.timedDecision]);

  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          if (currentNode.timedDecision && currentNode.choices) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            onApplyChoice(currentNode.choices[currentNode.timedDecision.defaultChoiceIndex]);
          }
          return 0;
        }
        if (prev <= 4) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, currentNode, onApplyChoice]);

  const dialogueAnimatedStyle = useAnimatedStyle(() => ({
    opacity: dialogueOpacity.value,
  }));

  const handleScreenTap = useCallback(() => {
    if (!showChoices) {
      onAdvanceDialogue();
    }
  }, [showChoices, onAdvanceDialogue]);

  const getAvailableChoices = useCallback(() => {
    if (!currentNode.choices) return [];
    return currentNode.choices.filter((choice) => {
      if (choice.requiresFlags) {
        if (!choice.requiresFlags.every((f) => gameState.flags.includes(f))) {
          return false;
        }
      }
      if (choice.excludesFlags) {
        if (choice.excludesFlags.some((f) => gameState.flags.includes(f))) {
          return false;
        }
      }
      return true;
    });
  }, [currentNode.choices, gameState.flags]);

  return (
    <LinearGradient
      colors={sceneBackground.colors}
      style={styles.container}
      start={sceneBackground.start}
      end={sceneBackground.end}
    >
      <Pressable
        style={styles.topBar}
        onPress={() => setShowStats(true)}
      >
        <View style={[styles.topBarContent, { paddingTop: insets.top + Spacing.md }]}>
          <Feather name="bar-chart-2" size={24} color={GameColors.papalGold} />
        </View>
      </Pressable>

      <Pressable
        style={styles.mainContent}
        onPress={handleScreenTap}
        disabled={showChoices}
      >
        <View style={[styles.contentArea, { paddingTop: insets.top + 60 }]}>
          <SceneCard node={currentNode} />

          <ScrollView
            style={styles.dialogueScrollView}
            contentContainerStyle={styles.dialogueContainer}
            showsVerticalScrollIndicator={false}
          >
            <Animated.Text
              style={[styles.dialogueText, dialogueAnimatedStyle]}
              key={`${currentNode.id}-${gameState.dialogueIndex}`}
            >
              {currentDialogue}
            </Animated.Text>

            {!showChoices && (
              <Animated.Text
                style={styles.tapHint}
                entering={FadeIn.delay(1000).duration(500)}
              >
                Tap to continue
              </Animated.Text>
            )}
          </ScrollView>
        </View>
      </Pressable>

      {showChoices && currentNode.choices ? (
        <Animated.View
          style={[styles.choicesContainer, { paddingBottom: insets.bottom + Spacing.lg }]}
          entering={SlideInUp.duration(400)}
        >
          {timeRemaining !== null && timeRemaining > 0 ? (
            <TimerBar timeRemaining={timeRemaining} maxTime={currentNode.timedDecision?.timeLimit || 10} />
          ) : null}
          
          {getAvailableChoices().map((choice, index) => (
            <ChoiceButton
              key={choice.id}
              choice={choice}
              onPress={() => onApplyChoice(choice)}
              delay={index * 100}
            />
          ))}
        </Animated.View>
      ) : null}

      {showStats ? (
        <StatsOverlay
          stats={gameState.stats}
          relationships={gameState.relationships}
          lastChanges={lastStatChanges}
          onClose={() => setShowStats(false)}
          onReset={onReset}
        />
      ) : null}

      {showConsequence ? (
        <ConsequenceOverlay message={showConsequence} />
      ) : null}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
  },
  topBarContent: {
    paddingRight: Spacing.lg,
    paddingLeft: Spacing["2xl"],
    paddingBottom: Spacing.md,
  },
  mainContent: {
    flex: 1,
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: 0,
  },
  dialogueScrollView: {
    flex: 1,
  },
  dialogueContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: Spacing["4xl"],
  },
  dialogueText: {
    fontFamily: Fonts.serif,
    fontSize: 20,
    lineHeight: 32,
    color: GameColors.textPrimary,
    textAlign: "center",
    paddingHorizontal: Spacing.md,
  },
  tapHint: {
    fontFamily: Fonts.serif,
    fontSize: 14,
    color: GameColors.textSecondary,
    textAlign: "center",
    marginTop: Spacing["2xl"],
    opacity: 0.6,
  },
  choicesContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    gap: Spacing.md,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
});

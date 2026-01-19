import React from "react";
import { StyleSheet, Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  FadeInUp,
} from "react-native-reanimated";

import { GameColors, Spacing, Fonts } from "@/constants/theme";
import { Choice } from "@/data/gameTypes";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ChoiceButtonProps {
  choice: Choice;
  onPress: () => void;
  delay?: number;
}

function formatDelta(value: number): string {
  return value > 0 ? `+${value}` : `${value}`;
}

function getStatLabel(key: string): string {
  const labels: Record<string, string> = {
    legitimacy: "Legitimacy",
    gold: "Gold",
    piety: "Piety",
    stability: "Stability",
    curia: "Curia",
    france: "France",
    england: "England",
    holyRomanEmpire: "HRE",
    castile: "Castile",
  };
  return labels[key] || key;
}

export default function ChoiceButton({
  choice,
  onPress,
  delay = 0,
}: ChoiceButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 150 });
    opacity.value = withSpring(0.8);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 150 });
    opacity.value = withSpring(1);
  };

  const statChanges: { key: string; value: number; positive: boolean }[] = [];
  
  if (choice.statDeltas) {
    Object.entries(choice.statDeltas).forEach(([key, value]) => {
      if (value !== undefined && value !== 0) {
        statChanges.push({ key, value, positive: value > 0 });
      }
    });
  }
  
  if (choice.relationshipDeltas) {
    Object.entries(choice.relationshipDeltas).forEach(([key, value]) => {
      if (value !== undefined && value !== 0) {
        statChanges.push({ key, value, positive: value > 0 });
      }
    });
  }

  return (
    <AnimatedPressable
      style={[styles.container, animatedStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      entering={FadeInUp.delay(delay).duration(300)}
      testID={`choice-${choice.id}`}
    >
      <Animated.Text style={styles.choiceText}>{choice.text}</Animated.Text>
      
      {statChanges.length > 0 ? (
        <View style={styles.consequencesRow}>
          {statChanges.slice(0, 4).map(({ key, value, positive }) => (
            <Animated.Text
              key={key}
              style={[
                styles.consequenceText,
                { color: positive ? GameColors.papalGold : GameColors.bloodCrimson },
              ]}
            >
              {getStatLabel(key)} {formatDelta(value)}
            </Animated.Text>
          ))}
        </View>
      ) : null}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: GameColors.papalGold,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    minHeight: 60,
    justifyContent: "center",
  },
  choiceText: {
    fontFamily: Fonts.serif,
    fontSize: 16,
    lineHeight: 22,
    color: GameColors.textPrimary,
    textAlign: "center",
  },
  consequencesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: Spacing.sm,
    gap: Spacing.md,
  },
  consequenceText: {
    fontFamily: Fonts.serif,
    fontSize: 12,
    fontStyle: "italic",
  },
});

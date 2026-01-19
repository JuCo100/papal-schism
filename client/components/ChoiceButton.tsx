import React from "react";
import { StyleSheet, Pressable } from "react-native";
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
});

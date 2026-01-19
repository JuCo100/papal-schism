import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from "react-native-reanimated";

import { GameColors, Spacing, Fonts } from "@/constants/theme";

interface TimerBarProps {
  timeRemaining: number;
  maxTime: number;
}

export default function TimerBar({ timeRemaining, maxTime }: TimerBarProps) {
  const pulse = useSharedValue(1);
  const isUrgent = timeRemaining <= 3;
  const progress = (timeRemaining / maxTime) * 100;

  React.useEffect(() => {
    if (isUrgent) {
      pulse.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 200, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 200, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    } else {
      pulse.value = 1;
    }
  }, [isUrgent]);

  const textAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.timerText,
          textAnimatedStyle,
          { color: isUrgent ? GameColors.textWarning : GameColors.papalGold },
        ]}
      >
        {timeRemaining}s
      </Animated.Text>
      <View style={styles.barContainer}>
        <View
          style={[
            styles.barFill,
            {
              width: `${progress}%`,
              backgroundColor: isUrgent
                ? GameColors.textWarning
                : GameColors.papalGold,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  timerText: {
    fontFamily: Fonts.serif,
    fontSize: 18,
    fontWeight: "700",
    width: 50,
  },
  barContainer: {
    flex: 1,
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 3,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 3,
  },
});

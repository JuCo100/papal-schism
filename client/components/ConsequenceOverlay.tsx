import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  runOnJS,
  Easing,
} from "react-native-reanimated";

import { GameColors, Fonts } from "@/constants/theme";

interface ConsequenceOverlayProps {
  message: string;
}

export default function ConsequenceOverlay({
  message,
}: ConsequenceOverlayProps) {
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 300, easing: Easing.out(Easing.ease) }),
      withTiming(1, { duration: 1200 }),
      withTiming(0, { duration: 500, easing: Easing.in(Easing.ease) })
    );
  }, [message]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle, { pointerEvents: "none" }]}>
      <View style={styles.textContainer}>
        <Animated.Text style={styles.message}>{message}</Animated.Text>
        <Animated.Text style={styles.subtext}>
          Rome will remember this.
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  textContainer: {
    paddingHorizontal: 40,
    alignItems: "center",
  },
  message: {
    fontFamily: Fonts.serif,
    fontSize: 22,
    fontWeight: "600",
    color: GameColors.papalGold,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 32,
  },
  subtext: {
    fontFamily: Fonts.serif,
    fontSize: 14,
    fontStyle: "italic",
    color: GameColors.textSecondary,
    textAlign: "center",
  },
});

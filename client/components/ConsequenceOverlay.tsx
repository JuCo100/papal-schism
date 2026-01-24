import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  FadeIn,
} from "react-native-reanimated";

import { GameColors, Fonts } from "@/constants/theme";

interface ConsequenceOverlayProps {
  message: string;
  onDismiss: () => void;
}

export default function ConsequenceOverlay({
  message,
  onDismiss,
}: ConsequenceOverlayProps) {
  return (
    <Pressable style={styles.container} onPress={onDismiss}>
      <Animated.View style={styles.inner} entering={FadeIn.duration(300)}>
        <View style={styles.textContainer}>
          <Animated.Text style={styles.message}>{message}</Animated.Text>
          <Animated.Text style={styles.subtext}>
            Rome will remember this.
          </Animated.Text>
          <Animated.Text style={styles.tapHint}>
            Tap to continue
          </Animated.Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
  inner: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
    alignItems: "center",
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
  tapHint: {
    fontFamily: Fonts.serif,
    fontSize: 12,
    color: GameColors.textSecondary,
    textAlign: "center",
    marginTop: 24,
    opacity: 0.6,
  },
});

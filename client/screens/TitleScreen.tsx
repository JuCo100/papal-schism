import React from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  FadeIn,
  FadeInDown,
} from "react-native-reanimated";

import { GameColors, Spacing, Fonts } from "@/constants/theme";

interface TitleScreenProps {
  onStart: () => void;
  onContinue: () => void;
  hasSave: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function TitleButton({
  text,
  onPress,
  delay = 0,
}: {
  text: string;
  onPress: () => void;
  delay?: number;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 150 });
  };

  return (
    <AnimatedPressable
      entering={FadeInDown.delay(delay).duration(600)}
      style={[styles.button, animatedStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      testID={`button-${text.toLowerCase().replace(/\s/g, "-")}`}
    >
      <Animated.Text style={styles.buttonText}>{text}</Animated.Text>
    </AnimatedPressable>
  );
}

export default function TitleScreen({
  onStart,
  onContinue,
  hasSave,
}: TitleScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={["#3D1A1A", "#0D0D0D"]}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View
        style={[
          styles.content,
          {
            paddingTop: insets.top + Spacing["4xl"],
            paddingBottom: insets.bottom + Spacing["2xl"],
          },
        ]}
      >
        <Animated.View
          style={styles.header}
          entering={FadeIn.delay(200).duration(800)}
        >
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.icon}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View
          style={styles.titleContainer}
          entering={FadeInDown.delay(400).duration(800)}
        >
          <Animated.Text style={styles.title}>PAPAL</Animated.Text>
          <Animated.Text style={styles.title}>SCHISM</Animated.Text>
          <Animated.Text style={styles.subtitle}>
            A Game of Faith and Power
          </Animated.Text>
        </Animated.View>

        <View style={styles.buttonContainer}>
          {hasSave ? (
            <>
              <TitleButton
                text="Continue Papacy"
                onPress={onContinue}
                delay={600}
              />
              <TitleButton
                text="Begin New Papacy"
                onPress={onStart}
                delay={700}
              />
            </>
          ) : (
            <TitleButton text="Begin Papacy" onPress={onStart} delay={600} />
          )}
        </View>

        <Animated.Text
          style={styles.footer}
          entering={FadeIn.delay(900).duration(600)}
        >
          Medieval Europe, 1378
        </Animated.Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing["2xl"],
  },
  header: {
    alignItems: "center",
  },
  icon: {
    width: 100,
    height: 100,
    opacity: 0.9,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontFamily: Fonts.serif,
    fontSize: 48,
    fontWeight: "700",
    color: GameColors.papalGold,
    letterSpacing: 6,
    lineHeight: 56,
  },
  subtitle: {
    fontFamily: Fonts.serif,
    fontSize: 16,
    color: GameColors.textSecondary,
    marginTop: Spacing.lg,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  buttonContainer: {
    width: "100%",
    gap: Spacing.lg,
  },
  button: {
    borderWidth: 1,
    borderColor: GameColors.papalGold,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing["2xl"],
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: Fonts.serif,
    fontSize: 18,
    color: GameColors.papalGold,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  footer: {
    fontFamily: Fonts.serif,
    fontSize: 14,
    color: GameColors.textSecondary,
    letterSpacing: 1,
  },
});

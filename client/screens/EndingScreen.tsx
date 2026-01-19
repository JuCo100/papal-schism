import React from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  FadeIn,
  FadeInDown,
} from "react-native-reanimated";

import { GameColors, Spacing, Fonts } from "@/constants/theme";
import { GameState } from "@/data/gameTypes";
import { calculateEnding } from "@/data/storyNodes";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface EndingScreenProps {
  gameState: GameState;
  onRestart: () => void;
}

function StatRow({
  label,
  value,
  delay,
}: {
  label: string;
  value: number;
  delay: number;
}) {
  const isPositive = value >= 50;

  return (
    <Animated.View
      style={styles.statRow}
      entering={FadeInDown.delay(delay).duration(400)}
    >
      <Animated.Text style={styles.statLabel}>{label}</Animated.Text>
      <View style={styles.statBarContainer}>
        <View
          style={[
            styles.statBar,
            {
              width: `${value}%`,
              backgroundColor: isPositive
                ? GameColors.papalGold
                : GameColors.bloodCrimson,
            },
          ]}
        />
      </View>
      <Animated.Text style={styles.statValue}>{value}</Animated.Text>
    </Animated.View>
  );
}

function RelationshipRow({
  label,
  value,
  delay,
}: {
  label: string;
  value: number;
  delay: number;
}) {
  const isPositive = value >= 0;
  const absValue = Math.abs(value);
  const barWidth = (absValue / 100) * 50;

  return (
    <Animated.View
      style={styles.relationshipRow}
      entering={FadeInDown.delay(delay).duration(400)}
    >
      <Animated.Text style={styles.relationshipLabel}>{label}</Animated.Text>
      <View style={styles.relationshipBarContainer}>
        <View style={styles.relationshipBarNegative}>
          {!isPositive ? (
            <View
              style={[
                styles.relationshipBarFill,
                {
                  width: `${barWidth * 2}%`,
                  backgroundColor: GameColors.bloodCrimson,
                  alignSelf: "flex-end",
                },
              ]}
            />
          ) : null}
        </View>
        <View style={styles.relationshipDivider} />
        <View style={styles.relationshipBarPositive}>
          {isPositive ? (
            <View
              style={[
                styles.relationshipBarFill,
                {
                  width: `${barWidth * 2}%`,
                  backgroundColor: GameColors.papalGold,
                },
              ]}
            />
          ) : null}
        </View>
      </View>
      <Animated.Text
        style={[
          styles.relationshipValue,
          { color: isPositive ? GameColors.papalGold : GameColors.bloodCrimson },
        ]}
      >
        {value > 0 ? `+${value}` : value}
      </Animated.Text>
    </Animated.View>
  );
}

export default function EndingScreen({
  gameState,
  onRestart,
}: EndingScreenProps) {
  const insets = useSafeAreaInsets();
  const ending = calculateEnding(gameState.stats, gameState.flags);
  const buttonScale = useSharedValue(1);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.95, { damping: 15, stiffness: 150 });
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1, { damping: 15, stiffness: 150 });
  };

  return (
    <LinearGradient
      colors={["#1A1A1A", "#0A0A0A", "#000000"]}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + Spacing["2xl"],
            paddingBottom: insets.bottom + Spacing["2xl"],
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={styles.iconContainer}
          entering={FadeIn.delay(200).duration(600)}
        >
          <Feather name="scale" size={72} color={GameColors.papalGold} />
        </Animated.View>

        <Animated.Text
          style={styles.judgmentLabel}
          entering={FadeIn.delay(400).duration(600)}
        >
          THE JUDGMENT
        </Animated.Text>

        <Animated.Text
          style={styles.endingTitle}
          entering={FadeInDown.delay(600).duration(600)}
        >
          {ending.title}
        </Animated.Text>

        <Animated.Text
          style={styles.endingText}
          entering={FadeInDown.delay(800).duration(600)}
        >
          {ending.text}
        </Animated.Text>

        <Animated.View
          style={styles.statsSection}
          entering={FadeIn.delay(1000).duration(400)}
        >
          <Animated.Text style={styles.sectionTitle}>Final Stats</Animated.Text>
          <StatRow label="Legitimacy" value={gameState.stats.legitimacy} delay={1100} />
          <StatRow label="Gold" value={gameState.stats.gold} delay={1150} />
          <StatRow label="Piety" value={gameState.stats.piety} delay={1200} />
          <StatRow label="Stability" value={gameState.stats.stability} delay={1250} />
          <StatRow label="Curia" value={gameState.stats.curia} delay={1300} />
        </Animated.View>

        <Animated.View
          style={styles.relationshipsSection}
          entering={FadeIn.delay(1400).duration(400)}
        >
          <Animated.Text style={styles.sectionTitle}>Relationships</Animated.Text>
          <RelationshipRow label="France" value={gameState.relationships.france} delay={1500} />
          <RelationshipRow label="England" value={gameState.relationships.england} delay={1550} />
          <RelationshipRow label="Holy Roman Empire" value={gameState.relationships.holyRomanEmpire} delay={1600} />
          <RelationshipRow label="Castile" value={gameState.relationships.castile} delay={1650} />
        </Animated.View>

        <AnimatedPressable
          style={[styles.restartButton, buttonAnimatedStyle]}
          onPress={onRestart}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          entering={FadeInDown.delay(1800).duration(600)}
          testID="button-restart"
        >
          <Animated.Text style={styles.restartButtonText}>
            Begin Again
          </Animated.Text>
        </AnimatedPressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing["2xl"],
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: Spacing.lg,
    opacity: 0.9,
  },
  judgmentLabel: {
    fontFamily: Fonts.serif,
    fontSize: 14,
    color: GameColors.textSecondary,
    letterSpacing: 4,
    marginBottom: Spacing.md,
  },
  endingTitle: {
    fontFamily: Fonts.serif,
    fontSize: 28,
    fontWeight: "700",
    color: GameColors.papalGold,
    textAlign: "center",
    marginBottom: Spacing.lg,
    letterSpacing: 1,
  },
  endingText: {
    fontFamily: Fonts.serif,
    fontSize: 16,
    lineHeight: 26,
    color: GameColors.textPrimary,
    textAlign: "center",
    marginBottom: Spacing["3xl"],
    paddingHorizontal: Spacing.md,
  },
  statsSection: {
    width: "100%",
    marginBottom: Spacing["2xl"],
  },
  relationshipsSection: {
    width: "100%",
    marginBottom: Spacing["3xl"],
  },
  sectionTitle: {
    fontFamily: Fonts.serif,
    fontSize: 14,
    color: GameColors.textSecondary,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: Spacing.lg,
    textAlign: "center",
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  statLabel: {
    fontFamily: Fonts.serif,
    fontSize: 14,
    color: GameColors.textPrimary,
    width: 100,
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginHorizontal: Spacing.md,
  },
  statBar: {
    height: "100%",
  },
  statValue: {
    fontFamily: Fonts.serif,
    fontSize: 14,
    color: GameColors.textSecondary,
    width: 30,
    textAlign: "right",
  },
  relationshipRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  relationshipLabel: {
    fontFamily: Fonts.serif,
    fontSize: 14,
    color: GameColors.textPrimary,
    width: 130,
  },
  relationshipBarContainer: {
    flex: 1,
    height: 8,
    flexDirection: "row",
    marginHorizontal: Spacing.md,
  },
  relationshipBarNegative: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  relationshipDivider: {
    width: 2,
    backgroundColor: GameColors.textSecondary,
  },
  relationshipBarPositive: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  relationshipBarFill: {
    height: "100%",
  },
  relationshipValue: {
    fontFamily: Fonts.serif,
    fontSize: 14,
    width: 40,
    textAlign: "right",
  },
  restartButton: {
    borderWidth: 1,
    borderColor: GameColors.papalGold,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing["3xl"],
    marginTop: Spacing.lg,
  },
  restartButtonText: {
    fontFamily: Fonts.serif,
    fontSize: 18,
    color: GameColors.papalGold,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});

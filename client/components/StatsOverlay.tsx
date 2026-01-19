import React from "react";
import { View, StyleSheet, Pressable, ScrollView, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withSequence,
  FadeIn,
  SlideInDown,
} from "react-native-reanimated";

import { GameColors, Spacing, Fonts } from "@/constants/theme";
import { GameStats, Relationships, StatDelta } from "@/data/gameTypes";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface StatsOverlayProps {
  stats: GameStats;
  relationships: Relationships;
  lastChanges: StatDelta;
  onClose: () => void;
  onReset: () => void;
}

function StatBar({
  label,
  value,
  changed,
}: {
  label: string;
  value: number;
  changed: boolean;
}) {
  const pulseScale = useSharedValue(1);
  const isPositive = value >= 50;

  React.useEffect(() => {
    if (changed) {
      pulseScale.value = withRepeat(
        withSequence(
          withSpring(1.05, { damping: 10 }),
          withSpring(1, { damping: 10 })
        ),
        2,
        true
      );
    }
  }, [changed]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  return (
    <Animated.View style={[styles.statRow, animatedStyle]}>
      <Animated.Text style={styles.statLabel}>{label}</Animated.Text>
      <View style={styles.statBarContainer}>
        <View
          style={[
            styles.statBarFill,
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

function RelationshipBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const isPositive = value >= 0;
  const absValue = Math.abs(value);
  const barWidth = (absValue / 100) * 50;

  return (
    <View style={styles.relationshipRow}>
      <Animated.Text style={styles.relationshipLabel}>{label}</Animated.Text>
      <View style={styles.relationshipBarContainer}>
        <View style={styles.relationshipNegative}>
          {!isPositive ? (
            <View
              style={[
                styles.relationshipFill,
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
        <View style={styles.relationshipPositive}>
          {isPositive ? (
            <View
              style={[
                styles.relationshipFill,
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
    </View>
  );
}

export default function StatsOverlay({
  stats,
  relationships,
  lastChanges,
  onClose,
  onReset,
}: StatsOverlayProps) {
  const insets = useSafeAreaInsets();
  const resetScale = useSharedValue(1);

  const resetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: resetScale.value }],
  }));

  const handleResetPressIn = () => {
    resetScale.value = withSpring(0.95);
  };

  const handleResetPressOut = () => {
    resetScale.value = withSpring(1);
  };

  return (
    <Modal
      visible
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Animated.View
          style={[styles.container, { paddingBottom: insets.bottom + Spacing.lg }]}
          entering={SlideInDown.duration(300)}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View style={styles.header}>
              <Animated.Text style={styles.title}>Papal Status</Animated.Text>
              <Pressable onPress={onClose} hitSlop={20}>
                <Feather name="x" size={24} color={GameColors.textSecondary} />
              </Pressable>
            </View>

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            >
              <Animated.Text style={styles.sectionTitle}>Resources</Animated.Text>
              <StatBar
                label="Legitimacy"
                value={stats.legitimacy}
                changed={lastChanges.legitimacy !== undefined}
              />
              <StatBar
                label="Gold"
                value={stats.gold}
                changed={lastChanges.gold !== undefined}
              />
              <StatBar
                label="Piety"
                value={stats.piety}
                changed={lastChanges.piety !== undefined}
              />
              <StatBar
                label="Stability"
                value={stats.stability}
                changed={lastChanges.stability !== undefined}
              />
              <StatBar
                label="Curia"
                value={stats.curia}
                changed={lastChanges.curia !== undefined}
              />

              <Animated.Text style={[styles.sectionTitle, { marginTop: Spacing["2xl"] }]}>
                Relationships
              </Animated.Text>
              <RelationshipBar label="France" value={relationships.france} />
              <RelationshipBar label="England" value={relationships.england} />
              <RelationshipBar label="Holy Roman Empire" value={relationships.holyRomanEmpire} />
              <RelationshipBar label="Castile" value={relationships.castile} />

              <AnimatedPressable
                style={[styles.resetButton, resetAnimatedStyle]}
                onPress={onReset}
                onPressIn={handleResetPressIn}
                onPressOut={handleResetPressOut}
                testID="button-reset"
              >
                <Feather name="rotate-ccw" size={16} color={GameColors.bloodCrimson} />
                <Animated.Text style={styles.resetText}>Restart Game</Animated.Text>
              </AnimatedPressable>
            </ScrollView>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#1A1A1A",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing["2xl"],
    paddingTop: Spacing["2xl"],
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  title: {
    fontFamily: Fonts.serif,
    fontSize: 20,
    fontWeight: "600",
    color: GameColors.papalGold,
    letterSpacing: 1,
  },
  scrollView: {
    maxHeight: 400,
  },
  content: {
    paddingHorizontal: Spacing["2xl"],
    paddingVertical: Spacing.lg,
  },
  sectionTitle: {
    fontFamily: Fonts.serif,
    fontSize: 12,
    color: GameColors.textSecondary,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: Spacing.lg,
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
    width: 90,
  },
  statBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginHorizontal: Spacing.md,
    borderRadius: 2,
  },
  statBarFill: {
    height: "100%",
    borderRadius: 2,
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
    height: 10,
    flexDirection: "row",
    marginHorizontal: Spacing.md,
  },
  relationshipNegative: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
  },
  relationshipDivider: {
    width: 2,
    backgroundColor: GameColors.textSecondary,
  },
  relationshipPositive: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 2,
  },
  relationshipFill: {
    height: "100%",
    borderRadius: 2,
  },
  relationshipValue: {
    fontFamily: Fonts.serif,
    fontSize: 14,
    width: 40,
    textAlign: "right",
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    marginTop: Spacing["2xl"],
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: GameColors.bloodCrimson,
  },
  resetText: {
    fontFamily: Fonts.serif,
    fontSize: 14,
    color: GameColors.bloodCrimson,
    letterSpacing: 1,
  },
});

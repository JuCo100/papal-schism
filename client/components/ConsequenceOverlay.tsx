import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";

import { GameColors, Fonts, Spacing } from "@/constants/theme";
import { StatDelta, RelationshipDelta } from "@/data/gameTypes";

interface ConsequenceOverlayProps {
  message: string;
  statDeltas?: StatDelta;
  relationshipDeltas?: RelationshipDelta;
  onDismiss: () => void;
}

const STAT_LABELS: Record<string, string> = {
  legitimacy: "Legitimacy",
  gold: "Gold",
  piety: "Piety",
  stability: "Stability",
  curia: "Curia",
};

const RELATIONSHIP_LABELS: Record<string, string> = {
  france: "France",
  england: "England",
  holyRomanEmpire: "Holy Roman Empire",
  castile: "Castile",
};

function formatDelta(value: number): string {
  return value > 0 ? `+${value}` : `${value}`;
}

export default function ConsequenceOverlay({
  message,
  statDeltas,
  relationshipDeltas,
  onDismiss,
}: ConsequenceOverlayProps) {
  const hasStatChanges = statDeltas && Object.keys(statDeltas).length > 0;
  const hasRelationshipChanges = relationshipDeltas && Object.keys(relationshipDeltas).length > 0;

  return (
    <Pressable style={styles.container} onPress={onDismiss}>
      <Animated.View style={styles.inner} entering={FadeIn.duration(300)}>
        <View style={styles.textContainer}>
          <Animated.Text style={styles.message}>{message}</Animated.Text>
          <Animated.Text style={styles.subtext}>
            Rome will remember this.
          </Animated.Text>

          {(hasStatChanges || hasRelationshipChanges) && (
            <Animated.View style={styles.changesContainer} entering={FadeInUp.duration(400).delay(300)}>
              {hasStatChanges && Object.entries(statDeltas!).map(([key, value]) => {
                if (value === undefined || value === 0) return null;
                const isPositive = value > 0;
                return (
                  <View key={key} style={styles.changeRow}>
                    <Animated.Text style={[styles.changeValue, isPositive ? styles.positive : styles.negative]}>
                      {formatDelta(value)}
                    </Animated.Text>
                    <Animated.Text style={styles.changeLabel}>
                      {STAT_LABELS[key] || key}
                    </Animated.Text>
                  </View>
                );
              })}
              {hasRelationshipChanges && Object.entries(relationshipDeltas!).map(([key, value]) => {
                if (value === undefined || value === 0) return null;
                const isPositive = value > 0;
                return (
                  <View key={key} style={styles.changeRow}>
                    <Animated.Text style={[styles.changeValue, isPositive ? styles.positive : styles.negative]}>
                      {formatDelta(value)}
                    </Animated.Text>
                    <Animated.Text style={styles.changeLabel}>
                      {RELATIONSHIP_LABELS[key] || key}
                    </Animated.Text>
                  </View>
                );
              })}
            </Animated.View>
          )}

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
    backgroundColor: "rgba(0, 0, 0, 0.92)",
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
  changesContainer: {
    marginTop: Spacing.xl,
    alignItems: "center",
    gap: Spacing.sm,
  },
  changeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  changeValue: {
    fontFamily: Fonts.serif,
    fontSize: 18,
    fontWeight: "700",
    minWidth: 50,
    textAlign: "right",
  },
  changeLabel: {
    fontFamily: Fonts.serif,
    fontSize: 16,
    color: GameColors.textSecondary,
  },
  positive: {
    color: GameColors.papalGold,
  },
  negative: {
    color: GameColors.bloodCrimson,
  },
  tapHint: {
    fontFamily: Fonts.serif,
    fontSize: 12,
    color: GameColors.textSecondary,
    textAlign: "center",
    marginTop: 32,
    opacity: 0.6,
  },
});

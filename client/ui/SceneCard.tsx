import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import { StoryNode, SceneSvgKey } from "@/data/gameTypes";
import { getSceneBackground } from "./sceneStyles";
import { renderSceneSvg } from "./sceneSvgs";
import { Spacing } from "@/constants/theme";

interface SceneCardProps {
  node: StoryNode;
}

const DEFAULT_SCENE_ICONS: Record<string, string> = {
  coronation: "👑",
  council: "🕯️",
  war: "⚔️",
  famine: "🌾",
  scandal: "🎭",
  schism: "✝️",
  judgment: "⚖️",
};

const DEFAULT_SCENE_SVG_KEYS: Record<string, SceneSvgKey> = {
  coronation: "crown",
  council: "candles",
  war: "swords",
  famine: "wheat",
  scandal: "mask",
  schism: "split_cross",
  judgment: "scales",
};

export default function SceneCard({ node }: SceneCardProps) {
  const sceneVisual = node.sceneVisual;
  const background = getSceneBackground(sceneVisual);
  
  // Get emoji icon - use node's sceneIcon if provided, otherwise default
  const sceneIcon = node.sceneIcon || DEFAULT_SCENE_ICONS[sceneVisual] || "🕯️";
  
  // Get SVG key - use node's sceneSvgKey if provided, otherwise default
  const sceneSvgKey: SceneSvgKey = node.sceneSvgKey || DEFAULT_SCENE_SVG_KEYS[sceneVisual] || "candles";

  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(500).delay(100)}
      key={node.id}
    >
      <LinearGradient
        colors={background.colors}
        start={background.start}
        end={background.end}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Large emoji icon */}
          <Animated.Text
            style={styles.emoji}
            entering={SlideInDown.duration(400).delay(200)}
          >
            {sceneIcon}
          </Animated.Text>

          {/* SVG illustration */}
          <Animated.View
            style={styles.svgContainer}
            entering={FadeIn.duration(500).delay(300)}
          >
            {renderSceneSvg(sceneSvgKey, {
              width: 160,
              height: 90,
              style: styles.svg,
            })}
          </Animated.View>

          {/* Optional scene title */}
          {node.sceneTitle && (
            <Animated.Text
              style={styles.title}
              entering={FadeIn.duration(400).delay(400)}
            >
              {node.sceneTitle}
            </Animated.Text>
          )}
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  gradient: {
    paddingVertical: Spacing["2xl"],
    paddingHorizontal: Spacing.lg,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 64,
    marginBottom: Spacing.md,
  },
  svgContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Spacing.sm,
  },
  svg: {
    opacity: 0.8,
  },
  title: {
    fontSize: 18,
    color: "#F5F5DC",
    marginTop: Spacing.md,
    fontWeight: "600",
    opacity: 0.9,
  },
});

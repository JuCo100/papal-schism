import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInUp,
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { StoryNode, SceneSvgKey } from "@/data/gameTypes";
import { getSceneBackground } from "./sceneStyles";
import { renderSceneSvg } from "./sceneSvgs";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface CinematicIntroProps {
  node: StoryNode;
  onComplete: () => void;
  duration?: number;
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

export default function CinematicIntro({ 
  node, 
  onComplete,
  duration = 2500 
}: CinematicIntroProps) {
  const sceneVisual = node.sceneVisual;
  const background = getSceneBackground(sceneVisual);
  const sceneIcon = node.sceneIcon || DEFAULT_SCENE_ICONS[sceneVisual] || "🕯️";
  const sceneSvgKey: SceneSvgKey = node.sceneSvgKey || DEFAULT_SCENE_SVG_KEYS[sceneVisual] || "candles";
  
  const pulseOpacity = useSharedValue(0.3);
  const iconScale = useSharedValue(1);

  useEffect(() => {
    pulseOpacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 1500 }),
        withTiming(0.3, { duration: 1500 })
      ),
      -1,
      true
    );
    
    iconScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000 }),
        withTiming(1, { duration: 2000 })
      ),
      -1,
      true
    );

    const timer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  return (
    <Animated.View 
      style={styles.container}
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(600)}
    >
      <LinearGradient
        colors={background.colors}
        start={background.start}
        end={background.end}
        style={styles.gradient}
      >
        <Animated.View style={[styles.vignetteOverlay, overlayStyle]} />
        
        <View style={styles.content}>
          <Animated.Text
            style={styles.emoji}
            entering={ZoomIn.duration(500).delay(100)}
          >
            {sceneIcon}
          </Animated.Text>

          <Animated.View
            style={[styles.svgContainer, iconAnimatedStyle]}
            entering={FadeIn.duration(800).delay(300)}
          >
            {renderSceneSvg(sceneSvgKey, {
              width: 200,
              height: 120,
            })}
          </Animated.View>

          {node.sceneTitle && (
            <Animated.Text
              style={styles.title}
              entering={SlideInUp.duration(500).delay(500)}
            >
              {node.sceneTitle}
            </Animated.Text>
          )}

          <Animated.View
            style={styles.divider}
            entering={FadeIn.duration(400).delay(700)}
          />
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  vignetteOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  emoji: {
    fontSize: 96,
    marginBottom: 24,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  svgContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    opacity: 0.9,
  },
  title: {
    fontSize: 28,
    color: "#F5F5DC",
    marginTop: 24,
    fontWeight: "700",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  divider: {
    width: 80,
    height: 2,
    backgroundColor: "rgba(245, 245, 220, 0.4)",
    marginTop: 20,
    borderRadius: 1,
  },
});

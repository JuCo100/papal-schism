import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { CinematicScene } from "@/data/gameTypes";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface ScenePlayerProps {
  scene: CinematicScene;
  onComplete: () => void;
}

const BACKGROUND_IMAGES: Record<string, any> = {
  "assets/scenes/coronation.png": require("../../assets/scenes/coronation.png"),
  "assets/scenes/council.png": require("../../assets/scenes/council.png"),
  "assets/scenes/war.png": require("../../assets/scenes/war.png"),
  "assets/scenes/famine.png": require("../../assets/scenes/famine.png"),
  "assets/scenes/scandal.png": require("../../assets/scenes/scandal.png"),
  "assets/scenes/schism.png": require("../../assets/scenes/schism.png"),
  "assets/scenes/judgment.png": require("../../assets/scenes/judgment.png"),
};

const CHARACTER_IMAGES: Record<string, any> = {
  "assets/characters/messenger.png": require("../../assets/characters/messenger.png"),
  "assets/characters/cardinal.png": require("../../assets/characters/cardinal.png"),
  "assets/characters/king.png": require("../../assets/characters/king.png"),
  "assets/characters/envoy.png": require("../../assets/characters/envoy.png"),
  "assets/characters/inquisitor.png": require("../../assets/characters/inquisitor.png"),
  "assets/characters/peasant.png": require("../../assets/characters/peasant.png"),
};

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setStartTyping(false);
    const startTimer = setTimeout(() => setStartTyping(true), delay);
    return () => clearTimeout(startTimer);
  }, [text, delay]);

  useEffect(() => {
    if (!startTyping) return;
    
    let index = 0;
    let isMounted = true;
    
    const interval = setInterval(() => {
      if (!isMounted) {
        clearInterval(interval);
        return;
      }
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 35);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [text, startTyping]);

  return (
    <Animated.Text style={styles.subtitleText} entering={FadeIn.duration(300).delay(delay)}>
      {displayedText}
      {displayedText.length < text.length && (
        <Animated.Text style={styles.cursor}>|</Animated.Text>
      )}
    </Animated.Text>
  );
}

export default function ScenePlayer({ scene, onComplete }: ScenePlayerProps) {
  const [showSubtitles, setShowSubtitles] = useState(false);
  const vignetteOpacity = useSharedValue(0.4);
  
  const backgroundSource = BACKGROUND_IMAGES[scene.backgroundImage] || BACKGROUND_IMAGES["assets/scenes/council.png"];
  const characterSource = scene.characterImage ? (CHARACTER_IMAGES[scene.characterImage] || null) : null;
  const characterPosition = scene.characterPosition || "left";

  useEffect(() => {
    setShowSubtitles(false);
  }, [scene]);

  useEffect(() => {
    vignetteOpacity.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: 2000 }),
        withTiming(0.4, { duration: 2000 })
      ),
      -1,
      true
    );

    const subtitleTimer = setTimeout(() => setShowSubtitles(true), 400);

    return () => {
      clearTimeout(subtitleTimer);
    };
  }, []);

  const vignetteStyle = useAnimatedStyle(() => ({
    opacity: vignetteOpacity.value,
  }));

  const handleTap = useCallback(() => {
    onComplete();
  }, [onComplete]);

  const CharacterEntering = characterPosition === "left" 
    ? SlideInLeft.duration(600).delay(200) 
    : SlideInRight.duration(600).delay(200);

  return (
    <Pressable style={styles.container} onPress={handleTap}>
      <Animated.View 
        style={styles.fullScreen}
        entering={FadeIn.duration(500)}
        exiting={FadeOut.duration(400)}
      >
        {backgroundSource && (
          <Image
            source={backgroundSource}
            style={styles.backgroundImage}
            contentFit="cover"
            transition={300}
          />
        )}

        <Animated.View style={[styles.vignette, vignetteStyle]} />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)", "rgba(0,0,0,0.9)"] as const}
          style={styles.bottomGradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

        {characterSource && (
          <Animated.View 
            style={[
              styles.characterContainer,
              characterPosition === "right" ? styles.characterRight : styles.characterLeft
            ]}
            entering={CharacterEntering}
          >
            <Image
              source={characterSource}
              style={styles.characterImage}
              contentFit="contain"
              transition={200}
            />
            {scene.characterName && (
              <Animated.View 
                style={styles.nameTag}
                entering={FadeIn.duration(300).delay(600)}
              >
                <Animated.Text style={styles.nameText}>
                  {scene.characterName}
                </Animated.Text>
              </Animated.View>
            )}
          </Animated.View>
        )}

        {showSubtitles && scene.subtitleLines && scene.subtitleLines.length > 0 && (
          <View style={styles.subtitleContainer}>
            {scene.subtitleLines.map((line, index) => (
              <TypewriterText 
                key={`${line}-${index}`} 
                text={line} 
                delay={index * 800}
              />
            ))}
          </View>
        )}

        <Animated.View 
          style={styles.tapHintContainer}
          entering={FadeIn.duration(400).delay(1500)}
        >
          <Animated.Text style={styles.tapHint}>Tap to continue</Animated.Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  vignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
  bottomGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: SCREEN_HEIGHT * 0.4,
  },
  characterContainer: {
    position: "absolute",
    bottom: SCREEN_HEIGHT * 0.25,
    width: SCREEN_WIDTH * 0.45,
    height: SCREEN_HEIGHT * 0.45,
  },
  characterLeft: {
    left: -20,
  },
  characterRight: {
    right: -20,
  },
  characterImage: {
    width: "100%",
    height: "100%",
  },
  nameTag: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: "#C9A961",
  },
  nameText: {
    color: "#C9A961",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  subtitleContainer: {
    position: "absolute",
    bottom: 80,
    left: 24,
    right: 24,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(201, 169, 97, 0.3)",
  },
  subtitleText: {
    color: "#F5F5DC",
    fontSize: 18,
    lineHeight: 28,
    fontStyle: "italic",
    marginBottom: 4,
  },
  cursor: {
    color: "#C9A961",
    fontWeight: "bold",
  },
  tapHintContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  tapHint: {
    color: "rgba(245, 245, 220, 0.5)",
    fontSize: 12,
    letterSpacing: 1,
  },
});

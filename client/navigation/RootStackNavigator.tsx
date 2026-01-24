import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useGameState } from "@/hooks/useGameState";
import TitleScreen from "@/screens/TitleScreen";
import GameScreen from "@/screens/GameScreen";
import EndingScreen from "@/screens/EndingScreen";
import { GameColors } from "@/constants/theme";

export type RootStackParamList = {
  Title: undefined;
  Game: undefined;
  Ending: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const {
    gameState,
    isLoading,
    hasSave,
    currentNode,
    isAtChoices,
    lastStatChanges,
    showConsequence,
    startGame,
    continueGame,
    advanceDialogue,
    applyChoice,
    resetGame,
    dismissConsequence,
  } = useGameState();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={GameColors.papalGold} />
      </View>
    );
  }

  const renderScreen = () => {
    if (!gameState.hasStarted) {
      return (
        <TitleScreen
          onStart={startGame}
          onContinue={continueGame}
          hasSave={hasSave}
        />
      );
    }

    if (gameState.isComplete) {
      return <EndingScreen gameState={gameState} onRestart={resetGame} />;
    }

    if (currentNode) {
      return (
        <GameScreen
          gameState={gameState}
          currentNode={currentNode}
          isAtChoices={isAtChoices || false}
          lastStatChanges={lastStatChanges}
          showConsequence={showConsequence}
          onAdvanceDialogue={advanceDialogue}
          onApplyChoice={applyChoice}
          onReset={resetGame}
          onDismissConsequence={dismissConsequence}
        />
      );
    }

    return null;
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#000" },
        animation: "fade",
      }}
    >
      <Stack.Screen name="Title">
        {() => renderScreen()}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D0D0D",
  },
});

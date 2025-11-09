import { View, StyleSheet } from "react-native";
import { Button } from "./Button";

interface TimerControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export function TimerControls({
  isRunning,
  isPaused,
  onStart,
  onPause,
  onReset,
}: TimerControlsProps) {
  const showStartButton = !isRunning && !isPaused;
  const showPauseReset = isRunning || isPaused;

  return (
    <View style={styles.container}>
      {showStartButton && (
        <Button
          title="Iniciar"
          onPress={onStart}
          style={styles.fullWidthButton}
        />
      )}
      {showPauseReset && (
        <View style={styles.row}>
          <Button
            title={isPaused ? "Retomar" : "Pausar"}
            onPress={isPaused ? onStart : onPause}
            style={styles.halfWidthButton}
            disabled={false}
          />
          <Button
            title="Resetar"
            onPress={onReset}
            style={styles.halfWidthButton}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 8,
  },
  fullWidthButton: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidthButton: {
    flex: 1,
  },
});

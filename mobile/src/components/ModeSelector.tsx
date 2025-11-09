import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { PomodoroMode } from "../contexts/PomodoroContext";

interface ModeSelectorProps {
  selectedMode: PomodoroMode;
  onSelectMode: (mode: PomodoroMode) => void;
  disabled?: boolean;
}

const MODE_LABELS: Record<PomodoroMode, string> = {
  pomodoro: "Pomodoro",
  shortBreak: "Pausa Curta",
  longBreak: "Pausa Longa",
};

export function ModeSelector({
  selectedMode,
  onSelectMode,
  disabled = false,
}: ModeSelectorProps) {
  const modes: PomodoroMode[] = ["pomodoro", "shortBreak", "longBreak"];

  return (
    <View style={styles.container}>
      {modes.map((mode) => {
        const isSelected = mode === selectedMode;
        return (
          <TouchableOpacity
            key={mode}
            style={[
              styles.button,
              isSelected && styles.buttonSelected,
              disabled && styles.buttonDisabled,
            ]}
            onPress={() => !disabled && onSelectMode(mode)}
            disabled={disabled}
          >
            {isSelected && (
              <Ionicons name="checkmark-circle" size={20} color="#FFF" />
            )}
            <Text
              style={[
                styles.buttonText,
                isSelected && styles.buttonTextSelected,
              ]}
            >
              {MODE_LABELS[mode]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    height: 50,
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  buttonSelected: {
    backgroundColor: "#000",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#333",
  },
  buttonTextSelected: {
    color: "#FFF",
  },
});

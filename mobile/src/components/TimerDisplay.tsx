import { View, Text, StyleSheet, Image } from "react-native";

interface TimerDisplayProps {
  timeRemaining: number; // em segundos
  formatTime: (seconds: number) => string;
}

export function TimerDisplay({ timeRemaining, formatTime }: TimerDisplayProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/wave-image.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    position: "relative",
    borderWidth: 8,
    borderColor: "#000000",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  timerText: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#000000",
    letterSpacing: 2,
    zIndex: 1,
  },
});

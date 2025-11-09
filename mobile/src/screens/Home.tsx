import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { GradientBackground } from "../components/GradientBackground";
import { TaskSelect } from "../components/TaskSelect";
import { ModeSelector } from "../components/ModeSelector";
import { TimerDisplay } from "../components/TimerDisplay";
import { TimerControls } from "../components/TimerControls";
import { usePomodoro } from "../hooks/usePomodoro";
import { useTasks } from "../hooks/useTasks";
import { useBackgroundMusic } from "../hooks/useBackgroundMusic";
import type { Task } from "../types/task.types";

export const Home = () => {
  const navigation = useNavigation();
  const {
    state,
    isMuted,
    setMode,
    setCurrentTask,
    start,
    pause,
    reset,
    toggleMute,
    formatTime,
  } = usePomodoro();
  const { tasks, createTask, deleteTask, isLoading: tasksLoading } = useTasks();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Controla música de fundo baseado no estado do timer
  useBackgroundMusic({
    isRunning: state.isRunning,
    isPaused: state.isPaused,
    isMuted,
  });

  // Sincroniza a task selecionada com o contexto do Pomodoro
  useEffect(() => {
    if (selectedTask) {
      setCurrentTask(selectedTask.name);
    } else {
      setCurrentTask("");
    }
  }, [selectedTask]);

  const handleSelectTask = (task: Task | null) => {
    setSelectedTask(task);
  };

  const handleStart = () => {
    // Task já está selecionada e salva no backend (se foi criada)
    start();
  };

  const handleSettingsPress = () => {
    navigation.navigate("Settings" as never);
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={toggleMute}
              style={styles.muteButton}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isMuted ? "volume-mute-outline" : "volume-high-outline"}
                size={24}
                color="#333"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSettingsPress}
              style={styles.settingsButton}
              activeOpacity={0.7}
            >
              <Ionicons name="settings-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Task Select */}
        <View style={styles.taskSection}>
          <TaskSelect
            label="Tarefa"
            selectedTask={selectedTask}
            tasks={tasks}
            onSelectTask={handleSelectTask}
            onCreateTask={createTask}
            onDeleteTask={deleteTask}
            isLoading={tasksLoading}
            editable={!state.isRunning}
          />
        </View>

        {/* Mode Selector */}
        <ModeSelector
          selectedMode={state.mode}
          onSelectMode={setMode}
          disabled={state.isRunning}
        />

        {/* Timer Display */}
        <TimerDisplay
          timeRemaining={state.timeRemaining}
          formatTime={formatTime}
        />

        {/* Timer Controls */}
        <TimerControls
          isRunning={state.isRunning}
          isPaused={state.isPaused}
          onStart={handleStart}
          onPause={pause}
          onReset={reset}
        />
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  logo: {
    width: 40,
    height: 40,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  muteButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  taskSection: {
    marginBottom: 24,
  },
});

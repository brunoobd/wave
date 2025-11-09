import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";

export type PomodoroMode = "pomodoro" | "shortBreak" | "longBreak";

type PomodoroState = {
  mode: PomodoroMode;
  timeRemaining: number; // em segundos
  isRunning: boolean;
  isPaused: boolean;
  currentTask: string;
};

type PomodoroContextType = {
  state: PomodoroState;
  isMuted: boolean;
  setMode: (mode: PomodoroMode) => void;
  setCurrentTask: (task: string) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
  toggleMute: () => void;
  formatTime: (seconds: number) => string;
};

const MUTE_STORAGE_KEY = "pomodoro_is_muted";

const MODE_DURATIONS: Record<PomodoroMode, number> = {
  pomodoro: 25 * 60, // 1500 segundos
  shortBreak: 5 * 60, // 300 segundos
  longBreak: 20 * 60, // 1200 segundos
};

const PomodoroContext = createContext<PomodoroContextType | undefined>(
  undefined
);

export function PomodoroProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PomodoroState>({
    mode: "pomodoro",
    timeRemaining: MODE_DURATIONS.pomodoro,
    isRunning: false,
    isPaused: false,
    currentTask: "",
  });

  const [isMuted, setIsMuted] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadMuteState = async () => {
      try {
        const storedMute = await SecureStore.getItemAsync(MUTE_STORAGE_KEY);
        if (storedMute !== null) {
          setIsMuted(storedMute === "true");
        }
      } catch (error) {
        console.error("Erro ao carregar estado de mute:", error);
      }
    };

    loadMuteState();
  }, []);

  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, []);

  const setMode = useCallback((mode: PomodoroMode) => {
    setState((prev) => {
      if (prev.isRunning) return prev; // Não permite trocar modo durante execução

      return {
        ...prev,
        mode,
        timeRemaining: MODE_DURATIONS[mode],
        isRunning: false,
        isPaused: false,
      };
    });
  }, []);

  const setCurrentTask = useCallback((task: string) => {
    setState((prev) => ({ ...prev, currentTask: task }));
  }, []);

  const start = useCallback(() => {
    setState((prev) => {
      if (prev.timeRemaining === 0) {
        return {
          ...prev,
          timeRemaining: MODE_DURATIONS[prev.mode],
          isRunning: true,
          isPaused: false,
        };
      }

      return {
        ...prev,
        isRunning: true,
        isPaused: false,
      };
    });
  }, []);

  const pause = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isRunning: false,
      isPaused: true,
    }));
  }, []);

  const reset = useCallback(() => {
    setState((prev) => ({
      ...prev,
      timeRemaining: MODE_DURATIONS[prev.mode],
      isRunning: false,
      isPaused: false,
    }));
  }, []);

  const toggleMute = useCallback(async () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    try {
      await SecureStore.setItemAsync(
        MUTE_STORAGE_KEY,
        newMutedState.toString()
      );
    } catch (error) {
      console.error("Erro ao salvar estado de mute:", error);
    }
  }, [isMuted]);

  // Lógica do timer com setInterval
  useEffect(() => {
    if (state.isRunning && state.timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setState((prev) => {
          if (prev.timeRemaining <= 1) {
            // Timer chegou a zero
            return {
              ...prev,
              timeRemaining: 0,
              isRunning: false,
              isPaused: false,
            };
          }
          return {
            ...prev,
            timeRemaining: prev.timeRemaining - 1,
          };
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isRunning, state.timeRemaining]);

  const value = useMemo<PomodoroContextType>(
    () => ({
      state,
      isMuted,
      setMode,
      setCurrentTask,
      start,
      pause,
      reset,
      toggleMute,
      formatTime,
    }),
    [
      state,
      isMuted,
      setMode,
      setCurrentTask,
      start,
      pause,
      reset,
      toggleMute,
      formatTime,
    ]
  );

  return (
    <PomodoroContext.Provider value={value}>
      {children}
    </PomodoroContext.Provider>
  );
}

export function usePomodoro() {
  const context = useContext(PomodoroContext);
  if (context === undefined) {
    throw new Error("usePomodoro must be used within a PomodoroProvider");
  }
  return context;
}

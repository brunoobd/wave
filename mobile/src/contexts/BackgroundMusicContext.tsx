import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";

export type BackgroundMusicType = "waves" | "rain" | "forest" | "none";

type BackgroundMusicContextType = {
  selectedMusic: BackgroundMusicType;
  setSelectedMusic: (music: BackgroundMusicType) => Promise<void>;
};

const BackgroundMusicContext = createContext<
  BackgroundMusicContextType | undefined
>(undefined);

const MUSIC_STORAGE_KEY = "background_music_selection";

const DEFAULT_MUSIC: BackgroundMusicType = "waves";

export function BackgroundMusicProvider({ children }: { children: ReactNode }) {
  const [selectedMusic, setSelectedMusicState] =
    useState<BackgroundMusicType>(DEFAULT_MUSIC);

  useEffect(() => {
    const loadMusicSelection = async () => {
      try {
        const stored = await SecureStore.getItemAsync(MUSIC_STORAGE_KEY);
        if (stored !== null) {
          setSelectedMusicState(stored as BackgroundMusicType);
        }
      } catch (error) {
        console.error("Erro ao carregar seleção de música:", error);
      }
    };

    loadMusicSelection();
  }, []);

  const setSelectedMusic = async (music: BackgroundMusicType) => {
    setSelectedMusicState(music);
    try {
      await SecureStore.setItemAsync(MUSIC_STORAGE_KEY, music);
    } catch (error) {
      console.error("Erro ao salvar seleção de música:", error);
    }
  };

  return (
    <BackgroundMusicContext.Provider
      value={{ selectedMusic, setSelectedMusic }}
    >
      {children}
    </BackgroundMusicContext.Provider>
  );
}

export function useBackgroundMusicContext() {
  const context = useContext(BackgroundMusicContext);
  if (context === undefined) {
    throw new Error(
      "useBackgroundMusicContext must be used within a BackgroundMusicProvider"
    );
  }
  return context;
}

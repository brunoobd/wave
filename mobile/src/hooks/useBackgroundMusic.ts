import { useEffect, useMemo } from "react";
import { useAudioPlayer } from "expo-audio";
import { useBackgroundMusicContext } from "../contexts/BackgroundMusicContext";

interface UseBackgroundMusicProps {
  isRunning: boolean;
  isPaused: boolean;
  isMuted: boolean;
}

const wavesSound = require("../../assets/sounds/waves.mp3");
const rainSound = require("../../assets/sounds/rain.mp3");
const forestSound = require("../../assets/sounds/forest.mp3");

const musicMap: Record<string, any> = {
  waves: wavesSound,
  rain: rainSound,
  forest: forestSound,
  none: null,
};

export function useBackgroundMusic({
  isRunning,
  isPaused,
  isMuted,
}: UseBackgroundMusicProps) {
  const { selectedMusic } = useBackgroundMusicContext();
  const soundSource = useMemo(
    () =>
      selectedMusic === "none" ? null : musicMap[selectedMusic] || wavesSound,
    [selectedMusic]
  );
  const player = useAudioPlayer(soundSource || undefined);

  useEffect(() => {
    if (player && soundSource) {
      player.loop = true;
    }
  }, [player, soundSource]);

  useEffect(() => {
    if (player) {
      player.muted = isMuted;
    }
  }, [isMuted, player]);

  // Controla play/pause baseado no estado do timer
  useEffect(() => {
    if (!player || !soundSource || selectedMusic === "none") return;

    if (isRunning && !isPaused) {
      player.play();
    } else {
      player.pause();
    }
  }, [isRunning, isPaused, player, soundSource, selectedMusic]);
}

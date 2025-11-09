import { StatusBar } from "react-native";
import { AuthProvider } from "./src/contexts/AuthContext";
import { PomodoroProvider } from "./src/contexts/PomodoroContext";
import { BackgroundMusicProvider } from "./src/contexts/BackgroundMusicContext";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <AuthProvider>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent
      />
      <PomodoroProvider>
        <BackgroundMusicProvider>
          <Routes />
        </BackgroundMusicProvider>
      </PomodoroProvider>
    </AuthProvider>
  );
}

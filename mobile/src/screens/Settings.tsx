import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { GradientBackground } from "../components/GradientBackground";
import { useAuth } from "../hooks/useAuth";
import { usePomodoro } from "../hooks/usePomodoro";
import {
  useBackgroundMusicContext,
  type BackgroundMusicType,
} from "../contexts/BackgroundMusicContext";

const MUSIC_OPTIONS: Array<{ value: BackgroundMusicType; label: string }> = [
  { value: "waves", label: "Ondas" },
  { value: "rain", label: "Chuva" },
  { value: "forest", label: "Floresta" },
  { value: "none", label: "Nenhuma" },
];

export const Settings = () => {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();
  const { isMuted, toggleMute } = usePomodoro();
  const { selectedMusic, setSelectedMusic } = useBackgroundMusicContext();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleMusicSelect = async (music: BackgroundMusicType) => {
    await setSelectedMusic(music);
  };

  const handleLogout = async () => {
    Alert.alert("Sair", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await signOut();
        },
      },
    ]);
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back-outline" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Configurações</Text>
          <TouchableOpacity
            onPress={handleLogout}
            style={styles.logoutButton}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* User Info Section */}
          <View style={styles.section}>
            <View style={styles.userCircle}>
              <Ionicons name="person-outline" size={48} color="#333" />
            </View>
            <Text style={styles.userName}>{user?.name || "Usuário"}</Text>
            <Text style={styles.userEmail}>{user?.email || ""}</Text>
          </View>

          {/* Mute/Unmute Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Áudio</Text>
            <TouchableOpacity
              onPress={toggleMute}
              style={styles.muteOption}
              activeOpacity={0.7}
            >
              <View style={styles.optionContent}>
                <Ionicons
                  name={isMuted ? "volume-mute-outline" : "volume-high-outline"}
                  size={24}
                  color="#333"
                />
                <Text style={styles.optionText}>
                  {isMuted ? "Audio desligado" : "Audio ligado"}
                </Text>
              </View>
              <View
                style={[
                  styles.toggle,
                  !isMuted ? styles.toggleActive : styles.toggleInactive,
                ]}
              >
                <View
                  style={[
                    styles.toggleCircle,
                    !isMuted && styles.toggleCircleActive,
                  ]}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Background Music Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Música de Fundo</Text>
            {MUSIC_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleMusicSelect(option.value)}
                style={styles.radioOption}
                activeOpacity={0.7}
              >
                <View style={styles.radioContent}>
                  <View
                    style={[
                      styles.radioCircle,
                      selectedMusic === option.value &&
                        styles.radioCircleActive,
                    ]}
                  >
                    {selectedMusic === option.value && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                  <Text style={styles.radioLabel}>{option.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  logoutButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  userCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  muteOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: "#1976d2",
  },
  toggleInactive: {
    backgroundColor: "#ccc",
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleCircleActive: {
    transform: [{ translateX: 22 }],
  },
  radioOption: {
    marginBottom: 12,
  },
  radioContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  radioCircleActive: {
    borderColor: "#1976d2",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#1976d2",
  },
  radioLabel: {
    fontSize: 16,
    color: "#333",
  },
});

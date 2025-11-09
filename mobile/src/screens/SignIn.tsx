import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import { Input } from "../components/Input";
import { GradientBackground } from "../components/GradientBackground";
import { Button } from "../components/Button";
import { signInSchema, SignInFormData } from "../schemas/auth.schema";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    try {
      await signIn({ email: data.email, password: data.password });
    } catch (error: any) {
      Alert.alert(
        "Erro ao fazer login",
        error?.display || "Credenciais inválidas. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GradientBackground useScrollView={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
            />
          </View>

          <Text style={styles.welcomeText}>Seja Bem-vindo!</Text>
          <Text style={styles.actionText}>Faça seu login</Text>

          <View style={styles.formContainer}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Email"
                  placeholder="johnsondoe@email.com"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Senha"
                  placeholder="Digite sua senha"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                  error={errors.password?.message}
                />
              )}
            />

            <Button
              title="ENTRAR"
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoading}
            />
          </View>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate("SignUp" as never)}
            disabled={isLoading}
          >
            <Text style={styles.linkText}>
              Novo aqui? <Text style={styles.linkTextBold}>CRIE SUA CONTA</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  welcomeText: {
    fontSize: 18,
    color: "#333",
    textAlign: "left",
    fontWeight: "regular",
    marginBottom: 8,
  },
  actionText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
    marginBottom: 40,
  },
  formContainer: {
    marginBottom: 20,
    gap: 10,
  },
  linkButton: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "#333",
    fontSize: 14,
  },
  linkTextBold: {
    fontWeight: "bold",
    color: "#333",
  },
});

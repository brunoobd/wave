import { ReactNode } from "react";
import { ScrollView, View, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GradientBackgroundProps {
  children: ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  showsVerticalScrollIndicator?: boolean;
  useScrollView?: boolean;
}

export function GradientBackground({
  children,
  style,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  useScrollView = true,
}: GradientBackgroundProps) {
  return (
    <LinearGradient
      colors={["#A5CCF5", "#A5CCF5", "#FFFBDE"]}
      locations={[0, 0.2, 0.55]}
      style={[styles.container, style]}
    >
      {useScrollView ? (
        <ScrollView
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={styles.containerView}>{children}</View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  containerView: {
    flex: 1,
  },
});

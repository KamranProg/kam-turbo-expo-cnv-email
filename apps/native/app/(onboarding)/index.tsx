import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useOnboardingStore } from "@/stores/onboarding-store";

export default function ProductOnboardingScreen() {
  const completeProductOnboarding = useOnboardingStore(
    (state) => state.completeProductOnboarding,
  );

  return (
    <View style={styles.container}>
      <Ionicons name="sparkles-outline" size={72} />

      <Text style={styles.description}>{"Here's what this app does."}</Text>

      <Pressable onPress={completeProductOnboarding} style={styles.button}>
        <Text>Finished onboarding</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    padding: 24,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
});

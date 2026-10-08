import { StyleSheet, Text, View } from "react-native";

export default function AccountOnboardingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete your profile</Text>

      <Text>
        Add some information about yourself or skip this step for now.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
  },
});

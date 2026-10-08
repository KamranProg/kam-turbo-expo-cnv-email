import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function SignupScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>

      <Text>Signup form will go here.</Text>

      <Link href="/login">Already have an account? Log in</Link>
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

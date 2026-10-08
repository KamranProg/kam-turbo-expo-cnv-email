import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>

      <Text>Login form will go here.</Text>

      <Link href="/signup">{"Don't have an account? Sign up"}</Link>
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

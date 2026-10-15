import { useMutation } from "convex/react";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { api } from "@kam-turbo-rn-cnv-start/backend/convex/_generated/api";
import { DESIGN_TOKENS } from "@/lib/design-tokens";
import { useColorScheme } from "@/lib/use-color-scheme";

const { spacing, radius, typography, touchTarget } = DESIGN_TOKENS;

export default function AccountOnboardingScreen() {
  const { theme } = useColorScheme();

  const completeOnboarding = useMutation(api.userProfiles.completeOnboarding);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await completeOnboarding({});
    } catch {
      setError("Unable to complete onboarding. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Welcome!</Text>

        <Text style={[styles.description, { color: theme.mutedText }]}>
          Your account is ready. You can complete your profile later.
        </Text>

        {error ? (
          <Text
            accessibilityRole="alert"
            style={[styles.error, { color: theme.notification }]}
          >
            {error}
          </Text>
        ) : null}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Continue to Home"
          accessibilityState={{ disabled: isSubmitting, busy: isSubmitting }}
          onPress={handleComplete}
          disabled={isSubmitting}
          style={[
            styles.button,
            {
              backgroundColor: theme.primary,
              opacity: isSubmitting ? 0.6 : 1,
            },
          ]}
        >
          {isSubmitting ? (
            <ActivityIndicator color={theme.onPrimary} />
          ) : (
            <Text style={[styles.buttonText, { color: theme.onPrimary }]}>
              Continue to Home
            </Text>
          )}
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Skip account onboarding"
          accessibilityState={{ disabled: isSubmitting }}
          onPress={handleComplete}
          disabled={isSubmitting}
          style={styles.skipButton}
        >
          <Text style={[styles.skipButtonText, { color: theme.mutedText }]}>
            Skip for now
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.lg,
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.title,
    fontWeight: "700",
  },
  description: {
    fontSize: typography.body,
    textAlign: "center",
    lineHeight: typography.body * 1.5,
  },
  error: {
    fontSize: typography.body,
    textAlign: "center",
  },
  button: {
    minHeight: touchTarget.minimum,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
  },
  buttonText: {
    fontSize: typography.body,
    fontWeight: "600",
  },
  skipButton: {
    minHeight: touchTarget.minimum,
    paddingHorizontal: spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  skipButtonText: {
    fontSize: typography.body,
  },
});

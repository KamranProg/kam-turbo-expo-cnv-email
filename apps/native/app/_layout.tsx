import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { ConvexReactClient, useConvexAuth, useQuery } from "convex/react";
import { Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "expo-router/react-navigation";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { authClient } from "@/lib/auth-client";
import { NAV_THEME } from "@/lib/constants";
import { useColorScheme } from "@/lib/use-color-scheme";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { SplashScreenController } from "@/components/splash-screen-controller";
import { ENV } from "@/src/env";
import { api } from "@kam-turbo-rn-cnv-start/backend/convex/_generated/api";

const LIGHT_THEME = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};

const DARK_THEME = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

const convex = new ConvexReactClient(ENV.EXPO_PUBLIC_CONVEX_URL, {
  unsavedChangesWarning: false,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <ConvexBetterAuthProvider client={convex} authClient={authClient}>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />

        <GestureHandlerRootView style={styles.container}>
          <RootNavigator />
        </GestureHandlerRootView>
      </ThemeProvider>
    </ConvexBetterAuthProvider>
  );
}

function RootNavigator() {
  const hasCompletedProductOnboarding = useOnboardingStore(
    (state) => state.hasCompletedProductOnboarding,
  );

  const hasHydrated = useOnboardingStore((state) => state.hasHydrated);

  const {
    data: session,
    isPending: isSessionPending,
    error: sessionError,
  } = authClient.useSession();

  const {
    isAuthenticated: isConvexAuthenticated,
    isLoading: isConvexAuthLoading,
  } = useConvexAuth();

  const hasSession = !!session;

  const profile = useQuery(
    api.userProfiles.getCurrent,
    hasSession && isConvexAuthenticated ? {} : "skip",
  );

  const isProfileLoading =
    hasSession && isConvexAuthenticated && profile === undefined;

  const hasCompletedAccountOnboarding =
    profile?.accountOnboardingCompleted === true;

  // Product onboarding is shown once per installation.
  const needsProductOnboarding = hasHydrated && !hasCompletedProductOnboarding;

  // Keep Login accessible when both systems report unauthenticated,
  // even during a temporary authentication loading state.
  const isSignedOut =
    hasHydrated &&
    hasCompletedProductOnboarding &&
    !hasSession &&
    !isConvexAuthenticated;

  // Authenticated users must wait until Convex and their profile are ready.
  const isSignedInReady =
    hasHydrated &&
    hasCompletedProductOnboarding &&
    hasSession &&
    isConvexAuthenticated &&
    !isConvexAuthLoading &&
    !isProfileLoading &&
    !isSessionPending &&
    !sessionError;

  const showLoading =
    !needsProductOnboarding && !isSignedOut && !isSignedInReady;

  const navigationReady = !showLoading;

  return (
    <SplashScreenController navigationReady={navigationReady}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={showLoading}>
          <Stack.Screen name="loading" />
        </Stack.Protected>

        <Stack.Protected guard={needsProductOnboarding}>
          <Stack.Screen name="(onboarding)" />
        </Stack.Protected>

        <Stack.Protected guard={isSignedOut}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>

        <Stack.Protected
          guard={isSignedInReady && !hasCompletedAccountOnboarding}
        >
          <Stack.Screen name="(account-onboarding)" />
        </Stack.Protected>

        <Stack.Protected
          guard={isSignedInReady && hasCompletedAccountOnboarding}
        >
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
      </Stack>
    </SplashScreenController>
  );
}

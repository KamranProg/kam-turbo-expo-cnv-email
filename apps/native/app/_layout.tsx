import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { ConvexReactClient } from "convex/react";
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
import { ENV } from "../src/env";

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

  const { data: session, isPending } = authClient.useSession();
  const isAuthenticated = !!session;
  const hasCompletedAccountOnboarding = false;

  const navigationReady = hasHydrated && !isPending;

  return (
    <>
      <SplashScreenController navigationReady={navigationReady}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={!navigationReady}>
            <Stack.Screen name="loading" />
          </Stack.Protected>

          <Stack.Protected
            guard={navigationReady && !hasCompletedProductOnboarding}
          >
            <Stack.Screen name="(onboarding)" />
          </Stack.Protected>

          <Stack.Protected
            guard={
              navigationReady &&
              hasCompletedProductOnboarding &&
              !isAuthenticated
            }
          >
            <Stack.Screen name="(auth)" />
          </Stack.Protected>

          <Stack.Protected
            guard={
              navigationReady &&
              hasCompletedProductOnboarding &&
              isAuthenticated &&
              !hasCompletedAccountOnboarding
            }
          >
            <Stack.Screen name="(account-onboarding)" />
          </Stack.Protected>

          <Stack.Protected
            guard={
              navigationReady &&
              hasCompletedProductOnboarding &&
              isAuthenticated &&
              hasCompletedAccountOnboarding
            }
          >
            <Stack.Screen name="(tabs)" />
          </Stack.Protected>
        </Stack>
      </SplashScreenController>
    </>
  );
}

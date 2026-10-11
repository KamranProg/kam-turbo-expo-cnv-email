import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

void SplashScreen.preventAutoHideAsync();

type Props = {
  navigationReady: boolean;
  children: React.ReactNode;
};

export function SplashScreenController({ navigationReady, children }: Props) {
  const [hasLaidOut, setHasLaidOut] = useState(false);

  const handleLayout = useCallback(() => {
    setHasLaidOut(true);
  }, []);

  useEffect(() => {
    if (navigationReady && hasLaidOut) {
      void SplashScreen.hideAsync();
    }
  }, [navigationReady, hasLaidOut]);

  return (
    <View style={styles.container} onLayout={handleLayout}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

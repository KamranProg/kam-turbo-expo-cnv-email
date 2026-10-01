import { useColorScheme as useRNColorScheme } from "react-native";
import { NAV_THEME } from "@/lib/constants";

export function useColorScheme() {
  const systemColorScheme = useRNColorScheme();
  const colorScheme = systemColorScheme ?? "light";
  const theme = colorScheme === "dark" ? NAV_THEME.dark : NAV_THEME.light;

  return {
    colorScheme: colorScheme as "light" | "dark",
    isDarkColorScheme: colorScheme === "dark",
    theme,
    setColorScheme: () => {
      // Color scheme is managed by the system in bare mode
      console.warn(
        "setColorScheme is not available in bare mode. Color scheme is managed by the system.",
      );
    },
    toggleColorScheme: () => {
      // Color scheme is managed by the system in bare mode
      console.warn(
        "toggleColorScheme is not available in bare mode. Color scheme is managed by the system.",
      );
    },
  };
}

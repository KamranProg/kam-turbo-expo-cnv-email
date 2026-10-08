import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type OnboardingState = {
  hasCompletedProductOnboarding: boolean;
  hasHydrated: boolean;

  completeProductOnboarding: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasCompletedProductOnboarding: false,
      hasHydrated: false,

      completeProductOnboarding: () =>
        set({
          hasCompletedProductOnboarding: true,
        }),

      setHasHydrated: (hasHydrated) => {
        set({ hasHydrated });
      },
    }),
    {
      name: "onboarding-storage",

      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        hasCompletedProductOnboarding: state.hasCompletedProductOnboarding,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

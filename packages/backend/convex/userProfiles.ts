import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    const authUser = await authComponent.safeGetAuthUser(ctx);

    if (!authUser) {
      return null;
    }

    return await ctx.db
      .query("userProfiles")
      .withIndex("by_auth_id", (q) => q.eq("authId", authUser._id))
      .unique();
  },
});

export const completeOnboarding = mutation({
  args: {},
  handler: async (ctx) => {
    const authUser = await authComponent.safeGetAuthUser(ctx);

    if (!authUser) {
      throw new Error("Not authenticated");
    }

    const existingProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_auth_id", (q) => q.eq("authId", authUser._id))
      .unique();

    if (existingProfile) {
      if (!existingProfile.accountOnboardingCompleted) {
        await ctx.db.patch(existingProfile._id, {
          accountOnboardingCompleted: true,
        });
      }

      return existingProfile._id;
    }

    return await ctx.db.insert("userProfiles", {
      authId: authUser._id,
      accountOnboardingCompleted: true,
    });
  },
});

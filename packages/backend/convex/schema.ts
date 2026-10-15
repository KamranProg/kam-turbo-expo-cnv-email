import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  userProfiles: defineTable({
    authId: v.string(),
    accountOnboardingCompleted: v.boolean(),
  }).index("by_auth_id", ["authId"]),
});

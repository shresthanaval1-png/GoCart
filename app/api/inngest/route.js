import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";

// ✅ SAFE IMPORT (prevents build crash)
let functions = [];

try {
  const {
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion,
    deleteCouponOnExpiry
  } = require("@/inngest/functions");

  functions = [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion,
    deleteCouponOnExpiry
  ].filter(Boolean); // ✅ remove undefined functions
} catch (error) {
  console.warn("⚠️ Inngest functions not loaded:", error.message);
}

// ✅ FINAL EXPORT (NEVER CRASHES BUILD)
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions
});
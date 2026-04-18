/**
 * Environment Variables Configuration
 * This centralizes all environment variables used in the application.
 */

export const environmentVariables = {
  RESEND_API_KEY: import.meta.env.VITE_RESEND_API_KEY || "",
  RESEND_FROM_EMAIL: import.meta.env.VITE_RESEND_FROM_EMAIL || "onboarding@resend.dev",
  APP_URL: import.meta.env.VITE_APP_URL || "http://localhost:5173",
};

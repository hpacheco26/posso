import Constants from "expo-constants";

export type AppEnv = "development" | "production";

/**
 * Which Firebase project / bundle id this running build targets. Resolved from
 * the `extra.appEnv` value baked in by app.config.ts (driven by APP_ENV).
 */
export const APP_ENV: AppEnv =
  Constants.expoConfig?.extra?.appEnv === "production" ? "production" : "development";

export const IS_PRODUCTION = APP_ENV === "production";
export const IS_DEVELOPMENT = !IS_PRODUCTION;

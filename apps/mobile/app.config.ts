import fs from "node:fs";
import path from "node:path";

import type { ConfigContext, ExpoConfig } from "expo/config";

type AppEnv = "development" | "production";

const APP_ENV: AppEnv = process.env.APP_ENV === "production" ? "production" : "development";
const IS_PRODUCTION = APP_ENV === "production";

// Dev and prod are separate Firebase projects with distinct bundle ids so both
// builds can be installed side by side on one device.
const BUNDLE_ID = IS_PRODUCTION ? "pt.posso.app" : "pt.posso.app.dev";
const APP_NAME = IS_PRODUCTION ? "Posso?" : "Posso? (dev)";

const ANDROID_GOOGLE_SERVICES = IS_PRODUCTION
  ? "./firebase/google-services.prod.json"
  : "./firebase/google-services.dev.json";
const IOS_GOOGLE_SERVICES = IS_PRODUCTION
  ? "./firebase/GoogleService-Info.prod.plist"
  : "./firebase/GoogleService-Info.dev.plist";

// Only reference credential files that actually exist locally; they are
// gitignored, so a fresh checkout (or CI without secrets) must not break
// `expo config` / prebuild by pointing at a missing file.
const exists = (relativePath: string): boolean => fs.existsSync(path.join(__dirname, relativePath));

const androidGoogleServicesFile = exists(ANDROID_GOOGLE_SERVICES)
  ? ANDROID_GOOGLE_SERVICES
  : undefined;
const iosGoogleServicesFile = exists(IOS_GOOGLE_SERVICES) ? IOS_GOOGLE_SERVICES : undefined;

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: APP_NAME,
  slug: "posso",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "posso",
  userInterfaceStyle: "automatic",
  ios: {
    bundleIdentifier: BUNDLE_ID,
    icon: "./assets/expo.icon",
    ...(iosGoogleServicesFile ? { googleServicesFile: iosGoogleServicesFile } : {}),
  },
  android: {
    package: BUNDLE_ID,
    ...(androidGoogleServicesFile ? { googleServicesFile: androidGoogleServicesFile } : {}),
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    predictiveBackGestureEnabled: false,
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    "expo-dev-client",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#208AEF",
        image: "./assets/images/splash-icon.png",
        imageWidth: 76,
      },
    ],
    "@react-native-firebase/app",
    "@react-native-firebase/crashlytics",
    // React Native Firebase requires static frameworks on iOS.
    [
      "expo-build-properties",
      {
        ios: { useFrameworks: "static" },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    ...config.extra,
    appEnv: APP_ENV,
  },
});

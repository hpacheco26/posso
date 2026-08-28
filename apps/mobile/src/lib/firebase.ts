import { getApp } from "@react-native-firebase/app";
import { getAuth } from "@react-native-firebase/auth";
import { getFirestore } from "@react-native-firebase/firestore";
import { getStorage } from "@react-native-firebase/storage";

// React Native Firebase auto-initializes the default app from the native
// google-services.json / GoogleService-Info.plist bundled at build time.
// These accessors are the single entry point the rest of the app should use.
export const firebaseApp = getApp();
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

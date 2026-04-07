//TODO: check if this import is needed, since secrets are in eas, it might not be the case
import "dotenv/config";

const buildNumber = 1;

module.exports = () => {
  return {
    name: "ElderCare",
    owner: "arvind_dave",
    plugins: ["expo-localization"],
    slug: "ElderCare",
    privacy: "public",
    platforms: ["ios", "android"],
    version: "0.10.1",
    orientation: "portrait",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      icon: "./assets/images/ios.icon.png",
      bundleIdentifier: "com.Dasion.ElderCare",
      supportsTablet: true,
      buildNumber: buildNumber.toString(),
      infoPlist: {
        NSPhotoLibraryUsageDescription: "Allow $(PRODUCT_NAME) to access your photos",
        NSCameraUsageDescription: "Allow $(PRODUCT_NAME) to access your camera",
        NSMicrophoneUsageDescription: "Allow $(PRODUCT_NAME) to access your microphone",
        UILaunchStoryboardName: "SplashScreen",
        UIRequiresFullScreen: true,
      },
    },
    android: {
      icon: "./assets/images/android.icon.png",
      package: "com.Dasion.ElderCare",
      versionCode: buildNumber,
      "android": {
        "permissions": ["android.permission.RECORD_AUDIO"]
      }

    },
    hooks: {
      postPublish: [
        {
          file: "sentry-expo/upload-sourcemaps",
          config: {
            organization: "nmf",
            project: "nmf-earth",
          },
        },
      ],
    },
    extra: {
      eas: {
        projectId: "0b5d9542-dffe-4a21-8ad6-32bdd5c90689"
      }
    }
  };
};

import "dotenv/config";

export default {
  expo: {
    name: "mobile-client",
    slug: "mobile-client",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    android: {
      package: "com.comicscrip.mobileclient",
      googleServicesFile: "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    extra: {
      GRAPHQL_API_URL: process.env.GRAPHQL_API_URL || "http://localhost:4000",
      eas: {
        projectId: "22b9a97d-2ae7-4d91-a9d7-06f555dbe01d",
      },
    },
  },
};

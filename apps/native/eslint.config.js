const { defineConfig } = require("eslint/config");

const expoConfig = require("eslint-config-expo/flat");
const reactNativePlugin = require("eslint-plugin-react-native");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
  expoConfig,

  {
    plugins: {
      "react-native": reactNativePlugin,
    },

    rules: {
      "react-native/no-unused-styles": "error",
    },
  },

  eslintPluginPrettierRecommended,

  {
    ignores: ["dist/*"],
  },
]);

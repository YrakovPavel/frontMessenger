import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,

  ...pluginVue.configs["flat/essential"],

  {
    files: ["**/*.{js,vue}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  prettier,
];


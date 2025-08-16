import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["plugin:@eslint/js/recommended"],
    languageOptions: {
      globals: globals.node,
      parser: undefined, // Let typescript-eslint set the parser for TS files
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  ...(tseslint.configs.recommended as any), // Cast to any to resolve type incompatibility
]);

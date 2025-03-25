import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tailwindcss from "eslint-plugin-tailwindcss";

export default [
  js.configs.recommended,
  {
    plugins: {
      "@typescript-eslint": ts,
      react,
      "react-hooks": reactHooks,
      tailwindcss,
      prettier,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: "writable",
        Cypress: "readonly",
        document: "readonly",
        window: "readonly",
      },
    },
    rules: {
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "tailwindcss/no-custom-classname": "off",
      "no-unused-vars": "warn",
    },
    ignores: [
      "node_modules",
      "dist",
      "public",
      ".vite",
      "*.min.js",
      "*.min.css",
      "coverage",
      "package-lock.json",
    ],
  },
];

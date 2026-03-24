import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig({
  extends: [
    ...nextVitals,
    ...nextTs,

    // Override default ignores of eslint-config-next.
    globalIgnores([
      // Default ignores of eslint-config-next:
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ]),
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    // Nu permite any implicit
    "@typescript-eslint/no-explicit-any": "warn",
    // Verifică tipurile la funcțiile exportate
    "@typescript-eslint/explicit-module-boundary-types": "warn",
    // Opțional: forțează tip la props
    "@typescript-eslint/typedef": [
      "warn",
      {
        arrayDestructuring: true,
        arrowParameter: true,
        memberVariableDeclaration: true,
        objectDestructuring: true,
        parameter: true,
        propertyDeclaration: true,
        variableDeclaration: true,
        variableDeclarationIgnoreFunction: false,
      },
    ],
  },
});

export default eslintConfig;

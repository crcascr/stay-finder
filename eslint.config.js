import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort"; // <-- nuevo

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "simple-import-sort": simpleImportSort, // <-- registro
    },
    rules: {
      // reglas de ordenación (grupos estándar)
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1. side-effects (polyfills, etc.)
            ["^\\u0000"],
            // 2. builtins (node, bun, etc.)
            ["^(node|bun):"],
            // 3. react, react-dom y demás “react-*”
            ["^react", "^react-dom", "^react-"],
            // 4. librerías externas (lucide, date-fns, etc.)
            ["^@?\\w"],
            // 5. imports con “@/” (tus alias internos)
            ["^@/"],
            // 6. relativos (“./” o “../”)
            ["^\\."],
            // 7. estilos (css, scss) SIEMPRE al final
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error", // opcional
    },
  },
]);

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

const eslintConfig = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
);

export default eslintConfig;

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const rules = {
  '@typescript-eslint/no-empty-function': 'off',
  'max-len': [
    'error',
    {
      'code': 100,
      'ignoreTrailingComments': true,
      'ignoreStrings': true
    }
  ],
  'quotes': ['error', 'single']
};

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier"
  ),
  rules,
];

export default eslintConfig;

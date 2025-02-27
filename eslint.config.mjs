import { FlatCompat } from "@eslint/eslintrc";
import tsParser from "@typescript-eslint/parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const ignores = [
  '.husky/',
  '.next/',
  '.vscode/',
  'dist/',
  'node_modules/',
  'public/',
  'next.config.js',
  'postcss.config.js',
  'prettier.config.js',
  'tailwind.config.js',
  'tsconfig.json',
];

const rules = {
  '@typescript-eslint/no-empty-function': 'off',
  'max-len': [
    'error',
    {
      'code': 100,
      'ignoreTrailingComments': true,
      'ignoreStrings': true,
    },
  ],
  'quotes': ['error', 'single'],
};

const eslintConfig = [
  {
    ignores,
  },
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier"
  ),
  {
    // Section to specify the parser and options
    languageOptions: {
      parser: tsParser, // Use the imported TypeScript parser
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules,
  },
];

export default eslintConfig;

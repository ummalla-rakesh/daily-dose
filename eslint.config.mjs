import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import parser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ),
  {
    files: ['**/*.{ts,tsx}'], // Apply only to TypeScript files
    languageOptions: {
      parser, // Use @typescript-eslint/parser directly
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json', // Point to your tsconfig.json
      },
    },
    rules: {
      // Enforce return types for all functions
      '@typescript-eslint/explicit-function-return-type': 'error',

      // Enforce type annotations on module boundaries
      '@typescript-eslint/explicit-module-boundary-types': 'error',

      // Disallow `any` type usage
      '@typescript-eslint/no-explicit-any': 'off',

      // Require consistent type definitions
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

      // Disallow unused variables
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],

      // Disallow empty functions unless explicitly allowed
      '@typescript-eslint/no-empty-function': [
        'error',
        { allow: ['constructors'] },
      ],
    },
  },
];

export default eslintConfig;

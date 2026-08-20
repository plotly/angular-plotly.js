const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
  {
    ignores: ['dist/**', 'coverage/**', 'node_modules/**'],
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@angular-eslint/prefer-inject': 'off',
      '@angular-eslint/prefer-standalone': 'off',
      'no-async-promise-executor': 'off',
    },
  },
  {
    files: ['projects/plotly/**/*.ts'],
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'plotly', style: 'kebab-case' },
      ],
    },
  },
  {
    files: ['projects/plotly/src/lib/plotly.component.ts'],
    rules: {
      // Compatibility outputs. `click` is already deprecated; both names are
      // retained on supported compatibility lines to avoid an API break.
      '@angular-eslint/no-output-native': 'off',
    },
  },
  {
    files: [
      'projects/plotly/src/lib/plotly.component.ts',
      'projects/demo_app/src/app/app.component.ts',
    ],
    rules: {
      // Angular 22 migrated existing components to Eager to preserve their
      // pre-v22 behavior. An OnPush conversion is a separate breaking change.
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
    },
  },
  {
    files: ['projects/demo_app/**/*.ts'],
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
  },
);

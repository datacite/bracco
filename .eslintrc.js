"use strict";

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  plugins: ['ember'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended'
  ],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    'no-console': 'off',
    'ember/no-classic-classes': 0,
    'ember/no-classic-components': 0,
    'ember/no-actions-hash': 0,
    'ember/no-component-lifecycle-hooks': 0,
    'ember/require-tagless-components': 0,
    'ember/no-mixins': 0,
    'ember/no-get': 0,
    'ember/no-controller-access-in-routes': 0,
    // NEW - WITH UPGRADE TO ESLINT-PLUGIN-EMBER V12
    // 'ember/no-jquery': 'error',
    // 'ember/no-replace-test-comments': 'error',
    // 'ember/no-replace-test-comments': 'error',
    // NEW - for ember-classic-decorator and migration to native js classes
    'ember/classic-decorator-hooks': 2,
    'ember/classic-decorator-no-classic-methods': 2
  },
  overrides: [
    // node files
    {
      files: [
        './.eslintrc.js',
        './.prettierrc.js',
        './.stylelintrc.js',
        './.template-lintrc.js',
        './ember-cli-build.js',
        './testem.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './lib/*/index.js',
        './server/**/*.js'
      ],
      parserOptions: {
        sourceType: 'script'
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['n'],
      extends: ['plugin:n/recommended'],
      rules: {
        // this can be removed once the following is fixed
        // https://github.com/mysticatea/eslint-plugin-node/issues/77
        'node/no-unpublished-require': 'off'
      }
    },
    {
      // test files
      files: ['tests/**/*-test.{js,ts}'],
      extends: ['plugin:qunit/recommended']
    }
  ]
};

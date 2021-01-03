module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['ember'],
  extends: ['eslint:recommended', 'plugin:ember/recommended'],
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
    'ember/no-shadow-route-definition': 0,
    // TODO
    'ember/no-get': 0,
    'ember/avoid-leaking-state-in-ember-objects': 0,
    'ember/use-ember-data-rfc-395-imports': 0,
    'ember/no-controller-access-in-routes': 0,
    'ember/require-computed-macros': 0,
    'ember/use-brace-expansion': 0,
    'ember/require-computed-property-dependencies': 0,
    'ember/no-attrs-in-components': 0,
    'ember/no-observers': 0,
    'ember/classic-decorator-no-classic-methods': 0
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js',
        'server/**/*.js'
      ],
      parserOptions: {
        sourceType: 'script'
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      rules: Object.assign(
        {},
        require('eslint-plugin-node').configs.recommended.rules,
        {
          // add your custom rules and overrides for node files here

          // this can be removed once the following is fixed
          // https://github.com/mysticatea/eslint-plugin-node/issues/77
          'node/no-unpublished-require': 'off'
        }
      )
    }
  ]
};

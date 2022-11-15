import { defineConfig } from 'cypress'

export default defineConfig({
  experimentalFetchPolyfill: true,
  video: false,
  retries: 3,
  projectId: '8j7yje',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.test.*',
  },
})

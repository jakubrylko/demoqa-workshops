const { defineConfig } = require('cypress');
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  video: false,
  e2e: {
    baseUrl: 'https://demoqa.com',
    defaultCommandTimeout: 10000,
    hideXHRInCommandLog: true,
    experimentalSessionAndOrigin: true,
    testIsolation: false,
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx,feature}',
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber());
    }
  }
});

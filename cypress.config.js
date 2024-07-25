const { defineConfig } =  require('cypress')

module.exports =  defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  env:{
    username: 'ljuarez@test.com',
    password: 'Test1234',
    apiURL: 'https://conduit-api.bondaracademy.com'
  },
  retries: {
    runMode: 1,
    openMode: 0
  },
  e2e: {
    baseUrl: 'https://www.akveo.com/ngx-admin/pages/dashboard', //'http://localhost:4200', //'https://www.akveo.com/ngx-admin/pages/dashboard',
    excludeSpecPattern: ['**/1-getting-started','**/2-advanced-examples'],
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      /* const username = process.env.DB_USERNAME
      const password = process.env.PASSWORD

      if (!password) {
        throw new Error('missing PASSWORD environment variable')
      }

      config.env = {username, password}

      return config */

    },
  },
});

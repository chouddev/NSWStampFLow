const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  responseTimeout: 10000,
  pageLoadTimeout: 30000,
  video: true,
  screenshotOnRunFailure: true,
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  downloadsFolder: "cypress/downloads",
  fixturesFolder: "cypress/fixtures",
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports/.jsons",
    overwrite: false,
    html: false,
    json: true,
    timestamp: "mmddyyyy_HHMMss",
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },
  retries: {
    runMode: 2,
    openMode: 0
  },
  e2e: {
    baseUrl: "https://www.service.nsw.gov.au",
    supportFile: "cypress/support/e2e.js",
    specPattern: [
      "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"
    ],
    excludeSpecPattern: [
      "cypress/e2e/**/node_modules/**",
      "cypress/e2e/**/coverage/**"
    ],
    setupNodeEvents(on, config) {
      // Import the cypress-mochawesome-reporter
      require('cypress-mochawesome-reporter/plugin')(on);
      
      // Custom tasks
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        table(message) {
          console.table(message);
          return null;
        }
      });
      
      // Generate merged HTML report after test run
      on('after:run', async () => {
        const { exec } = require('child_process');
        const util = require('util');
        const fs = require('fs');
        const path = require('path');
        const execPromise = util.promisify(exec);
        
        try {
          console.log('📊 Generating merged Mochawesome report...');
          
          // Find all JSON files recursively
          const reportsDir = path.join(process.cwd(), 'cypress/reports');
          const jsonFiles = [];
          
          function findJsonFiles(dir) {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
              const filePath = path.join(dir, file);
              const stat = fs.statSync(filePath);
              if (stat.isDirectory()) {
                findJsonFiles(filePath);
              } else if (file.endsWith('.json') && !file.includes('merged-report')) {
                jsonFiles.push(filePath);
              }
            });
          }
          
          if (fs.existsSync(reportsDir)) {
            findJsonFiles(reportsDir);
          }
          
          if (jsonFiles.length === 0) {
            console.log('⚠️  No JSON files found to merge');
            return;
          }
          
          console.log(`📁 Found ${jsonFiles.length} JSON file(s) to merge`);
          
          // Merge JSON reports
          const jsonPattern = jsonFiles.map(f => `"${f}"`).join(' ');
          await execPromise(
            `npx mochawesome-merge ${jsonPattern} > cypress/reports/merged-report.json`
          );
          
          // Generate HTML report
          await execPromise(
            'npx marge cypress/reports/merged-report.json --reportDir cypress/reports --inline'
          );
          
          console.log('✅ Mochawesome report: cypress/reports/merged-report.html');
        } catch (error) {
          console.error('❌ Error generating report:', error.message);
        }
      });
      
      return config;
    }
  }
})

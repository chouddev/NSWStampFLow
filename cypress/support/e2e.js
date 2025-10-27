// Import commands.js using ES2015 syntax:
import './commands'

// Global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test on uncaught exceptions
  // This is useful for handling third-party scripts
  return false
})
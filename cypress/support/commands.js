// Custom Cypress commands for NSW Service testing

// Command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible')
  cy.window().should('have.property', 'document')
})

// Command to take screenshot with custom name
Cypress.Commands.add('takeScreenshot', (name) => {
  cy.screenshot(name, { capture: 'fullPage' })
})

// Command to verify page elements are loaded
Cypress.Commands.add('verifyPageLoaded', () => {
  cy.get('body').should('be.visible')
  cy.get('main, .main-content, #main').should('exist')
})
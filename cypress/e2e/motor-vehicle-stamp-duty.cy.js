// Simple Cypress test for NSW Motor Vehicle Stamp Duty Calculator

describe('NSW Motor Vehicle Stamp Duty Calculator', () => {
  
  beforeEach(() => {
    // Visit the NSW Service website before each test
    cy.visit('/')
    cy.waitForPageLoad()
  })

  it('shouldt complete the motor vehicle stamp duty calculation flow', () => {
    // Step 1: Navigate to the motor vehicle stamp duty page
    cy.visit('/transaction/check-motor-vehicle-stamp-duty')
    cy.waitForPageLoad()
    
    // Verify we're on the correct page
    cy.url().should('include', 'check-motor-vehicle-stamp-duty')
    cy.get('body').should('be.visible')
    
    // Step 2: Click the "Check online" button
    cy.get('.cta__action > .button')
      .should('be.visible')
      .click()
    
    // Step 3: Verify redirect to calculator page
    cy.url().should('include', 'calculator')
    cy.get('body').should('be.visible')
    
    // Step 4: Wait for the form to load and select "Yes" for the vehicle question
    cy.get('[for="passenger_Y"]')
      .click()
    
    // Step 5: Enter a vehicle value of $25,000
    cy.get('input[type="number"], #purchasePrice, input[name="purchasePrice"]')
      .first()
      .clear()
      .type('25000')
    
    // Step 6: Click the Calculate button
    cy.get('button:contains("Calculate"), input[type="submit"], .btn-primary')
      .first()
      .click()
    
    // Step 7: Verify calculation result appears
    cy.get('.alert')
      .should('be.visible')
    
    // Step 8: Verify popup window appears with calculation details
    cy.get(':nth-child(3) > .right')
      .should('be.visible')
      .and('contain.text', '$25,000.00')
      .and('contain.text', '$')
    
    // Take screenshot for verification
    cy.screenshot('motor-vehicle-stamp-duty-calculation-complete')
  })

})

describe("User can edit a setup", () => {
  beforeEach(() => {
    cy.requests()
  });

  it("can successfully edit setup", () => {
    cy.login(); 
    cy.intercept('PATCH', 'http://localhost:3000/api/v1/setups/**', {
      fixture: 'setup_update.json',
      statusCode: 200
    });

    cy.contains("Strategies").click();
    cy.get("#setup1").within(() => {
      cy.get("#edit1").click()
    });

    cy.intercept('GET', 'http://localhost:3000/api/v1/setups', {
      fixture: 'updated_index_strats.json',
      statusCode: 200
    });

    cy.get('#req3').type("Add a new requirement");
    cy.contains("Save Edit").click();

    cy.get('#result-message').should('contain', 'Strat 1 updated Successfully')
    cy.get("#setup1").should("contain", "Add a new requirement");
  })
}) 
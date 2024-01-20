describe("User can save strategy", () => {
  beforeEach(() => {
    cy.login();
    cy.requests();
  });

  it("can successfully save strategy", ()=> {   
    cy.intercept('POST', 'http://localhost:3000/api/v1/setups', {
      fixture: 'save_setup_success.json',
      statusCode: 200
    });

    cy.contains("Strategies").click();
    cy.get(".strats-form").within(() => {
      cy.get("#name").type("Strategy 1");
      cy.get("#req1").type("Stock in play");
      cy.get("#req2").type("Strong relative volume");
    })
    cy.contains("Create Strategy").click();
    cy.get("#result-message").should("contain", "Strategy 1 added Successfully")
  });

  it("can unsuccessfully save strategy", () => {
    cy.intercept('POST', 'http://localhost:3000/api/v1/setups', {
      fixture: 'failed_saved_strategy.json',
      statusCode: 422
    });

    cy.contains("Strategies").click();
    cy.get(".strats-form").within(() => {
      cy.get("#name").clear();
      cy.contains("Create Strategy").click();
    });

    cy.get("#result-message").should("contain", "Name can't be blank");
  })
})
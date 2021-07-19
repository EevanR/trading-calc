describe("User can edit a setup", () => {
  beforeEach(() => {
    cy.viewport(1450, 1000);
    cy.server()
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/setups",
      response: "fixture:index_strategies.json",
      status: 200,
    })
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/trades",
      response: "fixture:saved_trades.json",
      status: 200
    });
  })

  it("can successfully edit setup", () => {
    cy.login(); 
    cy.route({
      method: "PUT",
      url: "http://localhost:3000/api/v1/setups/**",
      response: "fixture:setup_update.json",
      status: 200
    });

    cy.contains("Strategies").click();
    cy.get("#setup1").within(() => {
      cy.get("#edit1").click()
    })

    cy.get('#req3').type("Add a new requirement");
    cy.get("#edit-strategy").click();
  })
}) 
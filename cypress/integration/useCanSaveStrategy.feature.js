describe("User can save strategy", () => {
  beforeEach(() => {
    cy.viewport(1450, 1000);
    cy.server();
    cy.requests();
  })

  it("can successfully save strategy", ()=> {    
    cy.login();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/setups",
      response: "fixture:save_setup_success.json",
      status: 200
    })
    cy.contains("TradeLogs")

    cy.contains("Strategies").click();
    cy.get("#main-form").within(() => {
      cy.get("#name").type("Strategy 1");
      cy.get("#req1").type("Stock in play");
      cy.get("#req2").type("Strong relative volume");
      cy.get("#create-strategy").click();
    })

    cy.get("#result-message").should("contain", "Strategy 1 added Successfully")
  })

  it("can unsuccessfully save strategy", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/setups",
      response: "fixture:failed_saved_strategy.json",
      status: 422
    })
    cy.get("#main-form").within(() => {
      cy.get("#name").clear();
      cy.get("#create-strategy").click();
    })

    cy.get("#result-message").should("contain", "Name can't be blank")
  })
})
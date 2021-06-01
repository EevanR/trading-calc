describe("User can save strategy", () => {
  beforeEach(() => {
    cy.viewport(1450, 1000);
    cy.server();
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

})
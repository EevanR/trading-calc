describe("User can delete a setup", () => {
  beforeEach(() => {
    cy.viewport(1450, 1000);
    cy.server()
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/setups",
      response: "fixture:index_strategies.json",
      status: 200,
    })
  })

  it("can successfully delete a setup", () => {
    cy.login();

    cy.contains("Strategies").click();
    cy.route({
      method: "DELETE",
      url: "http://localhost:3000/api/v1/setups/**",
      response: "fixture:delete_setup_success.json",
      headers: {
        uid: "trader@mail.com"
      },
      status: 200
    })

    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/setups",
      response: "fixture:reload_strat.json",
      status: 200,
    })

    cy.get("#setup1").within(() => {
      cy.get("#1").click({force: true})
    })

    cy.get("#result-message").should("contain", '"Strat 1" Deleted')
    cy.get("#setup1").should('not.be.visible')
  })
})
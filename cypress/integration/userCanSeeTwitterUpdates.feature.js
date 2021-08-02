describe("User can see live tweets", () => {
  beforeEach(() => {
    cy.viewport(1450,1000);
    cy.server()
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/trades",
      response: "fixture:saved_trades.json",
      status: 200
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/setups",
      response: "fixture:index_strategies.json",
      status: 200,
    })
  })

  it("can successfully see tweets from favorite user", () => {
    cy.login()
    cy.get("#username").type("@team3dstocks")
    // cy.get("#twitter-submit").click()
  })
})
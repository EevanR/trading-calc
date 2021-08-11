describe("User can see day Preformance", () => {
  beforeEach(() => {
    cy.viewport(1400,1000);
    cy.server()
    cy.login()
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/trades",
      response: "fixture:saved_trades.json",
      status: 200
    });
  })

  it("can successfully see Daily preformance", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/tweets",
      response: "fixture:send_twitter_handle.json",
      status: 200,
    })
    cy.get("#uploadExcel-button").click()
  })
})
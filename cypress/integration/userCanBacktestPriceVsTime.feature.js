describe("User can Backtest", () => {
  beforeEach(() => {
    cy.viewport(1250, 900)
    cy.server();
  });

  it("successfully submit new entry", () => {
    cy.visit("/backtest")
    cy.route({
      method: "GET",
      url: "https://www.alphavantage.co/query**",
      response: "fixture:intraday_5_minute.json",
      status: 200
    });

    cy.get("#testTicker").type("CAPR");
    cy.get("#test").click();
  })

});

describe("User can Backtest", () => {
  beforeEach(() => {
    cy.viewport(1250, 800)
    cy.server();
  });

  it("successfully get hourly sentiment", () => {
    cy.visit("/backtest")
    cy.route({
      method: "GET",
      url: "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY**",
      response: "fixture:intraday_5_minute.json",
      status: 200
    });

    cy.get("#runTest").click();
  })

});

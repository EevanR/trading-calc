describe("User can Backtest", () => {
  beforeEach(() => {
    cy.viewport(1250, 800)
    cy.server();
  });

  // it("successfully submit new entry", () => {
  //   cy.visit("/backtest")
  //   cy.route({
  //     method: "GET",
  //     url: "https://www.alphavantage.co/query**",
  //     response: "fixture:intraday_5_minute.json",
  //     status: 200
  //   });

  //   cy.get("#testTicker").type("IBM");
  //   cy.get("#loadChart").click();
  // })

  it("successfully get hourly sentiment", () => {
    cy.visit("/backtest")
    cy.route({
      method: "GET",
      url: "https://www.alphavantage.co/query**",
      response: "fixture:intraday_5_minute.json",
      status: 200
    });

    cy.get("#runTest").click();
  })

});

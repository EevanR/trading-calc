describe("User can get gap stats", () => {
  beforeEach(() => {
    cy.viewport(1250, 800)
    cy.server();
  });

  it("successfully submit ticker", () => {
    cy.visit("/gap")
    cy.route({
      method: "GET",
      url: "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY**",
      response: "fixture:intraday_5_minute.json",
      status: 200
    });
    cy.route({
      method: "GET",
      url: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED**",
      response: "fixture:daily_request.json",
      status: 200
    });

    cy.get("#testTicker").type("AMTX");
    cy.get("#loadChart").click();
  })

});

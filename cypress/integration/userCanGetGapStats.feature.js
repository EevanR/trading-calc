describe("User can get gap stats", () => {
  beforeEach(() => {
    cy.viewport(1350, 900)
    cy.server();
    cy.login();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/trades",
      response: "fixture:saved_trades.json",
      status: 200
    });
  });

  it("successfully submit ticker", () => {
    cy.contains("Historic Gap Stats").click();
    cy.route({
      method: "GET",
      url: "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY**",
      response: "fixture:intraday_15_minute.json",
      status: 200
    });
    cy.route({
      method: "GET",
      url: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED**",
      response: "fixture:daily_request.json",
      status: 200
    });
    cy.route({
      method: "GET",
      url: "https://www.alphavantage.co/query?function=VWAP**",
      response: "fixture:vwap.json",
      status: 200
    });
    cy.get("#testTicker").type("AMTX");
    cy.get("#loadChart").click();

    cy.get("#gap-stats").should("contain", "42.54%")
    cy.get("#gap-stats").should("contain", "Gap up")
    cy.get("#gap-stats").should("contain", "Yes")
  })
});
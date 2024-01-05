describe("User can get gap stats", () => {
  beforeEach(() => {
    cy.viewport(1350, 1200)
    cy.server();
    cy.login();
    cy.requests();
  });

  it("successfully submit ticker", () => {
    cy.contains("Gap Stats").click();
    cy.route({
      method: "GET",
      url: "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&month=2009-01&outputsize=full&apikey=demo",
      status: 200
    });
    cy.route({
      method: "GET",
      url: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY**",
      response: "fixture:daily_request.json",
      status: 200
    });
    cy.route({
      method: "GET",
      url: "https://www.alphavantage.co/query?function=VWAP**",
      response: "fixture:vwap.json",
      status: 200
    });
    cy.get("#testTicker").type("IBM");
    cy.get("#loadChart").click();

    cy.get(".gap-stats").should("contain", "27.98%")
    cy.get(".gap-stats").should("contain", "5.55%")
  })
});
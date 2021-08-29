describe("User can get gap stats", () => {
  beforeEach(() => {
    cy.viewport(1350, 900)
    cy.server(); 
    cy.requests();
  });

  it("can successfully access Historic Tab", () => {
    cy.login();
    cy.contains("Historic Gap Stats").click();
    cy.get('#title').should("contain", "Historic Gap Stats")
  })

  it("successfully submit ticker", () => {
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

    cy.get("#gap-stats").should("contain", "30.53%")
    cy.get("#gap-stats").should("contain", "4.36%")
  })
});
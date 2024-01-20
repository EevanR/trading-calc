describe("User can get gap stats", () => {
  beforeEach(() => {
    cy.viewport(1350, 1200)
    cy.login();
    cy.requests();
  });

  it("successfully submit ticker", () => {
    cy.contains("Gap Stats").click();
    cy.intercept('GET', 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY**', {
      fixture: 'intraday_fiveMinute.json',
      statusCode: 200
    });

    cy.intercept('GET', 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY**', {
      fixture: 'daily_request.json',
      statusCode: 200
    });

    cy.intercept('GET', 'https://www.alphavantage.co/query?function=VWAP**', {
      fixture: 'vwap.json',
      statusCode: 200
    });

    cy.get("#testTicker").type("IBM");
    cy.get("#loadChart").click();

    cy.get(".gap-stats").should("contain", "27.98%")
    cy.get(".gap-stats").should("contain", "5.55%")
  })
});
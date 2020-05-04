describe("User can get gap stats", () => {
  beforeEach(() => {
    cy.viewport(1350, 900)
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/trades",
      response: "fixture:saved_trades.json",
      status: 200
    });
  });
  it("successfully submit ticker", () => {
    cy.visit("/");
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/sign_in",
      response: "fixture:login.json",
      headers: {
        uid: "trader@mail.com"
      },
      status: 200,
      delay: 1000
    });
    cy.get("#signup-form").within(() => {
      cy.get("#email").type("trader@mail.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();
    })
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
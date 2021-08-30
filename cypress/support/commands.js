
Cypress.Commands.add("login", () => {
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
  cy.get("#signin-form").within(() => {
    cy.get("#email").type("trader@mail.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
  })
});

Cypress.Commands.add("requests", () => {
  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/v1/tweets",
    response: "fixture:index_tweets.json",
    status: 200
  })
  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/v1/trades",
    response: "fixture:saved_trades.json",
    status: 200
  });
  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/v1/setups",
    response: "fixture:index_strategies.json",
    status: 200,
  });
  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/v1/excels",
    response: "fixture:excel_test.json",
    status: 200,
  });
});

Cypress.Commands.add("login", () => {
  cy.intercept('POST', 'http://localhost:3000/api/v1/auth/sign_in', {
    fixture: 'login.json',
    headers: {
      uid: 'trader@mail.com'
    },
    statusCode: 200,
    delayMs: 1000
  });

  cy.visit("/");

  cy.contains("Sign In").click()
  cy.get("#email").type("trader@mail.com");
  cy.get("#password").type("password");
  cy.get("#submit").click();
});

Cypress.Commands.add("requests", () => {
  cy.intercept('GET', "http://localhost:3000/api/v1/tweets", {
  fixture: 'index_tweets.json',
  statusCode: 200
  });

  cy.intercept('GET', "http://localhost:3000/api/v1/trades", {
  fixture: 'saved_trades.json',
  statusCode: 200
  });

  cy.intercept('GET', "http://localhost:3000/api/v1/setups", {
  fixture: 'index_strategies.json',
  statusCode: 200
  });

  cy.intercept('GET', "http://localhost:3000/api/v1/excels", {
  fixture: 'excel_test.json',
  statusCode: 200
  });
});
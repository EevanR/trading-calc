import 'cypress-file-upload';

Cypress.Commands.add("login", () => {
  cy.visit("/");
  cy.get("#login-button").click();
  cy.get("#login").within(() => {
    cy.get("#email").type("user@mail.com");
    cy.get("#password").type("password");
    cy.get("button")
      .contains("Submit")
      .click();
  });
});
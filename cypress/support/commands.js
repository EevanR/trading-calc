
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
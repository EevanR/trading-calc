describe("User can log in", () => {
  beforeEach(() => {
    cy.viewport(1350, 900);
    cy.server();
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
    cy.visit("/");
  });

  it("successfully loads login page", () => {
    cy.contains("TradeLogs Sign In")
  })

  it("can successfully sign in", () => {
    cy.get("#signin-form").within(() => {
      cy.get("#email").type("trader@mail.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();
    });
    cy.contains("Trading Position Calculator")
  });
});
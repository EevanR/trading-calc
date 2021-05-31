describe("User can log in", () => {
  beforeEach(() => {
    cy.viewport(1350, 900);
    cy.server();
    cy.visit("/");
  });

  it("successfully loads login page", () => {
    cy.contains("TradeLogs Sign In")
  })

  it("can successfully sign in", () => {
    cy.get("#signup-form").within(() => {
      cy.get("#email").type("trader@mail.com");
      cy.get("#password").type("password");
      cy.get("#submit").click();
    })
  })
});
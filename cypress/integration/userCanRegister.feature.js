describe("User can register", () => {
  beforeEach(() => {
    cy.viewport(1350, 900);
    cy.server();
    cy.visit("/");
  })

  it("can successfully register a new account", () => {
    cy.contains("Register").click();
  })
})
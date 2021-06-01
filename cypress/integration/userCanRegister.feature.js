describe("User can register", () => {
  beforeEach(() => {
    cy.viewport(1350, 900);
    cy.server();
  })

  it("can successfully access Register Tab", () => {
    cy.visit("/");
    cy.contains("Register").click();
  })

  it("can submit registration", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth",
      response: "fixture:register.json",
      status: 200
    })
    cy.get("#signup-form").within(() => {
      cy.get("#email").type("newtrader@mail.com");
      cy.get("#username").type("NewTrader");
      cy.get("#password").type("password");
      cy.get("#passCon").type("password");
      cy.get("#submit").click();
    })
  })
})
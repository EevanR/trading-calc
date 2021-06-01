describe("User can register", () => {
  beforeEach(() => {
    cy.viewport(1350, 900);
    cy.server();
  })

  it("can successfully access Register Tab", () => {
    cy.visit("/");
    cy.contains("Register").click();
    cy.get("#border").should("contain", "TradeLogs Sign Up")
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

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Welcome NewTrader`)
    })
  })

  it("user fails to register", () => {
    cy.visit("/");
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth",
      response: "fixture:failed_registration.json",
      status: 422
    })
    cy.contains("Register").click();
    cy.get("#email").type("newtrader@mail");
    cy.get("#username").type("NewTrader");
    cy.get("#password").type("password");
    cy.get("#passCon").type("password");
    cy.get("#submit").click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Email is not an email`)
    })
  })
})
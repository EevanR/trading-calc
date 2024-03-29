describe("User can register", () => {
  beforeEach(() => {
    cy.viewport(1350, 900);
    cy.requests()

    cy.visit("/");
    cy.contains("Sign In").click();
    cy.contains("Register").click();
    cy.get(".signin-box").should("contain", "Register")
  })

  it("can fail to register with incorrect email format", () => {
    cy.intercept('POST', 'http://localhost:3000/api/v1/auth', {
      fixture: 'failed_registration.json',
      statusCode: 422
    });

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

  it("can fail to register with Username already in use", () => {
    cy.intercept('POST', 'http://localhost:3000/api/v1/auth', {
      fixture: 'failed_registration_username.json',
      statusCode: 401
    });
    
    cy.contains("Register").click();
    cy.get("#email").type("newtrader@mail.com");
    cy.get("#username").type("NewTrader");
    cy.get("#password").type("password");
    cy.get("#passCon").type("password");
    cy.get("#submit").click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Please choose another Username`)
    })
  })

  it("can submit registration", () => {
    cy.intercept('POST', 'http://localhost:3000/api/v1/auth', {
      fixture: 'register.json',
      statusCode: 200
    });

    cy.contains("Register").click();
    cy.get("#email").type("newtrader@mail.com");
    cy.get("#username").type("NewTrader");
    cy.get("#password").type("password");
    cy.get("#passCon").type("password");
    cy.get("#submit").click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Welcome NewTrader`)
    })
  })
})
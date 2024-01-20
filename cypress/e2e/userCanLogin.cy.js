describe("User can log in", () => {
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:3000/api/v1/auth/sign_in', {
      fixture: 'login.json',
      headers: {
        uid: 'trader@mail.com'
      },
      statusCode: 200,
      delayMs: 1000
    });
  });
  
  it('successfully loads', () => {
    cy.visit('/') 

    cy.contains("Quick. Easy. Tradelogs.")

    cy.contains("Sign In").click()
    cy.get("#email").type("trader@mail.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.contains("Profit Curve")
  })

});
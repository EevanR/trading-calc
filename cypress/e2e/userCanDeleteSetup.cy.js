describe("User can delete a setup", () => {

  it("can successfully delete a setup", () => {
    cy.login();
    cy.requests();

    cy.intercept('DELETE', 'http://localhost:3000/api/v1/setups/**', {
      fixture: 'delete_setup_success.json',
      headers: {
        uid: 'trader@mail.com'
      },
      statusCode: 200
    });
    cy.contains("Strategies").click();
    cy.get("#setup1").within(() => {
      cy.get("#1").click({force: true})
    });
    cy.get("#result-message").should("contain", '"Strat 1" Deleted')

    cy.contains("Overview").click();

    cy.intercept('GET', 'http://localhost:3000/api/v1/setups', {
      fixture: 'reload_strat.json',
      statusCode: 200
    });
    cy.contains("Strategies").click();

    cy.get("#setup1").should('not.exist')
  })
})
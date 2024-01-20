describe("User can calculate trade params on calculator tab", () => {
  beforeEach(() => {
    cy.login();
  })

  it("can successfully navigate to Calculate tab with no uploaded data", () => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/excels', {
      fixture: 'excel_test.json',
      statusCode: 200
    });

    cy.contains("Calculator").click({force: true});

    cy.get("#title").should("contain", "Trading Position Calculator")
    cy.get(".setups-inner").should("contain", "No Setups, Add new on strategies tab")
  })

  it("can successfully see saved strategies", () => {
    cy.requests();

    cy.contains("Calculator").click()
    cy.get("#setup-dropdown").click()
    cy.get('.selected > .text').click()

    cy.get(".setups-inner").should("contain", "Strat 1")
  })
})
describe("User can calculate trade params on calculator tab", () => {
  beforeEach(() => {
    cy.viewport(1450, 1000);
    cy.server()
    cy.login();

    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/excels",
      response: "fixture:excel_test.json",
      status: 200,
    });

    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/setups",
      response: "fixture:empty_setups_array.json",
      status: 200
    });
  })

  it("can successfully navigate to Calculate tab with no uploaded data", () => {
    cy.wait(5000)
    cy.contains("Calculator").click({force: true});

    cy.get("#title").should("contain", "Trading Position Calculator")
    cy.get(".setups-inner").should("contain", "No Setups, Add new on strategies tab")
  })

  it("can successfully see saved strategies", () => {
    cy.requests()
    cy.wait(5000)

    cy.contains("Calculator").click()
    cy.get("#setup-dropdown").click()
    cy.get('.selected > .text').click()

    cy.get(".setups-inner").should("contain", "Strat 1")
  })
})
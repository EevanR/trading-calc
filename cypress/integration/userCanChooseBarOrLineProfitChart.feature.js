describe("User can switch between line and bar chart for equity curve", () => {
  beforeEach(() => {
    cy.viewport(1450, 1000);
    cy.server()
    cy.login();
  })

  // it("can successfully navigate to Calculate tab with no uploaded data", () => {
  //   cy.wait(5000)
  //   cy.contains("Calculator").click({force: true});

  //   cy.get("#title").should("contain", "Trading Position Calculator")
  //   cy.get(".setups-inner").should("contain", "No Setups, Add new on strategies tab")
  // })
})
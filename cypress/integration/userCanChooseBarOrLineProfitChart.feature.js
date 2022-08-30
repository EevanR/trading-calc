describe("User can switch between line and bar chart for equity curve", () => {
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
  })

  it("can navigate to Overview tab", () => {
    cy.get(".summary-box").should("contain", "Welcome, TraderZero")
  })
})
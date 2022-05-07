describe("User can calculate trade params on calculator tab", () => {
  beforeEach(() => {
    cy.viewport(1450, 1000);
    cy.server()
    cy.login();

    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/setups",
      response: "fixture:empty_setups_array.json",
      status: 200
    });
  })

  it("can successfully navigate to Calculate tab", () => {
    cy.wait(5000)
    cy.contains("Calculator").click({force: true});

    cy.get("#title").should("contain", "Trading Position Calculator")
  })
})
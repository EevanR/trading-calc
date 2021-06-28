describe("User can delete a setup", () => {
  beforeEach(() => {
    cy.viewport(1450, 1000);
    cy.server()
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/setups",
      response: "fixture:index_strategies.json",
      status: 200,
    })
  })

  it("can successfully delete a setup", () => {
    cy.login();

    cy.contains("Strategies").click();
    cy.route({
      method: "DELETE",
      url: "http;//localhost:3000/api/v1/setups/",
      response: "",
      headers: {
        uid: ""
      },
      status: 200
    })

  })
})
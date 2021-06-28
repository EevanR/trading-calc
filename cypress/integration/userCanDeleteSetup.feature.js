describe("User can delete a setup", () => {
  beforeEach(() => {
    cy.viewport(1450, 1000);
    cy.server()
  })

  it("can successfully delete a setup", () => {
    cy.login();
    cy.route({
      method: "DESTROY",
      url: "http;//localhost:3000/api/v1/setups/",
      response: "",
      headers: {
        uid: ""
      },
      status: 200
    })
  })
})
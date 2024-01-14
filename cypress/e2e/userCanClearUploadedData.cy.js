describe("User can clear uploaded data", () => {
  beforeEach(() => {
    cy.viewport(1450,1000);
    cy.server()
    cy.login()
    cy.requests()
  })

  it("can successfully delete current Trade and Fees Entry", () => {
    cy.route({
      method: "DELETE",
      url: "http://localhost:3000/api/v1/excels/**",
      response: "fixture:deleted_excel.json",
      headers: {
        uid: "trader@mail.com"
      },
      status: 200
    })
    cy.wait(3000)
    cy.contains("Clear Data").click()

    cy.on('window:alert', (str) => {
      expect(str).to.equal("Charts will clear next time you sign in.")
    })
  })

})
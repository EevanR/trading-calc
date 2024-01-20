describe("User can see largest wind and largest loss", () => {
  beforeEach(() => {
    cy.viewport(1450,1000);
    cy.login()
    cy.requests()
  })

  it("can successfully see largest win and loss in User pannel", () => {
    cy.get('.bars').click()
    cy.get('.pannel').should('contain', 31.17)
    cy.get('.pannel').should('contain', -7.65)
  })
})
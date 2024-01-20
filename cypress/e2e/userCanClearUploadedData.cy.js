describe("User can clear uploaded data", () => {

  it("can successfully delete current Trade and Fees Entry", () => {
    cy.login();
    cy.requests();

    cy.intercept('DELETE', 'http://localhost:3000/api/v1/excels/**', {
      fixture: 'deleted_excel.json',
      headers: {
        uid: 'trader@mail.com'
      },
      statusCode: 200
    });
    
    cy.wait(3000)
    cy.contains("Clear Data").click()

    cy.on('window:alert', (str) => {
      expect(str).to.equal("Charts will clear next time you sign in.")
    })
  })

})
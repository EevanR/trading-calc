describe("User can see live tweets", () => {
  beforeEach(() => {
    cy.viewport(1450,1000);
    cy.server()
    cy.login()
    cy.requests()
  })

  it("can successfully set desired user twitter handle", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/tweets",
      response: "fixture:send_twitter_handle.json",
      status: 200,
    })
    cy.get("#username").type("team3dstocks")
    cy.get("#twitter-submit").click()
    cy.get('body').should('include.text', "Showing team3dstocks's last 10 tweets:")
  })

  it("user can choose twitter handle from drop down", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/tweets",
      response: "fixture:index_tweets.json",
      status: 200
    })
    cy.get("#handle-dropdown").click()
    cy.get('.visible > .selected > .text').click()
    cy.get('body').should('include.text', "Showing team3dstocks's last 10 tweets:")
  })
})
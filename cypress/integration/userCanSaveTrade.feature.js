describe("User can save trade", () => {
  beforeEach(() => {
    cy.viewport(1450, 1000)
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/trades",
      response: "fixture:saved_trades.json",
      status: 200
    });
  });

  it("successfully submit new entry", () => {
    cy.login();

    cy.get("#main-form").within(() => {
      cy.get("#equity").type("15000");
      cy.get("#ticker").type("aapl");
      cy.get("#price").type("200");
      cy.get("#stop").type("199.90");
    })

    cy.get(".ui.fluid.dropdown").click()
    cy.get('.ui > .visible > :nth-child(2)').click()

    cy.get(".setups-inner").within(() => {
      cy.get(':nth-child(2) > :nth-child(2) > label').click()
      cy.get(':nth-child(2) > :nth-child(3) > label').click()
      cy.get(':nth-child(2) > :nth-child(4) > label').click()
      cy.get(':nth-child(2) > :nth-child(5) > label').click()
    })
    
    cy.get("#calculate").click()

    cy.route({
      method: "GET",
      url: "https://www.alphavantage.co/query**",
      response: "fixture:alpha_vantage.json",
      status: 200
    });
    cy.route({
      method: "GET",
      url: "https://fmpcloud.io/api/v3/profile/**",
      response: "fixture:fmp.json",
      status: 200
    });

    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/trades",
      response: "fixture:saved_success.json",
      status: 200
    });

    cy.get("#save-form").within(() => {
      cy.get("#profit").type("550.5");
      cy.get("#save-trade").click()
    })

    cy.get("#success-msg").should("contain", "Trade Saved")
  });

});

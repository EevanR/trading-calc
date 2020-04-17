describe("User can view chart", () => {
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

  // it("successfully submit new entry", () => {
  //   cy.get("#main-form").within(() => {
  //     cy.get("#bp").type("15000");
  //     cy.get("#ticker").type("AAPL");
  //     cy.get("#price").type("200");
  //     cy.get("#stop").type("199.90");
  //     cy.get("input#risk").type("50");
  //   })

  //   cy.get(".ui.fluid.dropdown").click()
  //   cy.get('.ui > .visible > :nth-child(2)').click()

  //   cy.get(".setups-inner").within(() => {
  //     cy.get(':nth-child(2) > :nth-child(2) > label').click()
  //     cy.get(':nth-child(2) > :nth-child(3) > label').click()
  //     cy.get(':nth-child(2) > :nth-child(4) > label').click()
  //     cy.get(':nth-child(2) > :nth-child(5) > label').click()
  //   })
    
  //   cy.get("#calculate").click()

  //   cy.route({
  //     method: "GET",
  //     url: "http://localhost:3000/api/v1/trades",
  //     response: "fixture:saved_trades.json",
  //     status: 200
  //   });
  // });

  it("successfully view chart", () => {
    cy.visit("/");

  });

});

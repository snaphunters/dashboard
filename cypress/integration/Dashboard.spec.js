describe("Dashboard", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should render the text 'Dashboard'", () => {
    cy.get("h1.ui.header")
      .contains("Dashboard")
      .should("be.visible");
  });

  it("should render the + button", () => {
    cy.get("button.ui.icon.button").should("be.visible");
  });
});

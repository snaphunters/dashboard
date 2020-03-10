describe("Dashboard", () => {
  beforeEach(() => {
    cy.visit("https://snaphunt-demo-react-testenv.herokuapp.com/");
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

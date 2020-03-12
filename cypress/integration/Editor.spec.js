describe("Editor", () => {
  beforeEach(() => {
    cy.visit("https://snaphunt-demo-react-testenv.herokuapp.com/");
    cy.get("button.ui.icon.button").click();
  });

  it("should render HeaderBar", () => {
    cy.get('[data-testid="HeaderBar"').should("be.visible");
  });
  it("should render save draft button on the HeaderBar", () => {
    cy.get('button[aria-label="Save Button"]').should("be.visible");
  });
});

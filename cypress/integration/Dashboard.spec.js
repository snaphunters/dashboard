describe("Dashboard", () => {
  beforeEach(() => {
    cy.visit("https://snaphunt-demo-react-testenv.herokuapp.com/");
  });
  it("should render the Create New Article button", () => {
    cy.get('[aria-label="Create New Article"]').should("be.visible");
  });
});

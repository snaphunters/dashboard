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
  it("should get get successfully saved modal when title and subtitles are provided and the save draft button is pressed", () => {
    const time = new Date().toISOString();
    cy.get('[aria-label="Topic Title"]').type(`Topic ${time}`);
    cy.get('[aria-label="Sub-Topic Title"]').type(`Subtopic ${time}`);
    cy.get('[aria-label="Save Button"]').click();
    cy.get('[aria-label="close save message"]').should("be.visible");
  });
});

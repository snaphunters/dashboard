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
  it("should render another subtopic container when clicking a new 'add subtopic container' button", () => {
    cy.get('[aria-label="topicSubtopicContainer 1"]').should("be.visible");
    cy.get('[aria-label="Add subtopic container button 1"]').click();
    cy.get('[aria-label="topicSubtopicContainer 2"]').should("be.visible");
    cy.get('[aria-label="Add subtopic container button 2"]').click();
    cy.get('[aria-label="topicSubtopicContainer 3"]').should("be.visible");
    cy.get('[aria-label="Add subtopic container button 3"]').click();
    cy.get('[aria-label="topicSubtopicContainer 4"]').should("be.visible");
    cy.get('[aria-label="Add subtopic container button 4"]').click();
    cy.get('[aria-label="topicSubtopicContainer 5"]').should("be.visible");
  });
  it("should render new subtopic containers below the correct container", () => {
    cy.get('[aria-label="topicSubtopicContainer 1"]').should("be.visible");
    cy.get('[aria-label="Add subtopic container button 1"]').click();
    cy.get('[aria-label="topicSubtopicContainer 2"]').should("be.visible");
    cy.get('[aria-label="topicSubtopicContainer 2"]').type(
      `This block should move to topicSubtopicContainer 3`
    );
    cy.get('[aria-label="Add subtopic container button 2"]').click();
    cy.get('[aria-label="topicSubtopicContainer 3"]').should("be.visible");
    cy.get('[aria-label="Add subtopic container button 3"]').click();
    cy.get('[aria-label="topicSubtopicContainer 4"]').should("be.visible");
    cy.get('[aria-label="Add subtopic container button 4"]').click();
    cy.get('[aria-label="topicSubtopicContainer 5"]').should("be.visible");
    cy.get('[aria-label="topicSubtopicContainer 4"]').type(
      `This block should move to topicSubtopicContainer 6`
    );
    cy.get('[aria-label="Add subtopic container button 3"]').click();
    cy.get('[aria-label="Add subtopic container button 1"]').click();
    cy.get('[aria-label="topicSubtopicContainer 6"]')
      .contains(`This block should move to topicSubtopicContainer 3`)
      .should("be.visible");
    cy.get('[aria-label="topicSubtopicContainer 3"]')
      .contains(`This block should move`)
      .should("be.visible");
  });
});

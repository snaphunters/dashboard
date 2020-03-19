describe("Editor", () => {
  const time = new Date().toISOString();
  const addSubtopicTest = () => {
    cy.get('[aria-label="Add subtopic container button 1"]').click();
    cy.get('[aria-label="Add subtopic container button 2"]').click();
    cy.get('[aria-label="Add subtopic container button 3"]').click();
  };
  const deleteSubtopicTest = () => {
    cy.get('[aria-label="Delete subtopic container button 4"]').click();
    cy.get('[aria-label="Delete subtopic container button 3"]').click();
  };
  const addTextFirstBlock = () => {
    cy.get(".ck-editor__editable_inline")
      .eq(0)
      .click()
      .type(
        "{enter} Lorem ipsum dolor sit amet, consectetur adipiscing elit.{enter}Donec posuere sit amet purus ut fermentum. Nunc quis placerat massa. Aliquam blandit eros eget cursus tincidunt."
      );
  };

  const addTextSubtopicBlockTwo = () => {
    cy.get(".ck-editor__editable_inline")
      .eq(2)
      .click()
      .type(
        "{enter} Lorem ipsum dolor sit amet, consectetur adipiscing elit.{enter}Donec posuere sit amet purus ut fermentum. Nunc quis placerat massa. Aliquam blandit eros eget cursus tincidunt."
      );
    cy.get('[aria-label="Sub-Topic Title"]')
      .eq(1)
      .type(`Subtopic ${time}`);
    cy.get(".ck-editor__editable_inline")
      .eq(3)
      .click()
      .type(
        "{enter} Lorem ipsum dolor sit amet, consectetur adipiscing elit.{enter}Donec posuere sit amet purus ut fermentum. Nunc quis placerat massa. Aliquam blandit eros eget cursus tincidunt."
      );
  };

  beforeEach(() => {
    cy.visit("https://snaphunt-demo-react-testenv.herokuapp.com/");
    cy.get('[aria-label="Create New Article"]').click();
  });
  it("End to End Testing", () => {
    addSubtopicTest();
    deleteSubtopicTest();
    cy.get('[aria-label="Topic Title"]').type(`Topic ${time}`);
    addTextFirstBlock();
    cy.get('[aria-label="Sub-Topic Title"]')
      .eq(0)
      .type(`Subtopic ${time}`);
    cy.get('[aria-label="add topicSubtopic 1 block button 0"]').click();
    addTextSubtopicBlockTwo();
    cy.get('[aria-label="Save Button"]').click();
    cy.get('[aria-label="close save message"]').click();
    cy.get('[aria-label="Return to Dashboard"]').click();
    cy.get('[aria-label="CategoryTab"]')
      .last()
      .click();
    cy.get('[class="ui massive active basic fluid button"]')
      .last()
      .click();
    cy.get('button[aria-label="Remove Article"]').click();
    cy.get(".modal")
      .contains("Delete article?")
      .should("be.visible");
    cy.get(".modal button")
      .eq(0)
      .click();
  });
  it("should render HeaderBar", () => {
    cy.get('[data-testid="HeaderBar"').should("be.visible");
  });
  it("should render save draft button on the HeaderBar", () => {
    cy.get('button[aria-label="Save Button"]').should("be.visible");
  });
  it("should get get successfully saved modal when title and subtitles are provided and the save draft button is pressed", () => {
    cy.get('[aria-label="Topic Title"]').type(`Lorem Topic ${time}`);
    cy.get('[aria-label="Sub-Topic Title"]').type(`Lorem Subtopic ${time}`);
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
    cy.get('[aria-label="Add subtopic container button 2"]').click();
    cy.get('[aria-label="topicSubtopicContainer 3"]').should("be.visible");
    cy.get('[aria-label="Add subtopic container button 3"]').click();
    cy.get('[aria-label="topicSubtopicContainer 4"]').should("be.visible");
    cy.get('[aria-label="Add subtopic container button 4"]').click();
    cy.get('[aria-label="topicSubtopicContainer 5"]').should("be.visible");
    cy.get('[aria-label="topicSubtopicContainer 2"]').type(
      `This block should move to topicSubtopicContainer 3`
    );
    cy.get('[aria-label="topicSubtopicContainer 4"]').type(
      `This block should move to topicSubtopicContainer 6`
    );
    cy.get('[aria-label="Add subtopic container button 1"]').click();
    cy.get('[aria-label="Add subtopic container button 3"]').click();
    cy.get('[aria-label="topicSubtopicContainer 6"]')
      .contains(`This block should move to topicSubtopicContainer 6`)
      .should("be.visible");
    cy.get('[aria-label="topicSubtopicContainer 3"]')
      .contains(`This block should move to topicSubtopicContainer 3`)
      .should("be.visible");
  });
  describe("Edit-Preview button", () => {
    it("should render the edit and preview button", () => {
      cy.get('[aria-label="Edit Button"]').should("be.visible");
      cy.get('[aria-label="Preview Button"]').should("be.visible");
    });
    it("'Topic Title' box should not exist in preview mode", () => {
      cy.get('[aria-label="Topic Title"]').should("exist");
      cy.get('[aria-label="Preview Button"]').click();
      cy.get('[aria-label="Topic Title"]').should("not.exist");
    });
    it("CKEditor content box should be disabled in preview mode and enabled in edit mode", () => {
      cy.get('[aria-label="Preview Button"]').click();
      cy.get('[aria-label="Rich Text Editor, main"]')
        .eq(0)
        .invoke("attr", "contenteditable")
        .should("contain", "false");
      cy.get('[aria-label="Edit Button"]').click();
      cy.get('[aria-label="Rich Text Editor, main"]')
        .eq(0)
        .invoke("attr", "contenteditable")
        .should("contain", "true");
    });
    it("add/delete buttons should not render in preview mode and renders back in edit mode", () => {
      cy.get('[aria-label="Preview Button"]').click();
      cy.get('[aria-label="add topicSubtopic 0 block button 0"]').should(
        "not.exist"
      );
      cy.get('[aria-label="Add subtopic container button 0"]').should(
        "not.exist"
      );
      cy.get('[aria-label="add topicSubtopic 1 block button 0"]').should(
        "not.exist"
      );
      cy.get('[aria-label="Add subtopic container button 1"]').should(
        "not.exist"
      );
      cy.get('[aria-label="Delete subtopic container button 1"]').should(
        "not.exist"
      );
      cy.get('[aria-label="Edit Button"]').click();
      cy.get('[aria-label="add topicSubtopic 0 block button 0"]').should(
        "exist"
      );
      cy.get('[aria-label="Add subtopic container button 0"]').should("exist");
      cy.get('[aria-label="add topicSubtopic 1 block button 0"]').should(
        "exist"
      );
      cy.get('[aria-label="Add subtopic container button 1"]').should("exist");
      cy.get('[aria-label="Delete subtopic container button 1"]').should(
        "exist"
      );
    });
    it("should be able to show the topic titles that are created", () => {
      const currentTime1 = new Date().toISOString();
      cy.get('[aria-label="Topic Title"]').type(currentTime1);
      cy.get('[aria-label="Delete subtopic container button 1"]').click();
      cy.get('[aria-label="Save Button"]').click();
      cy.get('[aria-label="close save message"]').click();
      cy.get('[aria-label="Return to Dashboard"]').click();
      cy.get('[aria-label="CategoryTab"]')
        .last()
        .click();
      cy.get('[class="ui massive active basic fluid button"]')
        .last()
        .click();
      // +1 to time string to make it unique
      const currentTime2 = new Date().toISOString() + "1";
      cy.get('[aria-label="Topic Title"]').type(currentTime2);
      cy.get('[aria-label="Save Button"]').click();
      cy.get('[aria-label="close save message"]').click();
      cy.get('[aria-label="Return to Dashboard"]').click();
      cy.get('[aria-label="CategoryTab"]')
        .last()
        .click();
      cy.contains(currentTime1);
      cy.contains(currentTime2);
    });
  });

  describe("Delete article button", () => {
    it("Delete article button should be rendered on header bar", () => {
      cy.get('button[aria-label="Remove Article"]').should("be.visible");
    });
    it("Clicking delete article button on an existing article should open a modal", () => {
      cy.get('[aria-label="Return to Dashboard"]').click();
      cy.get('[aria-label="CategoryTab"]')
        .last()
        .click();
      cy.get('[class="ui massive active basic fluid button"]')
        .last()
        .click();
      cy.get('button[aria-label="Remove Article"]').click();
      cy.get(".modal")
        .contains("Delete article?")
        .should("be.visible");
    });

    it("Clicking the 'Yes' button on the confirm delete modal should return to the dashboard", () => {
      cy.get('[aria-label="Return to Dashboard"]').click();
      cy.get('[aria-label="CategoryTab"]')
        .last()
        .click();
      cy.get('[class="ui massive active basic fluid button"]')
        .last()
        .click();
      cy.get('button[aria-label="Remove Article"]').click();
      cy.get(".modal")
        .contains("Delete article?")
        .should("be.visible");
      cy.get(".modal button")
        .eq(0)
        .click();
      cy.get('[aria-label="Return to Dashboard"]').should("not.exist");
    });
  });
  describe("Retrive Topic", () => {
    it("should retrieve an article with the correct content and timestamp label", () => {
      const time = new Date().toISOString();
      cy.get('[aria-label="Topic Title"]').type(time);
      cy.get('[aria-label="Rich Text Editor, main"]')
        .eq(0)
        .type("testing only");
      cy.get('[aria-label="Sub-Topic Title"]').type(time);
      cy.get('[aria-label="Rich Text Editor, main"]')
        .eq(1)
        .type("testing");
      cy.get('[aria-label="Save Button"]').click();
      cy.get('[aria-label="close save message"]').click();
      cy.get('[aria-label="Return to Dashboard"]').click();
      cy.get('[aria-label="CategoryTab"]')
        .last()
        .click();
      cy.get('[class="ui massive active basic fluid button"]').last();
      cy.contains(time).click();
      cy.get('[aria-label="Last Updated Label"]');
      cy.get('[aria-label="Topic Title"]').should("have.value", time);
      cy.get('[aria-label="Rich Text Editor, main"]')
        .eq(0)
        .contains("testing only");
      cy.get('[aria-label="Sub-Topic Title"]').should("have.value", time);
      cy.get('[aria-label="Rich Text Editor, main"]')
        .eq(1)
        .contains("testing");
    });
  });
});

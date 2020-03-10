describe("Dashboard", () => {
    it("should render the text 'Dashboard'", () => {
        cy.visit("https://snaphunt-demo-react-testenv.herokuapp.com/")
        cy.get("h1.ui.header").contains("Dashboard")
    })
})
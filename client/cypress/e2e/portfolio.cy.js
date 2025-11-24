describe("Portfolio Navigation Test", () => {
  it("should load the home page and navigate through links", () => {
    cy.visit("http://localhost:5174");

    // Verify Home Page
    cy.contains("Welcome to the Portfolio Admin Dashboard").should("be.visible");

    // Navigate to Sign In
    cy.contains("Sign In").click();
    cy.url().should("include", "/signin");

    // Navigate to Sign Up
    cy.contains("Sign Up").click();
    cy.url().should("include", "/signup");

    // Navigate to Projects Admin
    cy.contains("Projects").click();
    cy.url().should("include", "/admin/projects");
  });
});

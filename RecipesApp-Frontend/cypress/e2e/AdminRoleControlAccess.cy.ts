describe("Login User", () => {
  it("should let the user login", () => {
    cy.visit("http://127.0.0.1:5173/login");
    cy.get('[data-testid="login-username"]').type("admin");
    cy.get('[data-testid="login-password"]').type("a");

    cy.get('[data-testid="login-b"]').click();
    cy.get('[data-testid^="error-"]').should("not.exist");

    cy.url().should("include", "http://127.0.0.1:5173/all");
  });

  it("admin should see the recipes", () => {
    cy.get('[data-testid="recipe-card"]').should("exist");
  });

  it("admin should see the 'Add Recipe' button", () => {
    cy.get('[data-testid="add-recipe-b"]').should("exist");
  });

  it("admin should see the 'Delete Recipe' button", () => {
    cy.get('[data-testid="delete-recipe-b"]').should("exist");
  });

  it("admin should see the 'users' button", () => {
    cy.get('[data-testid="users-button"]').should("exist");
  });
  it("access the recipe details page when clicking the 'View Recipe' button and see the 'Edit Recipe' button", () => {
    cy.get('[data-testid="recipe-card"]')
      .first()
      .find('[data-testid="view-recipe-b"]')
      .click();
    cy.get('[data-testid="edit-recipe-b"]').should("exist");
  });
});

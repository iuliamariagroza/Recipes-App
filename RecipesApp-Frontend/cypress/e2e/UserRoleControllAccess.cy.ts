describe("Login User", () => {
  it("should let the user login", () => {
    cy.visit("http://127.0.0.1:5173/login");
    cy.get('[data-testid="login-username"]').type("user");
    cy.get('[data-testid="login-password"]').type("u");

    cy.get('[data-testid="login-b"]').click();
    cy.get('[data-testid^="error-"]').should("not.exist");

    // cy.wait(1000);

    cy.url().should("include", "http://127.0.0.1:5173/all");
  });

  it("user should see the recipes", () => {
    cy.get('[data-testid="recipe-card"]').should("exist");
  });

  it("user should not see the 'Add Recipe' button", () => {
    cy.get('[data-testid="add-recipe-b"]').should("not.exist");
  });

  it("user should not see the 'Delete Recipe' button", () => {
    cy.get('[data-testid="delete-recipe-b"]').should("not.exist");
  });

  it("user should not see the 'Edit Recipe' button", () => {
    cy.get('[data-testid="recipe-card"]')
      .first()
      .find('[data-testid="view-recipe-b"]')
      .click();
    cy.get('[data-testid="edit-recipe-b"]').should("not.exist");
  });

  it("user should not see the 'users' button", () => {
    cy.get('[data-testid="users-button"]').should("not.exist");
  });
});

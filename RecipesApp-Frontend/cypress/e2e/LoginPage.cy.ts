describe("Login Page Tests", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/login");
  });

  it("should display the login form", () => {
    cy.get('[data-testid="login-form"]').should("exist");
  });

  it("should display the login title", () => {
    cy.get('[data-testid="login-title"]')
      .should("exist")
      .should("have.text", "Login page");
  });

  it("should let the user login", () => {
    cy.get('[data-testid="login-username"]').type("admin");
    cy.get('[data-testid="login-password"]').type("a");

    cy.get('[data-testid="login-b"]').click();
    cy.get('[data-testid^="error-"]').should("not.exist");

    cy.url().should("include", "http://127.0.0.1:5173/all");
  });
});

describe("Login Page Tests - should have errors", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/login");
  });

  it("should display the login form", () => {
    cy.get('[data-testid="login-form"]').should("exist");
  });

  it("should display the login title", () => {
    cy.get('[data-testid="login-title"]')
      .should("exist")
      .should("have.text", "Login page");
  });

  it("user registration should fail because of validation", () => {
    cy.get('[data-testid="login-b"]').click();

    cy.get('[data-testid^="error-"]').should("have.length", 2);

    cy.url().should("include", "http://127.0.0.1:5173/login");
  });
});

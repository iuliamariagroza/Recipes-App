import { v4 } from "uuid";

describe("Registration Page Tests", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173");
  });

  it("should display the registration form", () => {
    cy.get('[data-testid="registration-form"]').should("exist");
  });

  it("should display the registration title", () => {
    cy.get('[data-testid="registration-title"]')
      .should("exist")
      .should("have.text", "Registration page");
  });

  it("should let the user register", () => {
    const username = v4();
    cy.get('[data-testid="registration-username"]').type(username);
    cy.get('[data-testid="registration-password"]').type("password");
    cy.get('[data-testid="registration-confirmationPassword"]').type(
      "password"
    );
    cy.get('[data-testid="registration-role"]').select("user");
    cy.get('[data-testid="register-b"]').click();

    cy.get('[data-testid^="error-"]').should("not.exist");

    cy.url().should("include", "http://127.0.0.1:5173/login");
  });
});

describe("Registration Page Tests - should have errors", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173");
  });

  it("should display the registration form", () => {
    cy.get('[data-testid="registration-form"]').should("exist");
  });

  it("should display the registration title", () => {
    cy.get('[data-testid="registration-title"]')
      .should("exist")
      .should("have.text", "Registration page");
  });

  it("user registration should fail because of validation", () => {
    cy.get('[data-testid="registration-role"]').select("user");
    cy.get('[data-testid="register-b"]').click();

    cy.get('[data-testid^="error-"]').should("have.length", 3);

    cy.url().should("include", "http://127.0.0.1:5173");
  });
});

describe("Registration Page Tests - passwords not matching", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173");
  });

  it("should display the registration form", () => {
    cy.get('[data-testid="registration-form"]').should("exist");
  });

  it("should display the registration title", () => {
    cy.get('[data-testid="registration-title"]')
      .should("exist")
      .should("have.text", "Registration page");
  });

  it("user registration should fail because of validation", () => {
    cy.get('[data-testid="registration-role"]').select("user");

    cy.get('[data-testid="registration-username"]').type("username");
    cy.get('[data-testid="registration-password"]').type("password");
    cy.get('[data-testid="registration-confirmationPassword"]').type(
      "password-wrong"
    );
    cy.get('[data-testid="register-b"]').click();

    cy.get('[data-testid^="error-"]').should("have.length", 1);
    cy.get('[data-testid="error-Passwords must match"]').should("exist");

    cy.url().should("include", "http://127.0.0.1:5173");
  });
});

describe("Edit User's username Test", () => {
  it("should let the user login", () => {
    cy.visit("http://127.0.0.1:5173/login");

    cy.get('[data-testid="login-username"]').type("admin");
    cy.get('[data-testid="login-password"]').type("a");

    cy.get('[data-testid="login-b"]').click();
    cy.get('[data-testid^="error-"]').should("not.exist");

    cy.url().should("include", "http://127.0.0.1:5173/all");
  });

  it("should navigate to users page and edit user details", () => {
    cy.visit("http://127.0.0.1:5173/users");
    cy.url().should("include", "http://127.0.0.1:5173/users");
    cy.get('[data-testid="edit-user-b"]').first().click();
  });

  it("should display the edit user form", () => {
    cy.get('[data-testid="edituser-form"]').should("exist");
  });

  it("should display the login title", () => {
    cy.get('[data-testid="edituser-title"]')
      .should("exist")
      .should("have.text", "Edit details");
  });

  it("should edit the username of the first user", () => {
    const username = "userrrr";
    cy.get('[data-testid="edit-user-username"]').clear().type(username);
    cy.get('[data-testid="edit-user-button"]').click();
    cy.url().should("include", "http://127.0.0.1:5173/users");
  });
});

describe("Edit User's role Test", () => {
  it("should let the user login", () => {
    cy.visit("http://127.0.0.1:5173/login");

    cy.get('[data-testid="login-username"]').type("admin");
    cy.get('[data-testid="login-password"]').type("a");

    cy.get('[data-testid="login-b"]').click();
    cy.get('[data-testid^="error-"]').should("not.exist");

    cy.url().should("include", "http://127.0.0.1:5173/all");
  });

  it("should navigate to users page and edit user details", () => {
    cy.visit("http://127.0.0.1:5173/users");
    cy.url().should("include", "http://127.0.0.1:5173/users");
    cy.get('[data-testid="edit-user-b"]').first().click();
  });

  it("should display the edit user form", () => {
    cy.get('[data-testid="edituser-form"]').should("exist");
  });

  it("should display the login title", () => {
    cy.get('[data-testid="edituser-title"]')
      .should("exist")
      .should("have.text", "Edit details");
  });

  it("should edit the username of the first user", () => {
    const role = "manager";
    cy.get('[data-testid="edit-user-role"]').clear().type(role);
    cy.get('[data-testid="edit-user-button"]').click();
    cy.url().should("include", "http://127.0.0.1:5173/users");
  });
});

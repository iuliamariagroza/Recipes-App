import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import DeleteRecipe from "../pages/DeleteRecipePage/DeleteRecipe";

vi.mock("react-router-dom", async () => {
  const actualRouterDom = await vi.importActual<
    typeof import("react-router-dom")
  >("react-router-dom");
  return {
    ...actualRouterDom,
    useNavigate: vi.fn(),
    useParams: () => ({ id: "123" }),
  };
});

describe("DeleteRecipe", () => {
  test("renders correctly and can initiate delete", async () => {
    const mockOnDeleteRecipe = vi.fn();
    const mockNavigate = vi.fn();

    render(
      <MemoryRouter>
        <DeleteRecipe onDeleteRecipe={mockOnDeleteRecipe} />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Are you sure you want to delete this recipe?/)
    ).toBeDefined();
    const deleteButton = screen.getByTestId("delete-recipe-button");
    expect(deleteButton).toBeDefined();

    fireEvent.click(deleteButton);

    expect(mockOnDeleteRecipe).toHaveBeenCalledWith("123");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import EditRecipe from "../pages/EditRecipePage/EditRecipe";

const { mockedUseNavigate } = vi.hoisted(() => {
  return {
    mockedUseNavigate: vi.fn(),
  };
});

vi.mock("react-router-dom", async () => {
  const router = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...router,
    useNavigate: () => mockedUseNavigate,
  };
});

describe("EditRecipe", () => {
  test("EditRecipe renders correctly with valid recipe ID", () => {
    const recipes = [
      {
        id: "1",
        title: "Spaghetti Carbonara",
        image: "carbonara.jpg",
        description: "A classic pasta dish.",
        author: { id: "1", name: "Chef Luigi" },
      },
    ];

    render(
      <MemoryRouter initialEntries={["/edit/1"]}>
        <Routes>
          <Route
            path="/edit/:id"
            element={<EditRecipe recipes={recipes} onEditRecipe={vi.fn()} />}
          />
        </Routes>
      </MemoryRouter>
    );

    const form = screen.getByTestId("edit-recipe-form");
    expect(form).toBeDefined();
  });

  test("EditRecipe form submission with valid changes", () => {
    const mockOnEditRecipe = vi.fn();

    render(
      <MemoryRouter initialEntries={["/edit/" + "1"]}>
        <Routes>
          <Route
            path="/edit/:id"
            element={
              <EditRecipe
                recipes={[
                  {
                    id: "1",
                    title: "Spaghetti Carbonara",
                    image: "carbonara.jpg",
                    description: "A classic pasta dish.",
                    author: { id: "1", name: "Chef Luigi" },
                  },
                ]}
                onEditRecipe={mockOnEditRecipe}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const savebttn = screen.getByTestId("save-recipe-button");
    const titleInput = screen.getByPlaceholderText("Title");
    fireEvent.change(titleInput, {
      target: { value: "Spaghetti Carbonara updated" },
    });

    const descriptionInput = screen.getByPlaceholderText("Description");
    fireEvent.change(descriptionInput, {
      target: { value: "A classic pasta dish updated" },
    });

    const imageInput = screen.getByPlaceholderText("Image");
    fireEvent.change(imageInput, {
      target: { value: "pastecarbonara.jpg" },
    });

    fireEvent.click(savebttn);
    expect(mockOnEditRecipe).toHaveBeenCalledWith({
      id: "1",
      title: "Spaghetti Carbonara Updated",
      image: "pastecarbonara.jpg",
      description: "A classic pasta dish.",
      author: { id: "1", name: "Chef Luigi" },
    });
  });
});

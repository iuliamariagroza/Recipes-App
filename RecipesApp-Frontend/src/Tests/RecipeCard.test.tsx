import { render } from "@testing-library/react";
import { vi } from "vitest";
import RecipeCard from "../components/RecipeCard/RecipeCard";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("recipe", () => {
  it("recipe", () => {
    const result = render(
      <RecipeCard
        recipe={{
          id: "1",
          title: "title1",
          image: "orice",
          description: "desc1",
          author: { id: "1", name: "autor1" },
        }}
      />
    );
    expect(result).toMatchSnapshot();
  });
});

import { Recipe } from "./models/recipe";

import { faker } from "@faker-js/faker";

export function createRandomRecipe(): Recipe {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(),
    author: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    image: faker.image.urlLoremFlickr({ category: "food" }),
  };
}

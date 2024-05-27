import { Author } from "./models/author";

const { faker } = require("@faker-js/faker");

export function createRandomAuthor(): Author {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
  };
}

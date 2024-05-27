export class NotFoundException extends Error {
  constructor(id: string) {
    super("Recipe with id " + id + " not found");
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}

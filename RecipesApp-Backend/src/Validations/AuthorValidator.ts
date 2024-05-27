export const validateAuthor = (data: any) => {
  const errors: string[] = [];
  if (typeof data.name === "string") {
    if (data.name === "") {
      errors.push("Name must not be null");
    }
  } else {
    errors.push("Name must be a string");
  }
  return errors;
};

export const validateRecipe = (data: any) => {
  const errors: string[] = [];
  if (typeof data.title === "string") {
    if (data.title === "") {
      errors.push("Title must not be null");
    }
  } else {
    errors.push("Title must be a string");
  }

  const regexPattern = new RegExp(
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
  );
  if (typeof data.image === "string") {
    if (!regexPattern.test(data.image)) {
      errors.push("The URL of the image must be valid");
    }
  } else {
    errors.push("URL of image must be a string");
  }

  if (typeof data.description === "string") {
    if (data.description === "") {
      errors.push("Description must not be null");
    }
  } else {
    errors.push("Description must be a string");
  }

  return errors;
};

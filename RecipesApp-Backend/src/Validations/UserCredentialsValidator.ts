export const ValidateRegistration = (data: any) => {
  const errors: string[] = [];

  if (typeof data.username === "string") {
    if (data.username === "") {
      errors.push("Username must not be null");
    }
  } else {
    errors.push("Username must be a string");
  }

  if (data.password === "") {
    errors.push("Password must not be null");
  }

  if (data.confirmationPassword === "") {
    errors.push("Confirmation Password must not be null");
  }

  if (data.password != data.confirmationPassword) {
    errors.push("Passwords must match");
  }
  return errors;
};

export const validateLogin = (data: any): string[] => {
  const errors: string[] = [];

  if (typeof data.username === "string") {
    if (data.username === "") {
      errors.push("Username must not be null");
    }
  } else {
    errors.push("Username must be a string");
  }

  if (data.password === "") {
    errors.push("Password must not be null");
  }
  return errors;
};

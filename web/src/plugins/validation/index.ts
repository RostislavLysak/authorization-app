interface IValidation {
  password: string;
  rules?: {
    veryWeak?: string;
    weak?: string;
    strong?: string;
    veryStrong?: string;
  };
}

export const validateStrongPassword = ({ password, rules }: IValidation) => {
  if (!password) {
    return null;
  }

  if (password.length < 3) {
    return rules?.veryWeak ?? "Very weak";
  }

  if (password.length >= 3 && password.length < 6) {
    return rules?.weak ?? "Weak";
  }

  if (password.length >= 6 && password.length < 10) {
    return rules?.strong ?? "Strong";
  }

  if (password.length >= 10) {
    return rules?.veryStrong ?? "Very strong";
  }
};

import { useState } from "react";

type ValidationResult = boolean | string;

type ValidationFn<V> = (v: V) => ValidationResult;

const useForm = <T>(schema: T, rules?: Partial<Record<keyof T, ValidationFn<string>>>) => {
  const [values, setValues] = useState<T>(schema);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name as keyof T;

    const rule = rules?.[name];

    if (rule) {
      const message = rule(value);

      if (typeof message === "string") {
        setErrors((prev) => ({ ...prev, [name]: message }));
      }

      if (message && typeof message === "boolean") {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    }

    setValues({ ...values, [name]: value });
  };

  const register = (name: keyof T) => {
    return {
      name,
      value: values[name],
      onChange: handleChange,
    };
  };

  const isValidHelper = () => {
    // @ts-ignore
    const errorsArray = Object.entries(rules ?? {}).map(([n, r]) => {
      if (r) {
        // @ts-ignore
        const message = r(values[n as keyof T]);

        if (typeof message === "string") {
          setErrors((prev) => ({ ...prev, [n]: message }));
        }

        return typeof message === "boolean" && message;
      }

      return true;
    });

    return errorsArray.every(Boolean);
  };

  const handleSubmit = (handler: (values: T) => void) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = isValidHelper();

    if (isValid) {
      handler(values);
    }
  };

  return {
    values,
    errors,
    register,
    submit: handleSubmit,
    onChange: handleChange,
  };
};

export default useForm;

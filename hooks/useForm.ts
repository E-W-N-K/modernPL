import { useState } from 'react';

export type FormErrors<T> = Partial<Record<keyof T, string>>;

export function useForm<T extends Record<string, string>>(
  initialValues: T,
  validate: (values: T) => FormErrors<T>,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  function handleChange<K extends keyof T>(key: K, text: string) {
    setValues((prev) => ({ ...prev, [key]: text }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleSubmit(onValid: (values: T) => void) {
    const nextErrors = validate(values);
    setErrors(() => nextErrors);
    if (Object.keys(nextErrors).length === 0) onValid(values);
  }

  function reset() {
    setValues(() => initialValues);
    setErrors(() => ({}));
  }

  return { values, errors, handleChange, handleSubmit, reset };
}

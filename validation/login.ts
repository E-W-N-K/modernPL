import type { FormErrors } from '../hooks/useForm';

export type LoginValues = { email: string; password: string };

export function validateLogin(values: LoginValues): FormErrors<LoginValues> {
  const errors: FormErrors<LoginValues> = {};
  const email = values.email.trim();
  if (!email) errors.email = 'Введите электронную почту';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Укажите адрес в формате name@example.com';
  if (!values.password) errors.password = 'Введите пароль';
  else if (values.password.length < 6) errors.password = 'Пароль должен содержать минимум 6 символов';
  return errors;
}

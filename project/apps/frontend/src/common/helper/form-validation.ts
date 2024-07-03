import { TAuthData } from '../type/user.type';

const validateEmail = (email: string): boolean =>
  /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(email);

const validatePassword = (password: string): boolean =>
  /^[A-za-z0-9_]+[A-za-z0-9_]{1,}$/.test(password);

const validateLoginForm = (formData: TAuthData): boolean => {
  if (!validateEmail(formData.email) || !validatePassword(formData.password)) {
    return false;
  }

  return true;
};

export {
  validateLoginForm,
  validateEmail,
  validatePassword,
}

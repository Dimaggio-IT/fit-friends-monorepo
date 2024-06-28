export enum LoginLength {
  Min = 1,
  Max = 15,
}

export enum PasswordLength {
  Min = 6,
  Max = 12,
}

export const AuthenticationValidateMessage = {
  EmailNotValid: 'The email is not valid',
} as const;

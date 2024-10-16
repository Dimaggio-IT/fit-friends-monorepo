export enum LoginLength {
  Min = 1,
  Max = 15,
}

export enum PasswordLength {
  Min = 6,
  Max = 12,
}

export enum DescriptionLength {
  Min = 10,
  Max = 140,
}

export const AuthenticationValidateMessage = {
  EmailNotValid: 'The email is not valid',
} as const;

export const AmountOfCalories = {
  Min: 1000,
  Max: 5000,
} as const;

export const UserErrorMessage = {
  DescriptionLengthNotValid: 'The description is not valid',
} as const;

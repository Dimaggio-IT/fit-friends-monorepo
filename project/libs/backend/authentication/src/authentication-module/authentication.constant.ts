export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_OR_PASSWORD_WRONG = 'User or password is wrong';

export const AuthenticationResponseMessage = {
  LoggedSuccess: 'The User has been successfully logged',
  LoggedError: 'The password or Login is wrong',
  UserFound: 'The user found',
  UserChecked: 'The user checked',
  UserNotFound: 'The user not found',
  UserExist: 'The user with the email already exists',
  UserCreated: 'The new user has been successfully created',
  UserLogout: 'The user has been successfully logged out'
} as const;

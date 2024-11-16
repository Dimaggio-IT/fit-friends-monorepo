const UserLocation = {
  Pioneer: 'Пионерская',
  Petrograd: 'Петроградская',
  Specific: 'Удельная',
  Starry: 'Звёздная',
  Sporty: 'Спортивная',
} as const;

const UserRole = {
  Coach: 'тренер',
  Athlete: 'атлет',
} as const;

const UserLevel = {
  Beginner: 'новичок',
  Amateur: 'любитель',
  Professional: 'профессионал',
} as const;

const UserSex = {
  Man: 'мужской',
  Woman: 'женский',
  Any: 'неважно',
} as const;

const UserConstraints = {
  Description: { MIN: 10, MAX: 140 },
  TrainingType: { MIN: 1, MAX: 3 },
  Login: { MIN: 1, MAX: 15 },
} as const;

const USERS_LOCATION = Object.values(UserLocation);

const USERS_LEVEL = Object.values(UserLevel);

const USERS_SEX = Object.values(UserSex);

export {
  UserLocation,
  UserRole,
  UserLevel,
  UserSex,
  UserConstraints,
  USERS_LOCATION,
  USERS_LEVEL,
  USERS_SEX,
};

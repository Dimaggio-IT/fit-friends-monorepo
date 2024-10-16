export const COUNT_OF_PRODUCTS = 12;
export const COUNT_OF_COMMENTS = 15;
export const COUNT_OF_USERS = 12;
export const COUNT_OF_ORDERS = 2;
export const COUNT_OF_BALANCES = 3;
export const COUNT_OF_NOTIFICATIONS = 25;
export const USER_PASSWORD_DEFAULT = '123456';

export const RATINGS = {
  MIN: 0,
  MAX: 5,
} as const;

export const NOTIFICATION = {
  MIN: 1,
  MAX: 8,
} as const;

export const PRODUCT_GENERATOR_CONFIG = {
  MIN_PRICE: 0,
  MAX_PRICE: 100_000,
  MIN_DESCRIPTION: 10,
  MAX_DESCRIPTION: 140,
  MIN_RATING: 0,
  MAX_RATING: 5,
  MIN_CALORIES: 1000,
  MAX_CALORIES: 5000,
} as const;

// export const USER_SEX = {
//   MAN: 'мужской',
//   WOMAN: 'женский',
//   ANY: 'неважно',
// } as const;

// type TUserSex = keyof typeof USER_SEX;
// export const usersSex: Array<TUserSex> = ['ANY', 'MAN', 'WOMAN'];

// export const usersLocation: Array<TUserLocation> = ['Petrograd', 'Pioneer', 'Specific', 'Sporty', 'Starry'];

export const USER_LEVEL = {
  BEGINNER: 'новичок',
  AMATEUR: 'любитель',
  PROFESSIONAL: 'профессионал',
} as const;

type TUserLevel = keyof typeof USER_LEVEL;
export const userLevels: Array<TUserLevel> = ['AMATEUR', 'BEGINNER', 'PROFESSIONAL'];

export const PRODUCT_TYPE = {
  YOGA: 'йога',
  RUNNING: 'бег',
  BOXING: 'бокс',
  STRETCHING: 'стретчинг',
  CROSSFIT: 'кроссфит',
  AEROBICS: 'аэробика',
  PILATES: 'пилатес',
} as const;

type TProductType = keyof typeof PRODUCT_TYPE;
export const productTypes: Array<TProductType> = ['AEROBICS', 'BOXING', 'CROSSFIT', 'PILATES', 'RUNNING', 'STRETCHING', 'YOGA'];

export const TRAINING_SEX = {
  FOR_MALE: 'для мужчин',
  FOR_FEMALE: 'для женщин',
  FOR_BOTH: 'для всех',
} as const;

type TTrainingSex = keyof typeof TRAINING_SEX;
export const trainingsSex: Array<TTrainingSex> = ['FOR_BOTH', 'FOR_FEMALE', 'FOR_MALE'];

export const PAYMENT_TYPE = {
  Visa: 'visa',
  Mir: 'mir',
  Umoney: 'umoney',
} as const;

type TPaymentType = keyof typeof PAYMENT_TYPE;
export const paymentType: Array<TPaymentType> = ['Mir', 'Umoney', 'Visa'];

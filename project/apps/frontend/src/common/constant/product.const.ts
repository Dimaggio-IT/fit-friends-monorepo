const WorkoutType = {
  Yoga: 'йога',
  Running: 'бег',
  Boxing: 'бокс',
  Stretching: 'стретчинг',
  Crossfit: 'кроссфит',
  Aerobics: 'аэробика',
  Pilates: 'пилатес',
} as const;

const WorkoutSex = {
  Male: 'для мужчин',
  Female: 'для женщин',
  Both: 'для всех',
} as const;

const WORKOUT_TYPES = Object.values(WorkoutType);

const DISCOUNT_PERCENTAGE = 10;

const ProductConstraints = {
  Description: { MIN: 10, MAX: 140 },
} as const;

export {
  WorkoutType,
  WORKOUT_TYPES,
  DISCOUNT_PERCENTAGE,
  ProductConstraints,
  WorkoutSex,
};

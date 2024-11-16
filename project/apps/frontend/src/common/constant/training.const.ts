const WorkoutType = {
  Yoga: 'йога',
  Running: 'бег',
  Boxing: 'бокс',
  Stretching: 'стретчинг',
  Crossfit: 'кроссфит',
  Aerobics: 'аэробика',
  Pilates: 'пилатес',
} as const;

const WORKOUT_TYPES = Object.values(WorkoutType);

export {
  WorkoutType,
  WORKOUT_TYPES,
};

const CommentConstraints = {
  Content: { MIN: 100, MAX: 1024 },
} as const;

const RATING_DEFAULT = 5;

const TRAINING_RATINGS = [1, 2, 3, 4, 5];

export {
  CommentConstraints,
  RATING_DEFAULT,
  TRAINING_RATINGS
}

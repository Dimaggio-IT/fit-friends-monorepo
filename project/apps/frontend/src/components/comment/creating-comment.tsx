import { useEffect, useState } from 'react';
import {
  CommentConstraints,
  RATING_DEFAULT,
  TRAINING_RATINGS,
} from '../../common';

type TCreatingCommentProps = {
  onClose?: () => void;
  trainingId: string;
  userId: string;
};

const CreatingComment = ({
  trainingId,
  userId,
  onClose,
}: TCreatingCommentProps): JSX.Element => {
  const [rating, setRating] = useState(RATING_DEFAULT);
  const handleRatingChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = evt.target;
    setRating(Number(value));
    evt.target.setAttribute('checked', 'true');
  };

  const [content, setContent] = useState<string>('');
  const handleContentChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = evt.target;
    setContent(value);
  };

  const [isIncorrectContent, setIsIncorrectContent] = useState<boolean>(false);
  useEffect(() => {
    if (
      content &&
      (content.length < CommentConstraints.Content.MIN ||
        content.length > CommentConstraints.Content.MAX)
    ) {
      setIsIncorrectContent(true);
    } else {
      setIsIncorrectContent(false);
    }
  }, [content]);

  const [isComplete, setIsComplete] = useState(false);
  const handleSubmit = () => {
    if (!isIncorrectContent) {
      const data = {
        userId: userId,
        trainingId: trainingId,
        ratingTraining: rating,
        message: content,
      };
      // console.log(data);
      setIsComplete(true);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <section className="popup">
      <div className="popup__wrapper">
        <div className="popup-head">
          <h2 className="popup-head__header">Оставить отзыв</h2>
          <button
            className="btn-icon btn-icon--outlined btn-icon--big"
            type="button"
            aria-label="close"
            onClick={handleClose}
          >
            <svg width="20" height="20" aria-hidden="true">
              <use xlinkHref="#icon-cross"></use>
            </svg>
          </button>
        </div>
        <div
          className="popup__content popup__content--feedback"
          data-testid="RatingInputs"
        >
          <h3 className="popup__feedback-title">Оцените тренировку</h3>
          <ul className="popup__rate-list">
            {TRAINING_RATINGS.map((item) => (
              <li className="popup__rate-item" key={item}>
                <div className="popup__rate-item-wrap">
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      aria-label={`оценка ${item}.`}
                      id={item.toString()}
                      value={item}
                      checked={item === rating}
                      required
                      onChange={handleRatingChange}
                    />
                    <span className="popup__rate-number">{item}</span>
                  </label>
                </div>
              </li>
            ))}
          </ul>
          <div className="popup__feedback">
            <h3 className="popup__feedback-title popup__feedback-title--text">
              Поделитесь своими впечатлениями о тренировке
            </h3>
            <div className="popup__feedback-textarea">
              <div className="custom-textarea">
                <label>
                  <span className="custom-input--error">
                    <textarea
                      name="description"
                      placeholder=" "
                      onChange={handleContentChange}
                      data-testid="content"
                    ></textarea>
                    {isIncorrectContent && (
                      <span className="custom-textarea__error">
                        {`Минимальная длина ${CommentConstraints.Content.MIN} символ. Максимальная длина ${CommentConstraints.Content.MAX}
                        символов`}
                      </span>
                    )}
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="popup__button">
            <button
              className="btn"
              type="button"
              disabled={isComplete}
              onClick={handleSubmit}
              data-testid="submit"
            >
              Продолжить
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CreatingComment };

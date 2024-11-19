import { IComment } from '@project/common';

type TCommentProps = {
  comment: IComment;
};

const Comment = ({ comment }: TCommentProps): JSX.Element => (
  <div className="review">
    <div className="review__user-info">
      <div className="review__user-photo">
        <picture>
          <img
            src={comment.userAvatar}
            width="64"
            height="64"
            alt="Изображение пользователя"
          />
        </picture>
      </div>
      <span className="review__user-name">{comment.userName}</span>
      <div className="review__rating">
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-star"></use>
        </svg>
        <span>{comment.rating}</span>
      </div>
    </div>
    <p className="review__comment" data-testid="comment">
      {comment.content}
    </p>
  </div>
);

export { Comment };

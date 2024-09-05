import { Link } from 'react-router-dom';
import { AppRoute } from '../../common';
import { UserRdo } from '@project/common';

type TThumbnailUserProps = {
  user: UserRdo;
};

function ThumbnailUser({ user }: TThumbnailUserProps): JSX.Element {
  return (
    <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
      <div className="thumbnail-user__image">
        <picture>
          <source
            type="image/webp"
            srcSet={`img/content/thumbnails/${user.avatar}.webp, img/content/thumbnails/${user.avatar}@2x.webp 2x`}
          />
          <img
            src={`img/content/thumbnails/${user.avatar}.jpg`}
            srcSet={`img/content/thumbnails/${user.avatar}@2x.jpg 2x`}
            width="82"
            height="82"
            alt=""
          />
        </picture>
      </div>
      <div className="thumbnail-user__header">
        <h3 className="thumbnail-user__name">{user.login}</h3>
        <div className="thumbnail-user__location">
          <svg width="14" height="16" aria-hidden="true">
            <use xlinkHref="#icon-location"></use>
          </svg>
          <address className="thumbnail-user__location-address">
            {user.location}
          </address>
        </div>
      </div>
      <ul className="thumbnail-user__hashtags-list">
        <li className="thumbnail-user__hashtags-item">
          <div className="hashtag thumbnail-user__hashtag">
            <span>{user.trainingType}</span>
          </div>
        </li>
      </ul>
      <Link
        className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button"
        to={AppRoute.Main}
      >
        Подробнее
      </Link>
    </div>
  );
}

export { ThumbnailUser };

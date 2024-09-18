import { Link } from 'react-router-dom';
import { AppRoute } from '../../common';
import { IUserRdo } from '@project/common';

type TThumbnailUserProps = {
  user: IUserRdo;
};

const REG_EXP_FILE_WITHOUT_EXTENSION = /\.[^/.]+$/;

function ThumbnailUser({ user }: TThumbnailUserProps): JSX.Element {
  const { avatar, trainingType: tags } = user;
  const isTags = tags.length > 0;
  const userImagePath = avatar.replace(REG_EXP_FILE_WITHOUT_EXTENSION, '');
  const userAvatarPath = `img/content/thumbnails/${userImagePath}`;
  // const tagsOverview = tags.map((v, i) => `#${v}`);

  return (
    <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
      <div className="thumbnail-user__image">
        <picture>
          <source
            type="image/webp"
            srcSet={`${userAvatarPath}.webp, ${userAvatarPath}@2x.webp 2x`}
          />
          <img
            src={`${userAvatarPath}.jpg`}
            srcSet={`${userAvatarPath}@2x.jpg 2x`}
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
      {isTags && (
        <ul className="thumbnail-user__hashtags-list">
          {tags.map((v, _) => (
            <li className="thumbnail-user__hashtags-item">
              <div className="hashtag thumbnail-user__hashtag">
                <span>{`#${v}`}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
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

import { Link } from 'react-router-dom';
import { AppRoute, dropExtensionFromFileName } from '../../common';
import { IProductRdo } from '@project/common';

type TThumbnailTrainingProps = {
  product: IProductRdo;
};

function ThumbnailTraining({ product }: TThumbnailTrainingProps): JSX.Element {
  const { backgroundImage, name, rating, price, description } = product;
  const imagePath = dropExtensionFromFileName(backgroundImage);
  const productBackgroundPath = `img/content/thumbnails/${imagePath}`;

  return (
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <source
              type="image/webp"
              srcSet={`${productBackgroundPath}.webp, ${productBackgroundPath}@2x.webp 2x`}
            />
            <img
              src={`${productBackgroundPath}.jpg`}
              srcSet={`${productBackgroundPath}@2x.jpg 2x`}
              width="330"
              height="190"
              alt=""
            />
          </picture>
        </div>
        <p className="thumbnail-training__price">
          <span className="thumbnail-training__price-value">{price}</span>
          <span>₽</span>
        </p>
        <h3 className="thumbnail-training__title">{name}</h3>
        <div className="thumbnail-training__info">
          <ul className="thumbnail-training__hashtags-list">
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>#типТренировка</span>
              </div>
            </li>
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>#КолВоКкал</span>
              </div>
            </li>
          </ul>
          <div className="thumbnail-training__rate">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <span className="thumbnail-training__rate-value">{rating}</span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text">{description}</p>
        </div>
        <div className="thumbnail-training__button-wrapper">
          <Link
            className="btn btn--small thumbnail-training__button-catalog"
            to={AppRoute.Main}
          >
            Подробнее
          </Link>
          <Link
            className="btn btn--small btn--outlined thumbnail-training__button-catalog"
            to={AppRoute.Main}
          >
            Отзывы
          </Link>
        </div>
      </div>
    </div>
  );
}

export { ThumbnailTraining };

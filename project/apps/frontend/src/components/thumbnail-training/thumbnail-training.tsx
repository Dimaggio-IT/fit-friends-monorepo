import { Link } from 'react-router-dom';
import { AppRoute } from '../../common';
import { IProductRdo } from '@project/common';

type TThumbnailTrainingProps = {
  product: IProductRdo;
};

const test = 'training-12';

function ThumbnailTraining({ product }: TThumbnailTrainingProps): JSX.Element {
  console.log(product);
  return (
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <source
              type="image/webp"
              srcSet={`img/content/thumbnails/${product.backgroundImage}.webp, img/content/thumbnails/${product.backgroundImage}@2x.webp 2x`}
            />
            <img
              src={`img/content/thumbnails/${product.backgroundImage}.jpg`}
              srcSet={`img/content/thumbnails/${product.backgroundImage}@2x.jpg 2x`}
              width="330"
              height="190"
              alt=""
            />
          </picture>
        </div>
        <p className="thumbnail-training__price">
          <span className="thumbnail-training__price-value">{product.price}</span>
          <span>₽</span>
        </p>
        <h3 className="thumbnail-training__title">{product.name}</h3>
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
            <span className="thumbnail-training__rate-value">{product.rating}</span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text">
            {product.description}
          </p>
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

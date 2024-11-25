import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, dropExtensionFromFileName } from '../../common';
import { IProductRdo } from '@project/common';

type TThumbnailProductProps = {
  product: IProductRdo;
};

function ThumbnailProduct({ product }: TThumbnailProductProps): JSX.Element {
  const { backgroundImage, name, rating, price, description } = product;
  const imagePath = dropExtensionFromFileName(backgroundImage);
  const productBackgroundPath = `img/content/thumbnails/${imagePath}`;


  const navigate = useNavigate();
  const handleRouteChange = () => {
    // TODO: подгрузить данные тренера в стор
    // TODO: подгрузить комментарии в стор
    const path = `${AppRoute.Product}/${product.id}`;
    navigate(path);
  };

  return (
    <div className="thumbnail-training" key={product.id}>
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
          <button
            className="btn btn--small thumbnail-training__button-catalog"
            type="button"
            onClick={handleRouteChange}
          >
            Подробнее
          </button>
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

export { ThumbnailProduct };

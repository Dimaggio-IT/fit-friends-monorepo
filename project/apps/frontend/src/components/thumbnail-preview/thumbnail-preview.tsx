import { Link } from 'react-router-dom';
import { AppRoute } from '../../common';
import { IProductRdo } from '@project/common';

type TThumbnailPreviewProps = {
  product: IProductRdo;
};

function ThumbnailPreview({ product }: TThumbnailPreviewProps): JSX.Element {
  return (
    <div className="thumbnail-preview">
      <div className="thumbnail-preview__image">
        <picture>
          <source
            type="image/webp"
            srcSet={`img/content/thumbnails/${product.backgroundImage}.webp, img/content/thumbnails/${product.backgroundImage}@2x.webp 2x`}
          />
          <img
            src={`img/content/thumbnails/${product.backgroundImage}.jpg`}
            srcSet={`img/content/thumbnails/${product.backgroundImage}@2x.jpg 2x`}
            width="452"
            height="191"
            alt=""
          />
        </picture>
      </div>
      <div className="thumbnail-preview__inner">
        <h3 className="thumbnail-preview__title">crossfit</h3>
        <div className="thumbnail-preview__button-wrapper">
          <Link
            className="btn btn--small thumbnail-preview__button"
            to={AppRoute.Main}
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
}

export { ThumbnailPreview };

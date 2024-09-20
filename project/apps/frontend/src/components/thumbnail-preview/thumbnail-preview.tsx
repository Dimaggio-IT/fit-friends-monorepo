import { Link } from 'react-router-dom';
import { AppRoute, dropExtensionFromFileName } from '../../common';
import { IProductRdo } from '@project/common';

type TThumbnailPreviewProps = {
  product: IProductRdo;
};

function ThumbnailPreview({ product }: TThumbnailPreviewProps): JSX.Element {
  const { backgroundImage, name } = product;
  const imagePath = dropExtensionFromFileName(backgroundImage);
  const productBackgroundPath = `img/content/thumbnails/${imagePath}`;

  return (
    <div className="thumbnail-preview">
      <div className="thumbnail-preview__image">
        <picture>
          <source
            type="image/webp"
            srcSet={`${productBackgroundPath}.webp, ${productBackgroundPath}@2x.webp 2x`}
          />
          <img
            src={`${productBackgroundPath}.jpg`}
            srcSet={`${productBackgroundPath}@2x.jpg 2x`}
            width="452"
            height="191"
            alt=""
          />
        </picture>
      </div>
      <div className="thumbnail-preview__inner">
        <h3 className="thumbnail-preview__title">{name}</h3>
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

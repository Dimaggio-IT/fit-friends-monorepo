import { AppRoute } from '../../../common';
import { Link } from 'react-router-dom';
import {
  CollectionCompilationControl,
} from '../../../components';
import { WrapperForWrappedProps, WrapperProps } from 'apps/frontend/src/hof';

function Compilation({
  index,
  chunkOfData,
  isEmptyProducts,
  products,
  onIndexNextChange,
  onIndexPreviousChange,
}: WrapperProps & WrapperForWrappedProps): JSX.Element {
  const handlePreviousButtonClick = () => {
    onIndexPreviousChange();
  };

  const handleNextButtonClick = () => {
    onIndexNextChange();
  };

  return (
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">
              Специально подобрано для вас
            </h2>

            <CollectionCompilationControl
              onNextClick={handleNextButtonClick}
              onPreviousClick={handlePreviousButtonClick}
              previousButtonDisabled={index === 0}
              nextButtonDisabled={index >= products?.length + chunkOfData}
            />
          </div>

          <ul className="special-for-you__list">
            <li className="special-for-you__item">
              <div className="thumbnail-preview">
                <div className="thumbnail-preview__image">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="img/content/thumbnails/preview-03.webp, img/content/thumbnails/preview-03@2x.webp 2x"
                    />
                    <img
                      src="img/content/thumbnails/preview-03.jpg"
                      srcSet="img/content/thumbnails/preview-03@2x.jpg 2x"
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
            </li>
            <li className="special-for-you__item">
              <div className="thumbnail-preview">
                <div className="thumbnail-preview__image">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="img/content/thumbnails/preview-02.webp, img/content/thumbnails/preview-02@2x.webp 2x"
                    />
                    <img
                      src="img/content/thumbnails/preview-02.jpg"
                      srcSet="img/content/thumbnails/preview-02@2x.jpg 2x"
                      width="452"
                      height="191"
                      alt=""
                    />
                  </picture>
                </div>
                <div className="thumbnail-preview__inner">
                  <h3 className="thumbnail-preview__title">power</h3>
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
            </li>
            <li className="special-for-you__item">
              <div className="thumbnail-preview">
                <div className="thumbnail-preview__image">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="img/content/thumbnails/preview-01.webp, img/content/thumbnails/preview-01@2x.webp 2x"
                    />
                    <img
                      src="img/content/thumbnails/preview-01.jpg"
                      srcSet="img/content/thumbnails/preview-01@2x.jpg 2x"
                      width="452"
                      height="191"
                      alt=""
                    />
                  </picture>
                </div>
                <div className="thumbnail-preview__inner">
                  <h3 className="thumbnail-preview__title">boxing</h3>
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
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export { Compilation }

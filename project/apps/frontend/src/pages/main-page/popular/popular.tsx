import {
  CollectionPopularControl,
  ThumbnailTraining,
} from '../../../components';
import { AppRoute } from '../../../common';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import { selectIsEmptyProducts, selectProducts } from '../../../store';
import { useEffect, useState } from 'react';

const AMOUNT_OF_THUMBNAIL_TRAINING = 4;

function Popular(): JSX.Element {
  const products = useAppSelector(selectProducts);
  const isEmptyProducts = useAppSelector(selectIsEmptyProducts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productsToRender, setProductsToRender] = useState(
    products.slice(currentIndex, products.length)
  );

  useEffect(() => {
    setProductsToRender(products.slice(currentIndex, products.length));
  }, [currentIndex, products]);

  const handlePreviousButtonClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextButtonClick = () => {
    if (currentIndex <= products.length - AMOUNT_OF_THUMBNAIL_TRAINING) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <Link
              className="btn-flat popular-trainings__button"
              to={AppRoute.Catalog}
            >
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </Link>

            <CollectionPopularControl
              onNextClick={handleNextButtonClick}
              onPreviousClick={handlePreviousButtonClick}
              previousButtonDisabled={currentIndex === 0}
              nextButtonDisabled={
                currentIndex + AMOUNT_OF_THUMBNAIL_TRAINING > products.length
              }
            />
          </div>

          <ul className="popular-trainings__list">
            {!isEmptyProducts &&
              Array.from({ length: AMOUNT_OF_THUMBNAIL_TRAINING }).map(
                (_, index) =>
                  productsToRender[index] && (
                    <li key={index} className="popular-trainings__item">
                      <ThumbnailTraining product={productsToRender[index]} />
                    </li>
                  )
              )}
          </ul>
        </div>
      </div>
    </section>
  );
}

export { Popular };

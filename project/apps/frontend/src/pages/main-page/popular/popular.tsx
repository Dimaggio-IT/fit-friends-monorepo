import {
  CollectionPopularControl,
  ThumbnailTraining,
} from '../../../components';
import { AppRoute } from '../../../common';
import { Link } from 'react-router-dom';
import { WrapperForWrappedProps, WrapperProps } from '../../../hof/index';

function Popular({
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
              previousButtonDisabled={index === 0}
              nextButtonDisabled={index >= products?.length + chunkOfData}
            />
          </div>

          <ul className="popular-trainings__list">
            {!isEmptyProducts &&
              Array.from({ length: chunkOfData }).map(
                (_, index) =>
                  products[index] && (
                    <li key={index} className="popular-trainings__item">
                      <ThumbnailTraining product={products[index]} />
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

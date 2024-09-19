import {
  CollectionPopularControl,
  ThumbnailTraining,
} from '../../../components';
import { AppRoute } from '../../../common';
import { Link } from 'react-router-dom';
import {
  WrapperForWrappedProps,
  CustomComponentProps,
} from '../../../hof/index';

function Popular({
  index,
  chunkOfData,
  isEmptyProducts,
  amountOfProducts,
  products,
  onIndexNextChange,
  onIndexPreviousChange,
}: CustomComponentProps & WrapperForWrappedProps): JSX.Element {
  const handlePreviousButtonClick = () => {
    onIndexPreviousChange();
  };

  const handleNextButtonClick = () => {
    onIndexNextChange();
  };

  const isNextBtnDisabled = index + chunkOfData >= amountOfProducts;
  const isPreviousBtnDisabled = index <= 0;
  const isControlButtonsAvailable = !(
    isNextBtnDisabled && isPreviousBtnDisabled
  );

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
            {isControlButtonsAvailable && (
              <CollectionPopularControl
                onNextClick={handleNextButtonClick}
                onPreviousClick={handlePreviousButtonClick}
                previousButtonDisabled={isPreviousBtnDisabled}
                nextButtonDisabled={isNextBtnDisabled}
              />
            )}
          </div>
          <ul className="popular-trainings__list">
            {!isEmptyProducts &&
              Array.from({ length: chunkOfData }).map(
                (_, ind) =>
                  products[ind] && (
                    <li key={ind} className="popular-trainings__item">
                      <ThumbnailTraining product={products[ind]} />
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

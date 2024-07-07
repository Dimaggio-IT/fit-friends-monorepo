import { ThumbnailTraining } from '../../../components';
import { AppRoute } from '../../../common';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import { selectIsEmptyProducts, selectProducts } from '../../../store';

const AMOUNT_OF_TRAINING = 4;

function Popular(): JSX.Element {
  const productsToRender = useAppSelector(selectProducts);
  const isEmptyProducts = useAppSelector(selectIsEmptyProducts);

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
            <div className="popular-trainings__controls">
              <button
                className="btn-icon popular-trainings__control"
                type="button"
                aria-label="previous"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button
                className="btn-icon popular-trainings__control"
                type="button"
                aria-label="next"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="popular-trainings__list">
            {!isEmptyProducts &&
              Array.from({ length: AMOUNT_OF_TRAINING }).map(
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

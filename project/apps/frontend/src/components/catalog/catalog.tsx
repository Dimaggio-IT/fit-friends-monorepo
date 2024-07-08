import { useAppSelector } from '../../hooks';
import { selectIsEmptyProducts, selectProducts } from '../../store';
import { ThumbnailTraining } from '../../components';

const AMOUNT_OF_THUMBNAIL_TRAINING = 12;

function Catalog(): JSX.Element {
  const productsToRender = useAppSelector(selectProducts);
  const isEmptyProducts = useAppSelector(selectIsEmptyProducts);

  return (
    <div className="training-catalog">
      <ul className="training-catalog__list">
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
      <div className="show-more training-catalog__show-more">
        <button
          className="btn show-more__button show-more__button--more"
          type="button"
        >
          Показать еще
        </button>
        <button
          className="btn show-more__button show-more__button--to-top"
          type="button"
        >
          Вернуться в начало
        </button>
      </div>
    </div>
  );
}

export { Catalog }

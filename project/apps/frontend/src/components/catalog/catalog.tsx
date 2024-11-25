import { useAppSelector } from '../../hooks';
import {
  selectCountAllProducts,
  selectIsEmptyProducts,
  selectProducts,
} from '../../store';
import { ThumbnailProduct } from '../../components';
import { useState } from 'react';

const AMOUNT_TRAINING_PER_PAGE = 12;

function Catalog(): JSX.Element | null {
  const productsToRender = useAppSelector(selectProducts);
  const isEmptyProducts = useAppSelector(selectIsEmptyProducts);
  const totalProducts = useAppSelector(selectCountAllProducts);
  const totalPage = Math.ceil(totalProducts / AMOUNT_TRAINING_PER_PAGE);
  const [query, setQuery] = useState({
    limit: AMOUNT_TRAINING_PER_PAGE,
    page: 1,
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (isEmptyProducts) {
    return null;
  }

  return (
    <div className="training-catalog">
      <ul className="training-catalog__list">
        {!isEmptyProducts &&
          Array.from({ length: AMOUNT_TRAINING_PER_PAGE }).map(
            (_, index) =>
              productsToRender[index] && (
                <li
                  key={productsToRender[index].id}
                  className="popular-trainings__item"
                >
                  <ThumbnailProduct product={productsToRender[index]} />
                </li>
              )
          )}
      </ul>
      <div className="show-more training-catalog__show-more">
        {totalPage !== query.page && (
          <button
            className="btn show-more__button show-more__button--more"
            type="button"
            onClick={() =>
              setQuery({ ...query, page: query.page ? query.page + 1 : 1 })
            }
          >
            Показать еще
          </button>
        )}
        {totalPage === query.page && totalPage !== 1 && (
          <button
            className="btn show-more__button"
            type="button"
            onClick={scrollToTop}
          >
            Вернуться в начало
          </button>
        )}
      </div>
    </div>
  );
}

export { Catalog };

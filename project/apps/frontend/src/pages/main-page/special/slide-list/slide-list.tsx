import { IProductRdo } from '@project/common';
import { Slide } from '../slide/slide';
import cn from 'classnames';
import { Dongle } from '../../../../components';

const SLIDE_COUNT_DEFAULT = 3;

type TSlideListProps = { products: IProductRdo[] };

function SlideList({ products }: TSlideListProps): JSX.Element {
  return products.length > 0 ? (
    <>
      <h2 className="visually-hidden">Специальные предложения</h2>
      <ul className="special-offers__list">
        {Array.from({ length: SLIDE_COUNT_DEFAULT }).map(
          (_, index) =>
            products[index] && (
              <li
                className={cn('special-offers__item', {
                  'is-active': index === 1,
                })}
              >
                <Slide product={products[index]} isActive={index === 1} />
              </li>
            )
        )}
      </ul>
    </>
  ) : (
    <Dongle />
  );
}

export { SlideList };

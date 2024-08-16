import { IProductRdo } from '@project/common';
import cn from 'classnames';

type TSlideProps = {
  product: IProductRdo;
  isActive: boolean;
  onGoToSlide: (number: number) => void;
};

function Slide({ product, isActive, onGoToSlide }: TSlideProps): JSX.Element {
  console.log(isActive);
  return (
    <aside className="promo-slider">
      <div className="promo-slider__overlay"></div>
      <div className="promo-slider__image">
        <img
          src="img/content/promo-1.png"
          srcSet="img/content/promo-1@2x.png 2x"
          width="1040"
          height="469"
          alt="slide1"
        />
      </div>
      <div className="promo-slider__header">
        <h3 className="promo-slider__title">{product.name}</h3>
        <div className="promo-slider__logo">
          <svg width="74" height="74" aria-hidden="true">
            <use xlinkHref="#logotype"></use>
          </svg>
        </div>
      </div>
      <span className="promo-slider__text">{product.description}</span>
      <div className="promo-slider__bottom-container">
        <div className="promo-slider__slider-dots">
          <button
            className={cn('promo-slider__slider-dot', {
              'promo-slider__slider-dot--active': isActive === true,
            })}
            aria-label="первый слайд"
            onClick={() => onGoToSlide(0)}
          ></button>
          <button
            className={cn('promo-slider__slider-dot', {
              'promo-slider__slider-dot--active': isActive === true,
            })}
            aria-label="второй слайд"
            onClick={() => onGoToSlide(1)}
          ></button>
          <button
            className={cn('promo-slider__slider-dot', {
              'promo-slider__slider-dot--active': isActive === true,
            })}
            aria-label="третий слайд"
            onClick={() => onGoToSlide(2)}
          ></button>
        </div>
        <div className="promo-slider__price-container">
          <p className="promo-slider__price">{product.price} ₽</p>
          <p className="promo-slider__sup">за занятие</p>
          <p className="promo-slider__old-price">{product.price} ₽</p>
        </div>
      </div>
    </aside>
  );
}

export { Slide };

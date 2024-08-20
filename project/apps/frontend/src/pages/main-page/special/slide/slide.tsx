import { IProductRdo } from '@project/common';
import { Dot } from './dot';
import { SlideImage } from './image';

type TSlideProps = {
  product: IProductRdo;
  slide: number;
  onGoToSlide: (number: number) => void;
};

const COUNT_DOTS_DEFAULT = 3;

function Slide({ product, slide, onGoToSlide }: TSlideProps): JSX.Element {
  return (
    <aside className="promo-slider">
      <div className="promo-slider__overlay"></div>
      <div className="promo-slider__image">
        <SlideImage slide={slide} />
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
          {Array.from({ length: COUNT_DOTS_DEFAULT }).map((_, index) => (
            <Dot
              onGoToSlide={onGoToSlide}
              slide={index}
              isActive={slide === index}
            />
          ))}
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

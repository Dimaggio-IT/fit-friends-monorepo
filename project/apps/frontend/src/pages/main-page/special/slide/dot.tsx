import cn from 'classnames';

type TDotProps = {
  onGoToSlide: (number: number) => void;
  isActive: boolean;
  slide: number;
};

function Dot({ onGoToSlide, isActive, slide }: TDotProps): JSX.Element {
  return (
    <button
      className={cn('promo-slider__slider-dot', {
        'promo-slider__slider-dot--active': isActive === true,
      })}
      aria-label={`${slide} слайд`}
      onClick={() => onGoToSlide(slide)}
    ></button>
  );
}

export { Dot };

import { IProductRdo } from '@project/common';
import { useCallback, useEffect, useState } from 'react';
import { Slide } from '../slide/slide';
import cn from 'classnames';

const AUTO_PLAY_TIME_DEFAULT = 5000;
const AUTO_PLAY_DEFAULT = true;

type TSliderProps = {
  autoPlay?: boolean;
  autoPlayTime?: number;
  items: IProductRdo[];
};

function Slider({
  autoPlay = AUTO_PLAY_DEFAULT,
  autoPlayTime = AUTO_PLAY_TIME_DEFAULT,
  items,
}: TSliderProps): JSX.Element {
  const [slide, setSlide] = useState(0);

  const changeSlide = useCallback(
    (direction = 1) => {
      let slideNumber = 0;

      if (slide + direction < 0) {
        slideNumber = items.length - 1;
      } else {
        slideNumber = (slide + direction) % items.length;
      }

      setSlide(slideNumber);
    },
    [items.length, slide]
  );

  const goToSlide = (number: number) => {
    setSlide(number % items.length);
  };

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      changeSlide(1);
    }, autoPlayTime);

    return () => {
      clearInterval(interval);
    };
  }, [items.length, slide, autoPlay, autoPlayTime, changeSlide]);

  return (
    <ul className="special-offers__list">
      {Array.from({ length: items.length }).map(
        (_, index) =>
          items[index] && (
            <li
              className={cn('special-offers__item', {
                'is-active': index === slide,
              })}
            >
              <Slide
                product={items[index]}
                slide={index}
                onGoToSlide={goToSlide}
              />
            </li>
          )
      )}
    </ul>
  );
}

export { Slider };

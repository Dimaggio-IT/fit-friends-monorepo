import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks';
import cn from 'classnames';
import { selectProducts } from '../../../store';
import { Slide } from './slide/slide';
import { Dongle } from '../../../components';

const AUTO_PLAY_TIME_DEFAULT = 5000;

type TSliderProps = {
  autoPlay: boolean;
  autoPlayTime: number;
};

function Special({
  autoPlay = false,
  autoPlayTime = AUTO_PLAY_TIME_DEFAULT,
}: TSliderProps): JSX.Element {
  const [slide, setSlide] = useState(0);

  const SLIDE_COUNT_DEFAULT = 3;
  const data = useAppSelector(selectProducts);

  const changeSlide = useCallback(
    (direction = 1) => {
      let slideNumber = 0;

      if (slide + direction < 0) {
        slideNumber = data.length - 1;
      } else {
        slideNumber = (slide + direction) % data.length;
      }

      setSlide(slideNumber);
    },
    [data.length, slide]
  );

  const goToSlide = (number: number) => {
    setSlide(number % data.length);
  };

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      changeSlide(1);
    }, autoPlayTime);

    return () => {
      clearInterval(interval);
    };
  }, [data.length, slide, autoPlay, autoPlayTime, changeSlide]);

  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          {data.length > 0 ? (
            <>
              <h2 className="visually-hidden">Специальные предложения</h2>
              <ul className="special-offers__list">
                {Array.from({ length: SLIDE_COUNT_DEFAULT }).map(
                  (_, index) =>
                    data[index] && (
                      <li
                        className={cn('special-offers__item', {
                          'is-active': index === slide,
                        })}
                      >
                        <Slide
                          product={data[index]}
                          isActive={index === slide}
                          onGoToSlide={goToSlide}
                        />
                      </li>
                    )
                )}
              </ul>
            </>
          ) : (
            <Dongle />
          )}
        </div>
      </div>
    </section>
  );
}

export { Special };

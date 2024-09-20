import { useAppSelector } from '../../../hooks';
import { selectProducts } from '../../../store';
import { Dongle } from '../../../components';
import { Slider } from './slider/slider';

const SLIDE_COUNT_DEFAULT = 3;

function Special(): JSX.Element {
  const data = useAppSelector(selectProducts).slice(0, SLIDE_COUNT_DEFAULT);
  const isEmptyProducts = data.length === 0;

  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          {!isEmptyProducts ? (
            <>
              <h2 className="visually-hidden">Специальные предложения</h2>
              <Slider items={data} />
            </>
          ) : (
            <div className="special-for-you__wrapper">
              <div className="special-for-you__title-wrapper">
                <h2 className="special-for-you__title">Скидки</h2>
              </div>
              <Dongle />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export { Special };

import { useAppSelector } from '../../../hooks';
import { selectProducts } from '../../../store';
import { Dongle } from '../../../components';
import { Slider } from './slider/slider';

const SLIDE_COUNT_DEFAULT = 3;

function Special(): JSX.Element {
  const data = useAppSelector(selectProducts).slice(0, SLIDE_COUNT_DEFAULT);

  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          {data.length > 0 ? (
            <>
              <h2 className="visually-hidden">Специальные предложения</h2>
              <Slider items={data} />
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

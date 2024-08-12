import { useAppSelector } from '../../../hooks';
import { selectProducts } from '../../../store';
import { SlideList } from './slide-list/slide-list';

function Special(): JSX.Element {
  const data = useAppSelector(selectProducts);

  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <SlideList products={data} />
        </div>
      </div>
    </section>
  );
}

export { Special };

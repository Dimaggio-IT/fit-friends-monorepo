import {
  CollectionCompilationControl,
} from '../../../components';
import { WrapperForWrappedProps, WrapperProps } from '../../../hof';
import { ThumbnailPreview } from '../../../components';

function Compilation({
  index,
  chunkOfData,
  isEmptyProducts,
  products,
  onIndexNextChange,
  onIndexPreviousChange,
}: WrapperProps & WrapperForWrappedProps): JSX.Element {
  const handlePreviousButtonClick = () => {
    onIndexPreviousChange();
  };

  const handleNextButtonClick = () => {
    onIndexNextChange();
  };
  return (
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">
              Специально подобрано для вас
            </h2>

            <CollectionCompilationControl
              onNextClick={handleNextButtonClick}
              onPreviousClick={handlePreviousButtonClick}
              previousButtonDisabled={index === 0}
              nextButtonDisabled={index >= products?.length + chunkOfData}
            />
          </div>

          <ul className="special-for-you__list">
            {!isEmptyProducts &&
              Array.from({ length: chunkOfData }).map(
                (_, index) =>
                  products[index] && <li className="special-for-you__item">
                    <ThumbnailPreview product={products[index]} />
                  </li>
              )}
          </ul>
        </div>
      </div>
    </section>
  );
}

export { Compilation }

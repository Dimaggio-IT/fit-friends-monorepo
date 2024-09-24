import { CollectionCompilationControl } from '../../../components';
import { WrapperForWrappedProps, CustomComponentProps } from '../../../hof';
import { ThumbnailPreview } from '../../../components';

function Compilation({
  index,
  chunkOfData,
  isEmptyProducts,
  amountOfProducts,
  products,
  onIndexNextChange,
  onIndexPreviousChange,
}: CustomComponentProps & WrapperForWrappedProps): JSX.Element {
  const handlePreviousButtonClick = () => {
    onIndexPreviousChange();
  };

  const handleNextButtonClick = () => {
    onIndexNextChange();
  };

  const isNextBtnDisabled = index + chunkOfData >= amountOfProducts;
  const isPreviousBtnDisabled = index <= 0;

  return (
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">
              Специально подобрано для вас
            </h2>
            {!isEmptyProducts && (
              <CollectionCompilationControl
                onNextClick={handleNextButtonClick}
                onPreviousClick={handlePreviousButtonClick}
                previousButtonDisabled={isPreviousBtnDisabled}
                nextButtonDisabled={isNextBtnDisabled}
              />
            )}
          </div>
          {!isEmptyProducts && (
            <ul className="special-for-you__list">
              {Array.from({ length: chunkOfData }).map(
                (_, index) =>
                  products[index] && (
                    <li className="special-for-you__item">
                      <ThumbnailPreview product={products[index]} />
                    </li>
                  )
              )}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export { Compilation };

import { CollectionControl } from './collection-control';

type TCollectionCompilationControlProps = {
  onNextClick: () => void;
  onPreviousClick: () => void;
  previousButtonDisabled: boolean;
  nextButtonDisabled: boolean;
};

function CollectionCompilationControl({
  onNextClick,
  onPreviousClick,
  previousButtonDisabled = false,
  nextButtonDisabled = false,
}: TCollectionCompilationControlProps): JSX.Element {
  return (
    <CollectionControl
      className="special-for-you__controls"
      classNamePrevious="btn-icon special-for-you__control"
      classNameNext="btn-icon special-for-you__control"
      onNextClick={onNextClick}
      onPreviousClick={onPreviousClick}
      previousButtonDisabled={previousButtonDisabled}
      nextButtonDisabled={nextButtonDisabled}
    />
  );
}

export { CollectionCompilationControl };

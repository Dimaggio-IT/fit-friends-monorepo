import { CollectionControl } from './collection-control';
import { TCollectionControlProps } from './collection-control.type';

function CollectionSupporterControl({
  onNextClick,
  onPreviousClick,
  previousButtonDisabled = false,
  nextButtonDisabled = false,
}: TCollectionControlProps): JSX.Element {
  return (
    <CollectionControl
      className="look-for-company__controls"
      classNamePrevious="btn-icon btn-icon--outlined look-for-company__control"
      classNameNext="btn-icon btn-icon--outlined look-for-company__control"
      onNextClick={onNextClick}
      onPreviousClick={onPreviousClick}
      previousButtonDisabled={previousButtonDisabled}
      nextButtonDisabled={nextButtonDisabled}
    />
  );
}

export { CollectionSupporterControl };

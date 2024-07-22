import { CollectionControl } from './collection-control';

type TCollectionPopularControlProps = {
  onNextClick: () => void;
  onPreviousClick: () => void;
  previousButtonDisabled: boolean;
  nextButtonDisabled: boolean;
};

function CollectionPopularControl({
  onNextClick,
  onPreviousClick,
  previousButtonDisabled = false,
  nextButtonDisabled = false,
}: TCollectionPopularControlProps): JSX.Element {
  console.log({ previousButtonDisabled, nextButtonDisabled });
  return (
    <CollectionControl
      className="popular-trainings__controls"
      classNamePrevious="btn-icon popular-trainings__control"
      classNameNext="btn-icon popular-trainings__control"
      onNextClick={onNextClick}
      onPreviousClick={onPreviousClick}
      previousButtonDisabled={previousButtonDisabled}
      nextButtonDisabled={nextButtonDisabled}
    />
  );
}

export { CollectionPopularControl };

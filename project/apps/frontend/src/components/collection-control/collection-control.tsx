/* eslint-disable @typescript-eslint/no-empty-function */
type TCollectionControlProps = {
  className: string;
  classNamePrevious: string;
  classNameNext: string;
  onNextClick: () => void;
  onPreviousClick: () => void;
  previousButtonDisabled: boolean;
  nextButtonDisabled: boolean;
};

function CollectionControl({
  className,
  classNamePrevious,
  classNameNext,
  onNextClick = () => {},
  onPreviousClick = () => {},
  previousButtonDisabled = false,
  nextButtonDisabled = false,
}: TCollectionControlProps): JSX.Element {
  return (
    <div className={`${className}`}>
      <button
        className={`${classNamePrevious}`}
        type="button"
        aria-label="previous"
        onClick={onPreviousClick}
        disabled={previousButtonDisabled}
      >
        <svg width="16" height="14" aria-hidden="true">
          <use xlinkHref="#arrow-left"></use>
        </svg>
      </button>
      <button
      className={`${classNameNext}`}
      type="button"
      aria-label="next"
      onClick={onNextClick}
      disabled={nextButtonDisabled}
      >
        <svg width="16" height="14" aria-hidden="true">
          <use xlinkHref="#arrow-right"></use>
        </svg>
      </button>
    </div>
  );
}

export { CollectionControl };

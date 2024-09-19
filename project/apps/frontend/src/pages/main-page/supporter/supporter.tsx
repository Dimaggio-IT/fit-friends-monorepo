import { CustomSliceUsersProps, WrapperSliceUsersProps } from '../../../hof';
import { AppRoute } from '../../../common';
import { Link } from 'react-router-dom';
import {
  CollectionSupporterControl,
  Dongle,
  ThumbnailUser,
} from '../../../components';

function Supporter({
  index,
  chunkOfData,
  isEmptyUsers,
  amountOfUsers,
  users,
  onIndexNextChange,
  onIndexPreviousChange,
}: CustomSliceUsersProps & WrapperSliceUsersProps): JSX.Element {
  const handlePreviousButtonClick = () => {
    onIndexPreviousChange();
  };

  const handleNextButtonClick = () => {
    onIndexNextChange();
  };

  const isNextBtnDisabled = index + chunkOfData >= amountOfUsers;
  const isPreviousBtnDisabled = index <= 0;
  const isControlButtonsAvailable = !(
    isNextBtnDisabled && isPreviousBtnDisabled
  );

  return (
    <section className="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">
              Ищут компанию для тренировки
            </h2>
            {!isEmptyUsers && (
              <>
                <Link to={AppRoute.Supporter}>
                  <button
                    className="btn-flat btn-flat--light look-for-company__button"
                    type="button"
                  >
                    <span>Смотреть все</span>
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-right"></use>
                    </svg>
                  </button>
                </Link>
                {isControlButtonsAvailable && (
                  <CollectionSupporterControl
                    onNextClick={handleNextButtonClick}
                    onPreviousClick={handlePreviousButtonClick}
                    previousButtonDisabled={isPreviousBtnDisabled}
                    nextButtonDisabled={isNextBtnDisabled}
                  />
                )}
              </>
            )}
          </div>
          <ul className="look-for-company__list">
            {!isEmptyUsers &&
              Array.from({ length: chunkOfData }).map(
                (_, ind) =>
                  users[ind] && (
                    <li key={ind} className="look-for-company__item">
                      <ThumbnailUser user={users[ind]} />
                    </li>
                  )
              )}
            {isEmptyUsers && <Dongle />}
          </ul>
        </div>
      </div>
    </section>
  );
}

export { Supporter };

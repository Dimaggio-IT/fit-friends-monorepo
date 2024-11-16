import { useAppDispatch } from '../../../hooks';
import {
  fillPropertyValues,
  TUpdatingUserInfo,
  TUserWorkOutTypeValue,
  UserConstraints,
  USERS_LEVEL,
  USERS_LOCATION,
  USERS_SEX,
  WORKOUT_TYPES,
} from '../../../common';
import { useEffect, useRef, useState } from 'react';
import { patchAsyncUser } from '../../../store';

type UserInfoProps = {
  user: TUpdatingUserInfo;
};

const USER_INFO_DROPDOWN_STATE_DEFAULT = {
  location: false,
  sex: false,
  level: false,
};

const USER_INFO_LIST_VALUE_DEFAULT = {
  location: 'Пионерская',
  sex: 'неважно',
  level: 'новичок',
};

const USER_DATA_DEFAULT = {
  login: 'noname',
  description: 'void',
  location: USER_INFO_LIST_VALUE_DEFAULT.location,
  sex: USER_INFO_LIST_VALUE_DEFAULT.sex,
  level: USER_INFO_LIST_VALUE_DEFAULT.level,
  isPersonalTraining: false,
  isReadyToTrain: false,
};

const UserInfo = ({ user }: UserInfoProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const [isFormEditMode, setIsFormEditMode] = useState<boolean>(false);

  const [isOpenList, setIsOpenList] = useState(
    USER_INFO_DROPDOWN_STATE_DEFAULT
  );

  const [trainingTypes, setTrainingTypes] = useState(user.trainingType ?? []);

  const [isWrongTypeOfTraining, setIsWrongTypeOfTraining] = useState<boolean>(
    !(
      trainingTypes.length >= UserConstraints.TrainingType.MIN &&
      trainingTypes.length <= UserConstraints.TrainingType.MAX
    )
  );

  const [userData, setUserData] = useState(
    fillPropertyValues(USER_DATA_DEFAULT, user as Record<string, any>)
  );

  const [isWrongDescription, setIsWrongDescription] = useState<boolean>(false);

  const [avatar, setAvatar] = useState<File | undefined>();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleEditButtonClick = () => {
    setIsFormEditMode((prevIsEditForm) => !prevIsEditForm);
  };

  const handleListClick = (listName: string) => {
    if (listName === 'location' || listName === 'sex' || listName === 'level') {
      setIsOpenList({ ...isOpenList, [listName]: !isOpenList[listName] });
    }
  };

  const handleTypeOfTrainingChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked: isChecked, value } = evt.target;

    const checkedTypes = isChecked
      ? [...trainingTypes, value as TUserWorkOutTypeValue]
      : trainingTypes.filter((el) => el !== value);

    setTrainingTypes(checkedTypes);

    isChecked
      ? evt.target.setAttribute('checked', 'true')
      : evt.target.removeAttribute('checked');

    checkedTypes.length < UserConstraints.TrainingType.MIN ||
    checkedTypes.length > UserConstraints.TrainingType.MAX
      ? setIsWrongTypeOfTraining(true)
      : setIsWrongTypeOfTraining(false);
  };

  const changeUserData = (name: string, value: string) => {
    if (name === 'isPersonalTraining') {
      const newIsPersonalTraining = !userData.isPersonalTraining;
      setUserData({
        ...userData,
        isPersonalTraining: newIsPersonalTraining,
      });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleUserDataChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;

    changeUserData(name, value);
  };

  const handleAvatarUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }

    setAvatar(evt.target.files[0]);
  };

  const handleAvatarDelete = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setAvatar(undefined);
    }
  };

  const handleListItemClick = (
    evt: React.MouseEvent<HTMLLIElement>,
    listName: string
  ) => {
    setIsOpenList({ ...isOpenList, [listName]: false });
    changeUserData(listName, evt.currentTarget.innerText);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      login: userData.login,
      description: userData.description,
      isPersonalTraining: userData.isPersonalTraining,
      isReadyToTrain: userData.isPersonalTraining,
      avatarFile: avatar,
      level: userData.level,
      sex: userData.sex,
      trainingType: trainingTypes,
      location: userData.location,
    };

    if (!isWrongTypeOfTraining) {
      dispatch(patchAsyncUser(data));
      setIsFormEditMode(false);
    }
  };

  useEffect(() => {
    if (
      userData.description &&
      (userData.description.length < UserConstraints.Description.MIN ||
        userData.description.length > UserConstraints.Description.MAX)
    ) {
      setIsWrongDescription(true);
    } else {
      setIsWrongDescription(false);
    }
  }, [userData]);

  useEffect(() => {
    setUserData(
      fillPropertyValues(USER_DATA_DEFAULT, user as Record<string, any>)
    );
  }, [user]);

  return (
    <section className="user-info-edit">
      <div className="user-info-edit__header">
        <div className="input-load-avatar">
          <label>
            <input
              className="visually-hidden"
              type="file"
              id="userAvatar"
              name="userAvatar"
              accept="image/png, image/jpeg"
              ref={inputRef}
              onChange={handleAvatarUpload}
              disabled={!isFormEditMode}
            />
            <span className="input-load-avatar__avatar">
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  width={98}
                  height={98}
                  alt="user's avatar"
                />
              ) : (
                <img
                  src={user.avatar}
                  width={98}
                  height={98}
                  alt="user's avatar"
                />
              )}
            </span>
          </label>
        </div>
        {isFormEditMode && (
          <div className="user-info-edit__controls">
            <label
              className="user-info-edit__control-btn"
              aria-label="обновить"
              htmlFor="userAvatar"
            >
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-change"></use>
              </svg>
            </label>
            <button
              className="user-info-edit__control-btn"
              aria-label="удалить"
              onClick={handleAvatarDelete}
            >
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-trash"></use>
              </svg>
            </button>
          </div>
        )}
      </div>
      <form
        className="user-info-edit__form"
        action="#"
        method="post"
        onSubmit={handleFormSubmit}
      >
        {isFormEditMode && (
          <button
            className="btn-flat btn-flat--underlined user-info-edit__save-button"
            type="submit"
            aria-label="Сохранить"
          >
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg>
            <span>Сохранить</span>
          </button>
        )}
        {!isFormEditMode && (
          <button
            className="btn-flat btn-flat--underlined user-info__edit-button"
            type="button"
            aria-label="Редактировать"
            onClick={handleEditButtonClick}
          >
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg>
            <span>Редактировать</span>
          </button>
        )}
        <div className={`user-info${isFormEditMode ? '-edit' : ''}__section`}>
          <h2 className={`user-info${isFormEditMode ? '-edit' : ''}__title`}>
            Обо мне
          </h2>
          <div
            className={`custom-input ${
              isFormEditMode ? '' : 'custom-input--readonly'
            } user-info${isFormEditMode ? '-edit' : ''}__input`}
          >
            <label>
              <span className="custom-input__label">Имя</span>
              <span className="custom-input__wrapper">
                <input
                  type="text"
                  disabled={!isFormEditMode}
                  name="login"
                  minLength={UserConstraints.Login.MIN}
                  maxLength={UserConstraints.Login.MAX}
                  pattern="^[A-Za-zА-Яа-яЁё\s]+$"
                  title="Только буквы русского/английского алфавита"
                  value={userData.login}
                  onChange={handleUserDataChange}
                  data-login="login"
                />
              </span>
            </label>
          </div>
          <div
            className={`custom-textarea ${
              isFormEditMode ? '' : 'custom-textarea--readonly'
            } user-info${isFormEditMode ? '-edit' : ''}__textarea`}
          >
            <label>
              <span className="custom-textarea__label ">Описание</span>
              <span className="custom-input--error">
                <textarea
                  name="description"
                  disabled={!isFormEditMode}
                  onChange={handleUserDataChange}
                  value={userData.description}
                  data-testid="description"
                ></textarea>
                {isWrongDescription && (
                  <span className="custom-textarea__error">
                    {`Минимальная длина ${UserConstraints.Description.MIN}
                    символ. Максимальная длина ${UserConstraints.Description.MAX} символов`}
                  </span>
                )}
              </span>
            </label>
          </div>
        </div>
        <div
          className={`user-info${
            isFormEditMode ? '-edit' : ''
          }__section user-info${
            isFormEditMode ? '-edit' : ''
          }__section--status`}
        >
          <h2
            className={`user-info${
              isFormEditMode ? '-edit' : ''
            }__title user-info${isFormEditMode ? '-edit' : ''}__title--status`}
          >
            Статус
          </h2>
          <div
            className={`custom-toggle custom-toggle--switch user-info${
              isFormEditMode ? '-edit' : ''
            }__toggle`}
          >
            <label>
              <input
                type="checkbox"
                name="isPersonalTraining"
                checked={userData.isPersonalTraining}
                onChange={handleUserDataChange}
                disabled={!isFormEditMode}
              />
              <span className="custom-toggle__icon">
                <svg width="9" height="6" aria-hidden="true">
                  <use xlinkHref="#arrow-check"></use>
                </svg>
              </span>
              <span className="custom-toggle__label">Готов тренировать</span>
            </label>
          </div>
        </div>
        <div
          className={`user-info${isFormEditMode ? '-edit' : ''}__section ${
            isWrongTypeOfTraining ? 'custom-input--error' : ''
          }`}
        >
          <h2
            className={`user-info${
              isFormEditMode ? '-edit' : ''
            }__title user-info${
              isFormEditMode ? '-edit' : ''
            }__title--specialization`}
          >
            Специализация
          </h2>
          <div
            className={`specialization-checkbox user-info${
              isFormEditMode ? '-edit' : ''
            }__specialization`}
          >
            {WORKOUT_TYPES.map((el) => (
              <div className="btn-checkbox" key={el}>
                <label>
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    name="specialization"
                    value={el}
                    id={el}
                    checked={
                      trainingTypes !== undefined &&
                      !!trainingTypes.find((item) => el === item)
                    }
                    onChange={handleTypeOfTrainingChange}
                    disabled={!isFormEditMode}
                  />
                  <span className="btn-checkbox__btn">{el}</span>
                </label>
              </div>
            ))}
          </div>
          {isWrongTypeOfTraining && isFormEditMode && (
            <span className="custom-input__error">
              {`Необходимо выбрать от ${UserConstraints.TrainingType.MIN} до ${UserConstraints.TrainingType.MAX} значений`}
            </span>
          )}
        </div>
        <div
          className={`${
            isFormEditMode ? '' : 'custom-select--readonly'
          } custom-select ${
            isOpenList.location ? 'is-open' : 'custom-select--not-selected'
          } user-info${isFormEditMode ? '-edit' : ''}__select`}
        >
          <span className="custom-select__label">Локация</span>
          <div className="custom-select__placeholder">
            ст. м. {userData.location}
          </div>
          <button
            className="custom-select__button"
            type="button"
            aria-label="Выберите одну из опций"
            onClick={() => handleListClick('location')}
            disabled={!isFormEditMode}
          >
            <span className="custom-select__text">{userData.location}</span>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg>
            </span>
          </button>
          <ul className="custom-select__list" role="listbox">
            {USERS_LOCATION.map((el) => (
              <li
                key={el}
                role="option"
                tabIndex={0}
                className="custom-select__item"
                aria-selected={userData.location === el}
                onClick={(evt) => handleListItemClick(evt, 'location')}
              >
                {el}
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`${
            isFormEditMode ? '' : 'custom-select--readonly'
          } custom-select ${
            isOpenList.sex ? 'is-open' : 'custom-select--not-selected'
          } user-info${isFormEditMode ? '-edit' : ''}__select`}
        >
          <span className="custom-select__label">Пол</span>
          <div className="custom-select__placeholder">{userData.sex}</div>
          <button
            className="custom-select__button"
            type="button"
            aria-label="Выберите одну из опций"
            onClick={() => handleListClick('sex')}
            disabled={!isFormEditMode}
          >
            <span className="custom-select__text">{userData.sex}</span>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg>
            </span>
          </button>
          <ul className="custom-select__list" role="listbox">
            {USERS_SEX.map((el) => (
              <li
                key={el}
                role="option"
                tabIndex={0}
                className="custom-select__item"
                aria-selected={userData.sex === el}
                onClick={(evt) => handleListItemClick(evt, 'sex')}
              >
                {el}
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`${
            isFormEditMode ? '' : 'custom-select--readonly'
          } custom-select  ${
            isOpenList.level ? 'is-open' : 'custom-select--not-selected'
          } user-info${isFormEditMode ? '-edit' : ''}__select`}
        >
          <span className="custom-select__label">Уровень</span>
          <div className="custom-select__placeholder">{userData.level}</div>
          <button
            className="custom-select__button"
            type="button"
            aria-label="Выберите одну из опций"
            onClick={() => handleListClick('level')}
            disabled={!isFormEditMode}
          >
            <span className="custom-select__text"></span>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg>
            </span>
          </button>
          <ul className="custom-select__list" role="listbox">
            {USERS_LEVEL.map((el) => (
              <li
                key={el}
                role="option"
                tabIndex={0}
                className="custom-select__item"
                aria-selected={userData.level === el}
                onClick={(evt) => handleListItemClick(evt, 'level')}
              >
                {el}
              </li>
            ))}
          </ul>
        </div>
      </form>
    </section>
  );
};

export { UserInfo };

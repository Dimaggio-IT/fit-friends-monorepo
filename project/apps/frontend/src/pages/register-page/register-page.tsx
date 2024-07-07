import { Helmet } from 'react-helmet-async';
import { Hidden } from '../../components/hidden/hidden';
import {
  TRegData,
  TUserLocation,
  TUserLocationValue,
  USER_LOCATION,
  validateRegForm,
} from '../../common';
import { ChangeEvent, FormEvent, useState } from 'react';
import cn from 'classnames';
import { useAppDispatch } from '../../hooks';
import { postAsyncReg } from '../../store';

function RegisterPage(): JSX.Element {
  const [isUserLocationOpened, setIsUserLocationOpened] = useState(false);

  const [isSubmitButtonOk, setIsSubmitButtonOk] = useState(false);

  const [formData, setFormData] = useState<TRegData>({
    email: '',
    login: '',
    password: '',
    location: null,
    sex: 'женский',
    birthday: '',
    role: 'coach',
  });

  const dispatch = useAppDispatch();

  const locationToRender = formData.location ? formData.location : '';

  function handleUserLocationKeydown(
    evt: React.KeyboardEvent<HTMLFormElement>
  ) {
    if (evt.key === 'Escape' && isUserLocationOpened) {
      evt.preventDefault();
      setIsUserLocationOpened(false);
    }
  }

  function handleUserLocationButtonClick() {
    setIsUserLocationOpened((prevValue: boolean) => !prevValue);
  }

  function handleUserLocationItemClick(item: TUserLocationValue) {
    setFormData({ ...formData, location: item });
    setIsUserLocationOpened(false);
  }

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
    if (validateRegForm({ ...formData, [name]: value })) {
      setIsSubmitButtonOk(true);
    } else {
      setIsSubmitButtonOk(false);
    }
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(
      postAsyncReg({
        email: formData.email,
        login: formData.login,
        password: formData.password,
        location: formData.location,
        sex: formData.sex,
        birthday: formData.birthday,
        role: formData.role,
      })
    );
  };

  return (
    <>
      <Hidden />
      <div className="wrapper">
        <Helmet>
          <title>Регистрация — FitFriends</title>
        </Helmet>
        <main>
          <div className="background-logo">
            <svg
              className="background-logo__logo"
              width="750"
              height="284"
              aria-hidden="true"
            >
              <use xlinkHref="#logo-big"></use>
            </svg>
            <svg
              className="background-logo__icon"
              width="343"
              height="343"
              aria-hidden="true"
            >
              <use xlinkHref="#icon-logotype"></use>
            </svg>
          </div>
          <div className="popup-form popup-form--sign-up">
            <div className="popup-form__wrapper">
              <div className="popup-form__content">
                <div className="popup-form__title-wrapper">
                  <h1 className="popup-form__title">Регистрация</h1>
                </div>
                <div className="popup-form__form">
                  <form
                    method="post"
                    onKeyDown={handleUserLocationKeydown}
                    onSubmit={handleFormSubmit}
                  >
                    <div className="sign-up">
                      <div className="sign-up__load-photo">
                        <div className="input-load-avatar">
                          <label>
                            <input
                              className="visually-hidden"
                              type="file"
                              accept="image/png, image/jpeg"
                            />
                            <span className="input-load-avatar__btn">
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import"></use>
                              </svg>
                            </span>
                          </label>
                        </div>
                        <div className="sign-up__description">
                          <h2 className="sign-up__legend">
                            Загрузите фото профиля
                          </h2>
                          <span className="sign-up__text">
                            JPG, PNG, оптимальный размер 100&times;100&nbsp;px
                          </span>
                        </div>
                      </div>
                      <div className="sign-up__data">
                        <div className="custom-input">
                          <label>
                            <span className="custom-input__label">Имя</span>
                            <span className="custom-input__wrapper">
                              <input
                                onChange={handleInputChange}
                                type="text"
                                name="login"
                              />
                            </span>
                          </label>
                        </div>
                        <div className="custom-input">
                          <label>
                            <span className="custom-input__label">E-mail</span>
                            <span className="custom-input__wrapper">
                              <input
                                type="email"
                                name="email"
                                onChange={handleInputChange}
                              />
                            </span>
                          </label>
                        </div>
                        <div className="custom-input">
                          <label>
                            <span className="custom-input__label">
                              Дата рождения
                            </span>
                            <span className="custom-input__wrapper">
                              <input
                                type="date"
                                name="birthday"
                                max="2099-12-31"
                                onChange={handleInputChange}
                              />
                            </span>
                          </label>
                        </div>
                        <div
                          className={cn('custom-select', {
                            'custom-select--not-selected':
                              !isUserLocationOpened && !formData.location,
                            'not-empty': formData.location,
                            'is-open': isUserLocationOpened,
                          })}
                        >
                          <span className="custom-select__label">
                            Ваша локация
                          </span>
                          <button
                            className="custom-select__button"
                            onClick={handleUserLocationButtonClick}
                            type="button"
                            aria-label="Выберите одну из опций"
                          >
                            <input
                              type="text"
                              name="location"
                              className="visually-hidden"
                              value={locationToRender}
                            />
                            <span className="custom-select__text">
                              {locationToRender}
                            </span>
                            <span className="custom-select__icon">
                              <svg width="15" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-down"></use>
                              </svg>
                            </span>
                          </button>
                          <ul className="custom-select__list" role="listbox">
                            {(
                              Object.entries(USER_LOCATION) as [
                                TUserLocation,
                                (typeof USER_LOCATION)[TUserLocation]
                              ][]
                            ).map(([type, label]) => (
                              <li
                                key={type}
                                className="custom-select__item"
                                tabIndex={0}
                                onClick={() =>
                                  handleUserLocationItemClick(label)
                                }
                              >
                                {label}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="custom-input">
                          <label>
                            <span className="custom-input__label">Пароль</span>
                            <span className="custom-input__wrapper">
                              <input
                                type="password"
                                name="password"
                                onChange={handleInputChange}
                                autoComplete="off"
                              />
                            </span>
                          </label>
                        </div>
                        <div className="sign-up__radio">
                          <span className="sign-up__label">Пол</span>
                          <div className="custom-toggle-radio custom-toggle-radio--big">
                            <div className="custom-toggle-radio__block">
                              <label>
                                <input
                                  type="radio"
                                  name="sex"
                                  onChange={handleInputChange}
                                  checked={formData.sex === 'мужской'}
                                  value="мужской"
                                />
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label">
                                  Мужской
                                </span>
                              </label>
                            </div>
                            <div className="custom-toggle-radio__block">
                              <label>
                                <input
                                  type="radio"
                                  name="sex"
                                  checked={formData.sex === 'женский'}
                                  onChange={handleInputChange}
                                  value="женский"
                                />
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label">
                                  Женский
                                </span>
                              </label>
                            </div>
                            <div className="custom-toggle-radio__block">
                              <label>
                                <input
                                  type="radio"
                                  name="sex"
                                  onChange={handleInputChange}
                                  checked={formData.sex === 'неважно'}
                                  value="неважно"
                                />
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label">
                                  Неважно
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="sign-up__role">
                        <h2 className="sign-up__legend">Выберите роль</h2>
                        <div className="role-selector sign-up__role-selector">
                          <div className="role-btn">
                            <label>
                              <input
                                className="visually-hidden"
                                type="radio"
                                name="role"
                                value="coach"
                                checked
                                onChange={handleInputChange}
                              />
                              <span className="role-btn__icon">
                                <svg width="12" height="13" aria-hidden="true">
                                  <use xlinkHref="#icon-cup"></use>
                                </svg>
                              </span>
                              <span className="role-btn__btn">
                                Я хочу тренировать
                              </span>
                            </label>
                          </div>
                          <div className="role-btn">
                            <label>
                              <input
                                className="visually-hidden"
                                type="radio"
                                name="role"
                                value="sportsman"
                                onChange={handleInputChange}
                              />
                              <span className="role-btn__icon">
                                <svg width="12" height="13" aria-hidden="true">
                                  <use xlinkHref="#icon-weight"></use>
                                </svg>
                              </span>
                              <span className="role-btn__btn">
                                Я хочу тренироваться
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="sign-up__checkbox">
                        <label>
                          <input
                            type="checkbox"
                            value="user-agreement"
                            name="user-agreement"
                            checked
                          />
                          <span className="sign-up__checkbox-icon">
                            <svg width="9" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-check"></use>
                            </svg>
                          </span>
                          <span className="sign-up__checkbox-label">
                            Я соглашаюсь с{' '}
                            <span>политикой конфиденциальности</span> компании
                          </span>
                        </label>
                      </div>
                      <button
                        className="btn sign-up__button"
                        type="submit"
                        disabled={!isSubmitButtonOk}
                      >
                        Продолжить
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export { RegisterPage };

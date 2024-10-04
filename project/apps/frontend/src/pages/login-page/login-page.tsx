import { Helmet } from 'react-helmet-async';
import {
  AppRoute,
  AuthorizationStatus,
  TAuthData,
  validateLoginForm,
} from '../../common';
import { useNavigate } from 'react-router-dom';
import { postAsyncAuth, selectAuthStatus } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

function LoginPage(): JSX.Element {
  const authStatus = useAppSelector(selectAuthStatus);
  const navigate = useNavigate();
  const [isSubmitButtonOk, setIsSubmitButtonOk] = useState(false);
  const [formData, setFormData] = useState<TAuthData>({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();

  const handleTextChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
    if (validateLoginForm({ ...formData, [name]: value })) {
      setIsSubmitButtonOk(true);
    } else {
      setIsSubmitButtonOk(false);
    }
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(
      postAsyncAuth({
        email: formData.email,
        password: formData.password,
      })
    );
  };

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authStatus, navigate]);

  return (
    <div className="wrapper">
      <Helmet>
        <title>FitFriends - Войти</title>
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
        <div className="popup-form popup-form--sign-in">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Вход</h1>
              </div>
              <div className="popup-form__form">
                <form onSubmit={handleFormSubmit} method="post">
                  <div className="sign-in">
                    <div className="custom-input sign-in__input">
                      <label>
                        <span className="custom-input__label">E-mail</span>
                        <span className="custom-input__wrapper">
                          <input
                            type="email"
                            name="email"
                            onChange={handleTextChange}
                            value={formData.email}
                            required
                          />
                        </span>
                      </label>
                    </div>
                    <div className="custom-input sign-in__input">
                      <label>
                        <span className="custom-input__label">Пароль</span>
                        <span className="custom-input__wrapper">
                          <input
                            type="password"
                            name="password"
                            onChange={handleTextChange}
                            value={formData.password}
                            required
                          />
                        </span>
                      </label>
                    </div>
                    <button
                      className="btn sign-in__button"
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
  );
}

export { LoginPage };

import { Helmet } from 'react-helmet-async';
import { BackButton, Header } from '../../components';

const PRODUCT_BACK_BTN_CN = `btn-flat--underlined reviews-side-bar__back`;

function ProductPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>FitFriends - Карточка тренировки</title>
      </Helmet>
      <div className="wrapper">
        <Header />
        <main>
          <section className="inner-page">
            <div className="container">
              <div className="inner-page__wrapper">
                <h1 className="visually-hidden">Карточка тренировки</h1>
                <aside className="reviews-side-bar">
                  <BackButton className={PRODUCT_BACK_BTN_CN} />
                  <h2 className="reviews-side-bar__title">Отзывы</h2>
                  <ul className="reviews-side-bar__list">
                    <li className="reviews-side-bar__item">
                      <div className="review">
                        <div className="review__user-info">
                          <div className="review__user-photo">
                            <picture>
                              <source
                                type="image/webp"
                                srcSet="img/content/avatars/users//photo-1.webp, img/content/avatars/users//photo-1@2x.webp 2x"
                              />
                              <img
                                src="img/content/avatars/users//photo-1.png"
                                srcSet="img/content/avatars/users//photo-1@2x.png 2x"
                                width="64"
                                height="64"
                                alt="Изображение пользователя"
                              />
                            </picture>
                          </div>
                          <span className="review__user-name">Никита</span>
                          <div className="review__rating">
                            <svg width="16" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg>
                            <span>5</span>
                          </div>
                        </div>
                        <p className="review__comment">
                          Эта тренировка для меня зарядка по&nbsp;утрам,
                          помогает проснуться.
                        </p>
                      </div>
                    </li>
                    <li className="reviews-side-bar__item">
                      <div className="review">
                        <div className="review__user-info">
                          <div className="review__user-photo">
                            <picture>
                              <source
                                type="image/webp"
                                srcSet="img/content/avatars/users//photo-2.webp, img/content/avatars/users//photo-2@2x.webp 2x"
                              />
                              <img
                                src="img/content/avatars/users//photo-2.png"
                                srcSet="img/content/avatars/users//photo-2@2x.png 2x"
                                width="64"
                                height="64"
                                alt="Изображение пользователя"
                              />
                            </picture>
                          </div>
                          <span className="review__user-name">Дарья</span>
                          <div className="review__rating">
                            <svg width="16" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg>
                            <span>5</span>
                          </div>
                        </div>
                        <p className="review__comment">
                          Спасибо, классная тренировка! Понятная
                          и&nbsp;интересная, с&nbsp;акцентом на&nbsp;правильную
                          технику, как я&nbsp;люблю.
                        </p>
                      </div>
                    </li>
                    <li className="reviews-side-bar__item">
                      <div className="review">
                        <div className="review__user-info">
                          <div className="review__user-photo">
                            <picture>
                              <source
                                type="image/webp"
                                srcSet="img/content/avatars/users//photo-3.webp, img/content/avatars/users//photo-3@2x.webp 2x"
                              />
                              <img
                                src="img/content/avatars/users//photo-3.png"
                                srcSet="img/content/avatars/users//photo-3@2x.png 2x"
                                width="64"
                                height="64"
                                alt="Изображение пользователя"
                              />
                            </picture>
                          </div>
                          <span className="review__user-name">Катерина</span>
                          <div className="review__rating">
                            <svg width="16" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg>
                            <span>4</span>
                          </div>
                        </div>
                        <p className="review__comment">
                          Хорошая тренировка, но&nbsp;все&nbsp;же
                          не&nbsp;хватило немного динамики. Для меня оказалась
                          слишком легкой.
                        </p>
                      </div>
                    </li>
                    <li className="reviews-side-bar__item">
                      <div className="review">
                        <div className="review__user-info">
                          <div className="review__user-photo">
                            <picture>
                              <source
                                type="image/webp"
                                srcSet="img/content/avatars/users//photo-4.webp, img/content/avatars/users//photo-4@2x.webp 2x"
                              />
                              <img
                                src="img/content/avatars/users//photo-4.png"
                                srcSet="img/content/avatars/users//photo-4@2x.png 2x"
                                width="64"
                                height="64"
                                alt="Изображение пользователя"
                              />
                            </picture>
                          </div>
                          <span className="review__user-name">Татьяна</span>
                          <div className="review__rating">
                            <svg width="16" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg>
                            <span>5</span>
                          </div>
                        </div>
                        <p className="review__comment">
                          Регулярно выполняю эту тренировку дома и&nbsp;вижу
                          результат! Спина стала прямее, появилось больше сил
                          и&nbsp;гибкость тоже стала лучше, хотя упражнения
                          довольно простые.
                        </p>
                      </div>
                    </li>
                    <li className="reviews-side-bar__item">
                      <div className="review">
                        <div className="review__user-info">
                          <div className="review__user-photo">
                            <picture>
                              <source
                                type="image/webp"
                                srcSet="img/content/avatars/users//photo-5.webp, img/content/avatars/users//photo-5@2x.webp 2x"
                              />
                              <img
                                src="img/content/avatars/users//photo-5.png"
                                srcSet="img/content/avatars/users//photo-5@2x.png 2x"
                                width="64"
                                height="64"
                                alt="Изображение пользователя"
                              />
                            </picture>
                          </div>
                          <span className="review__user-name">Наталья</span>
                          <div className="review__rating">
                            <svg width="16" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg>
                            <span>5</span>
                          </div>
                        </div>
                        <p className="review__comment">
                          Ну&nbsp;какой&nbsp;же кайф! Спасибо, крутая программа.
                          С&nbsp;музыкой вообще супер! Действительно, Energy!
                        </p>
                      </div>
                    </li>
                    <li className="reviews-side-bar__item">
                      <div className="review">
                        <div className="review__user-info">
                          <div className="review__user-photo">
                            <picture>
                              <source
                                type="image/webp"
                                srcSet="img/content/avatars/users//photo-1.webp, img/content/avatars/users//photo-1@2x.webp 2x"
                              />
                              <img
                                src="img/content/avatars/users//photo-1.png"
                                srcSet="img/content/avatars/users//photo-1@2x.png 2x"
                                width="64"
                                height="64"
                                alt="Изображение пользователя"
                              />
                            </picture>
                          </div>
                          <span className="review__user-name">Никита</span>
                          <div className="review__rating">
                            <svg width="16" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg>
                            <span>5</span>
                          </div>
                        </div>
                        <p className="review__comment">
                          Эта тренировка для меня зарядка по&nbsp;утрам,
                          помогает проснуться.
                        </p>
                      </div>
                    </li>
                  </ul>
                  <button
                    className="btn btn--medium reviews-side-bar__button"
                    type="button"
                  >
                    Оставить отзыв
                  </button>
                </aside>
                <div className="training-card">
                  <div className="training-info">
                    <h2 className="visually-hidden">Информация о тренировке</h2>
                    <div className="training-info__header">
                      <div className="training-info__coach">
                        <div className="training-info__photo">
                          <picture>
                            <source
                              type="image/webp"
                              srcSet="img/content/avatars/coaches//photo-1.webp, img/content/avatars/coaches//photo-1@2x.webp 2x"
                            />
                            <img
                              src="img/content/avatars/coaches//photo-1.png"
                              srcSet="img/content/avatars/coaches//photo-1@2x.png 2x"
                              width="64"
                              height="64"
                              alt="Изображение тренера"
                            />
                          </picture>
                        </div>
                        <div className="training-info__coach-info">
                          <span className="training-info__label">Тренер</span>
                          <span className="training-info__name">Валерия</span>
                        </div>
                      </div>
                    </div>
                    <div className="training-info__main-content">
                      <form action="#" method="get">
                        <div className="training-info__form-wrapper">
                          <div className="training-info__info-wrapper">
                            <div className="training-info__input training-info__input--training">
                              <label>
                                <span className="training-info__label">
                                  Название тренировки
                                </span>
                                <input
                                  type="text"
                                  name="training"
                                  value="energy"
                                  disabled
                                />
                              </label>
                              <div className="training-info__error">
                                Обязательное поле
                              </div>
                            </div>
                            <div className="training-info__textarea">
                              <label>
                                <span className="training-info__label">
                                  Описание тренировки
                                </span>
                                <textarea name="description" disabled>
                                  Упражнения укрепляют мышечный корсет, делают
                                  суставы более гибкими, улучшают осанку
                                  и&nbsp;координацию.
                                </textarea>
                              </label>
                            </div>
                          </div>
                          <div className="training-info__rating-wrapper">
                            <div className="training-info__input training-info__input--rating">
                              <label>
                                <span className="training-info__label">
                                  Рейтинг
                                </span>
                                <span className="training-info__rating-icon">
                                  <svg
                                    width="18"
                                    height="18"
                                    aria-hidden="true"
                                  >
                                    <use xlinkHref="#icon-star"></use>
                                  </svg>
                                </span>
                                <input
                                  type="number"
                                  name="rating"
                                  value="4"
                                  disabled
                                />
                              </label>
                            </div>
                            <ul className="training-info__list">
                              <li className="training-info__item">
                                <div className="hashtag hashtag--white">
                                  <span>#пилатес</span>
                                </div>
                              </li>
                              <li className="training-info__item">
                                <div className="hashtag hashtag--white">
                                  <span>#для_всех</span>
                                </div>
                              </li>
                              <li className="training-info__item">
                                <div className="hashtag hashtag--white">
                                  <span>#320ккал</span>
                                </div>
                              </li>
                              <li className="training-info__item">
                                <div className="hashtag hashtag--white">
                                  <span>#30_50минут</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="training-info__price-wrapper">
                            <div className="training-info__input training-info__input--price">
                              <label>
                                <span className="training-info__label">
                                  Стоимость
                                </span>
                                <input
                                  type="text"
                                  name="price"
                                  value="800 ₽"
                                  disabled
                                />
                              </label>
                              <div className="training-info__error">
                                Введите число
                              </div>
                            </div>
                            <button
                              className="btn training-info__buy"
                              type="button"
                            >
                              Купить
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="training-video">
                    <h2 className="training-video__title">Видео</h2>
                    <div className="training-video__video">
                      <div className="training-video__thumbnail">
                        <picture>
                          <source
                            type="image/webp"
                            srcSet="img/content/training-video/video-thumbnail.webp, img/content/training-video/video-thumbnail@2x.webp 2x"
                          />
                          <img
                            src="img/content/training-video/video-thumbnail.png"
                            srcSet="img/content/training-video/video-thumbnail@2x.png 2x"
                            width="922"
                            height="566"
                            alt="Обложка видео"
                          />
                        </picture>
                      </div>
                      <button className="training-video__play-button btn-reset">
                        <svg width="18" height="30" aria-hidden="true">
                          <use xlinkHref="#icon-arrow"></use>
                        </svg>
                      </button>
                    </div>
                    <div className="training-video__buttons-wrapper">
                      <button
                        className="btn training-video__button training-video__button--start"
                        type="button"
                        disabled
                      >
                        Приступить
                      </button>
                      <button
                        className="btn training-video__button training-video__button--stop"
                        type="button"
                      >
                        Закончить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export { ProductPage };

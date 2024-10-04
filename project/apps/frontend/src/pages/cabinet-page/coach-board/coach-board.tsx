import { Link } from 'react-router-dom';

function CoachBoard(): JSX.Element {
  return (
    <div className="personal-account-coach">
      <div className="personal-account-coach__navigation">
        <Link className="thumbnail-link thumbnail-link--theme-light" to="#">
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-flash"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои тренировки</span>
        </Link>
        <Link className="thumbnail-link thumbnail-link--theme-light" to="#">
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-add"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Создать тренировку</span>
        </Link>
        <Link className="thumbnail-link thumbnail-link--theme-light" to="#">
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-friends"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои друзья</span>
        </Link>
        <Link className="thumbnail-link thumbnail-link--theme-light" to="#">
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-bag"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои заказы</span>
        </Link>
      </div>
      <div className="personal-account-coach__additional-info">
        <div className="personal-account-coach__label-wrapper">
          <h2 className="personal-account-coach__label">
            Дипломы и сертификаты
          </h2>
          <button
            className="btn-flat btn-flat--underlined personal-account-coach__button"
            type="button"
          >
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-import"></use>
            </svg>
            <span>Загрузить</span>
          </button>
          <div className="personal-account-coach__controls">
            <button
              className="btn-icon personal-account-coach__control"
              type="button"
              aria-label="previous"
            >
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#arrow-left"></use>
              </svg>
            </button>
            <button
              className="btn-icon personal-account-coach__control"
              type="button"
              aria-label="next"
            >
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
          </div>
        </div>
        <ul className="personal-account-coach__list">
          <li className="personal-account-coach__item">
            <div className="certificate-card certificate-card--edit">
              <div className="certificate-card__image">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="img/content/certificates-and-diplomas/certificate-1.webp, img/content/certificates-and-diplomas/certificate-1@2x.webp 2x"
                  />
                  <img
                    src="img/content/certificates-and-diplomas/certificate-1.jpg"
                    srcSet="img/content/certificates-and-diplomas/certificate-1@2x.jpg 2x"
                    width="294"
                    height="360"
                    alt="Сертификат - Биомеханика ударов в боксе"
                  />
                </picture>
              </div>
              <div className="certificate-card__buttons">
                <button
                  className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
                  type="button"
                >
                  <svg width="12" height="12" aria-hidden="true">
                    <use xlinkHref="#icon-edit"></use>
                  </svg>
                  <span>Изменить</span>
                </button>
                <button
                  className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                  type="button"
                >
                  <svg width="12" height="12" aria-hidden="true">
                    <use xlinkHref="#icon-edit"></use>
                  </svg>
                  <span>Сохранить</span>
                </button>
                <div className="certificate-card__controls">
                  <button
                    className="btn-icon certificate-card__control"
                    type="button"
                    aria-label="next"
                  >
                    <svg width="16" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-change"></use>
                    </svg>
                  </button>
                  <button
                    className="btn-icon certificate-card__control"
                    type="button"
                    aria-label="next"
                  >
                    <svg width="14" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-trash"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export { CoachBoard };

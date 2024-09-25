import { Link } from 'react-router-dom';
import { AppRoute } from '../../../common';

function Search(): JSX.Element {
  return (
    <div className="search">
      <form action="#" method="get">
        <label>
          <span className="search__label">Поиск</span>
          <input type="search" name="search" />
          <svg
            className="search__icon"
            width="20"
            height="20"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-search"></use>
          </svg>
        </label>
        <ul className="search__list">
          <li className="search__item">
            <Link className="search__link" to={AppRoute.Main}>
              Бокс
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link is-active" to={AppRoute.Main}>
              Бег
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to={AppRoute.Main}>
              Аэробика
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to={AppRoute.Main}>
              Text
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to={AppRoute.Main}>
              Text
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to={AppRoute.Main}>
              Text
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to={AppRoute.Main}>
              Text
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to={AppRoute.Main}>
              Text
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to={AppRoute.Main}>
              Text
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to={AppRoute.Main}>
              Text
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to={AppRoute.Main}>
              Text
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to={AppRoute.Main}>
              Text
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to={AppRoute.Main}>
              Text
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export { Search }

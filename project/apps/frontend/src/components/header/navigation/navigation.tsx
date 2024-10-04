import { Link } from 'react-router-dom';
import {
  AppRoute,
  getNotificationContentDate,
  getNotificationPropDate,
} from '../../../common';
import { INotificationRdo } from '@project/common';
import cn from 'classnames';

type TNavigationProps = {
  pathName: string;
  notifications: INotificationRdo[];
  onNotificationProcessed: (id: string) => void;
};

function Navigation({
  pathName,
  notifications,
  onNotificationProcessed,
}: TNavigationProps): JSX.Element {
  const handleNotificationClick = (id: string) => {
    onNotificationProcessed(id);
  };

  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li className="main-nav__item">
          <Link
            className={cn('main-nav__link', {
              'is-active': pathName === AppRoute.Main,
            })}
            to={AppRoute.Main}
            aria-label="На главную"
          >
            <svg width="18" height="18" aria-hidden="true">
              <use xlinkHref="#icon-home"></use>
            </svg>
          </Link>
        </li>
        <li className="main-nav__item">
          <Link
            className={cn('main-nav__link', {
              'is-active': pathName === AppRoute.Cabinet,
            })}
            to={AppRoute.Cabinet}
            aria-label="Личный кабинет"
          >
            <svg width="16" height="18" aria-hidden="true">
              <use xlinkHref="#icon-user"></use>
            </svg>
          </Link>
        </li>
        <li className="main-nav__item">
          <Link
            className={cn('main-nav__link', {
              'is-active': pathName === AppRoute.Friends,
            })}
            to={AppRoute.Friends}
            aria-label="Друзья"
          >
            <svg width="22" height="16" aria-hidden="true">
              <use xlinkHref="#icon-friends"></use>
            </svg>
          </Link>
        </li>
        <li className="main-nav__item main-nav__item--notifications">
          <Link className="main-nav__link" to="#" aria-label="Уведомления">
            <svg width="14" height="18" aria-hidden="true">
              <use xlinkHref="#icon-notification"></use>
            </svg>
          </Link>
          <div className="main-nav__dropdown">
            <p className="main-nav__label">Оповещения</p>
            <ul className="main-nav__sublist">
              {notifications?.map((item) => (
                <li key={item.id} className="main-nav__subitem">
                  <Link
                    onClick={() => handleNotificationClick(item.id as string)}
                    className="item is-active"
                    to="#"
                  >
                    <p className="notification__text">{item.content}</p>
                    <time
                      className="notification__time"
                      dateTime={getNotificationPropDate(item.createdAt as Date)}
                    >
                      {getNotificationContentDate(item.createdAt as Date)}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export { Navigation };

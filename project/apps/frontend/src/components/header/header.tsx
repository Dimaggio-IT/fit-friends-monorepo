import { useLocation } from 'react-router-dom';
import { Logo, Navigation } from '../../components';
import { Search } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteAsyncNotification, getAsyncNotifications, selectNotifications } from '../../store';
import { useEffect } from 'react';

function Header(): JSX.Element {
  const location = useLocation();
  const pathName = location.pathname;
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);

  const handleNotificationOfProcessed = (id: string) => {
    dispatch(deleteAsyncNotification(id));
    dispatch(getAsyncNotifications());
  };

  useEffect(() => {
    dispatch(getAsyncNotifications());
  }, [dispatch]);

  return (
    <header className="header">
      <div className="container">
        <Logo />
        <Navigation
          pathName={pathName}
          notifications={notifications}
          onNotificationPrecessed={handleNotificationOfProcessed}
        />
        <Search />
      </div>
    </header>
  );
}

export { Header };

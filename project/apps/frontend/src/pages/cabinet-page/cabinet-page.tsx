import { Helmet } from 'react-helmet-async';
import { Header } from '../../components';
import { UserInfo } from './user-info/user-info';
import { AthleteBoard } from './athlete-board/athlete-board';
import { AthleteLinks } from './athlete-links/athlete-links';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { getAsyncUser, selectUser } from '../../store';
import { CoachBoard } from './coach-board/coach-board';
import { CoachLinks } from './coach-links/coach-links';
import { TUpdatingUserInfo, UserRole } from '../../common';

function CabinetPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser) as TUpdatingUserInfo;
  const isCoach = user?.role === UserRole.Coach;

  useEffect(() => {
    dispatch(getAsyncUser());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Helmet>
        <title>FitFriends - Кабинет пользователя</title>
      </Helmet>
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              {user && <UserInfo user={user} />}
              {!user && (
                <div className="user-info-edit">
                  <span>Пользователь не найден</span>
                </div>
              )}
              <div className="inner-page__content">
                {user && isCoach && (
                  <CoachBoard>
                    <CoachLinks />
                  </CoachBoard>
                )}
                {user && !isCoach && (
                  <AthleteBoard>
                    <AthleteLinks />
                  </AthleteBoard>
                )}
                {!user && (
                  <div className="personal-account-user">
                    <div className="personal-account-user__schedule">
                      <span>
                        Пожалуйста, авторизуйтесь для просмотра личного кабинета
                      </span>
                    </div>
                    <div className="personal-account-user__additional-info">
                      <span>
                        Необходимо зарегистрироваться или войти в систему
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export { CabinetPage };

import { Helmet } from 'react-helmet-async';
import { Header } from '../../components';
import { UserInfo } from './user-info/user-info';
import { AthleteBoard } from './athlete-board/athlete-board';
import { AthleteLinks } from './athlete-links/athlete-links';
import { useAppDispatch, useAppSelector } from '../../hooks';

/* TODO: получить данные полные по пользователю, далее выбрать или <CoachBoard /> или <AthleteBoard /> */

function CabinetPage(): JSX.Element {
  // const dispatch = useAppDispatch();
  // const user = useAppSelector(getUser);

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
              <UserInfo />
              <div className="inner-page__content">
                <AthleteBoard>
                  <AthleteLinks />
                </AthleteBoard>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export { CabinetPage };

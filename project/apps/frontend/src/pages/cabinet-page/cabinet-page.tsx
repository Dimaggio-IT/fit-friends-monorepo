import { Header } from '../../components';
import { CoachBoard } from './coach-board/coach-board';
import { UserInfo } from './user-info/user-info';

function CabinetPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <UserInfo />
              <div className="inner-page__content">
                <CoachBoard />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export { CabinetPage };

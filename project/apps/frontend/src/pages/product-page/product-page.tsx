import { Helmet } from 'react-helmet-async';
import { BackButton, Header, Popup, Product } from '../../components';
import { useAppSelector } from '../../hooks';
import { useState } from 'react';
import { IComment } from '@project/common';
import { selectProducts, selectUser } from '../../store';
import { UserRole } from '../../common';
import { Comment } from '../../components/comment';
import { LoadingScreen } from '../../components/loading-screen/loading-screen';
import { CreatingComment } from '../../components/comment/creating-comment';

const PRODUCT_BACK_BTN_CN = `btn-flat--underlined reviews-side-bar__back`;

function ProductPage(): JSX.Element | null {
  // TODO: переменные заглушки
  const isUserLoading = false;
  const isProductLoading = false;
  const isCommentsLoading = false;
  const comments = [] as IComment[];
  const training = useAppSelector(selectProducts)[0];
  const user = useAppSelector(selectUser);

  const isCoach = user?.role === UserRole.Coach;

  const [isModalScreen, setIsModalScreen] = useState(false);
  const togglePopup = () => {
    setIsModalScreen(!isModalScreen);
  };

  console.log({ training, user });

  if (!training || !user) {
    return null;
  }

  if (isProductLoading || isUserLoading || isCommentsLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>FitFriends - Карточка тренировки</title>
      </Helmet>
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
                  {comments.map((item) => (
                    <li className="reviews-side-bar__item" key={item.id}>
                      <Comment comment={item} />
                    </li>
                  ))}
                </ul>
                <button
                  className="btn btn--medium reviews-side-bar__button"
                  type="button"
                  disabled={isCoach}
                  onClick={togglePopup}
                >
                  Оставить отзыв
                </button>
                {isModalScreen && (
                  <Popup onClose={togglePopup}>
                    <CreatingComment
                      trainingId={training.id}
                      userId={user.id}
                      onClose={togglePopup}
                    />
                  </Popup>
                )}
              </aside>
              <Product training={training} role={user?.role} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export { ProductPage };

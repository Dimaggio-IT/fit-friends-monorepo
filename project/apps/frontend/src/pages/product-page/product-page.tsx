import { Helmet } from 'react-helmet-async';
import { BackButton, Header } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';
import { IComment } from '@project/common';
import { selectUser } from '../../store';
import { UserRole } from '../../common';
import { selectProduct } from '../../store/product-data/selectors';

const PRODUCT_BACK_BTN_CN = `btn-flat--underlined reviews-side-bar__back`;

function ProductPage(): JSX.Element | null{
  // const dispatch = useAppDispatch();

  const isUserLoading = false;
  const comments = [] as IComment[];
  const isCommentsLoading = false;

  const user = useAppSelector(selectUser);

  const isCoach = user?.role === UserRole.Coach;

  const isProductLoading = false;
  const training = useAppSelector(selectProduct);

  const [isModalScreen, setIsModalScreen] = useState(false);
  const togglePopup = () => {
    // if (isModalScreen && training) {
    //   dispatch(fetchComments(training.id));
    // }
    setIsModalScreen(!isModalScreen);
  };

  // useEffect(() => {
  //   if (training) {
  //     dispatch(fetchCoachTraining(training.id));
  //   }
  // }, [comments, dispatch]);

  if (!training) {
    return null;
  }

  // if (isProductLoading || isUserLoading || isCommentsLoading) {
  //   return <LoadingScreen />;
  // }

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
                {/* {isModalScreen && (
                  <PopupWindow onClose={togglePopup}>
                    <CreatingComment
                      trainingId={training.id}
                      userId={user.id}
                      onClose={togglePopup}
                    />
                  </PopupWindow>
                )} */}
              </aside>
              <Product product={training} role={user?.role} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export { ProductPage };

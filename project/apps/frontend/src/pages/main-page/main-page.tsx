import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { getAsyncProducts } from '../../store';
import { Hidden } from '../../components/hidden/hidden';
import { Header } from '../../components';
import { Popular } from './popular/popular';
import { Compilation } from './compilation/compilation';
import { Company } from './company/company';
import { Special } from './special/special';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAsyncProducts());
  }, [dispatch]);

  return (
    <>
      <Hidden />
      <div className="wrapper">
        <Helmet>
          <title>FitFriends</title>
        </Helmet>
        <Header />
        <main>
          <h1 className="visually-hidden">
            FitFriends — Время находить тренировки, спортзалы и друзей
            спортсменов
          </h1>
          <Compilation />
          <Special />
          <Popular />
          <Company />
        </main>
      </div>
    </>
  );
}

export { MainPage };

import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { getAsyncProducts } from '../../store';
import { Hidden } from '../../components/hidden/hidden';
import { Header } from '../../components';
import { Compilation } from './compilation/compilation';
import { Company } from './company/company';
import { Special } from './special/special';
import { WrappedPopularWithProducts } from '../../hof';

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
          <WrappedPopularWithProducts chunkOfData={4} index={0} />
          <Company />
        </main>
      </div>
    </>
  );
}

export { MainPage };

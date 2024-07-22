import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { getAsyncProducts } from '../../store';
import { Hidden } from '../../components/hidden/hidden';
import { Header } from '../../components';
import { Compilation } from './compilation/compilation';
import { Company } from './company/company';
import { Special } from './special/special';
import { WrappedCompilationWithProducts, WrappedPopularWithProducts } from '../../hof';

const DEFAULT_COLLECTION_INDEX = 0;
const DEFAULT_POPULAR_CHUNK_OF_DATA = 4;
const DEFAULT_COMPILATION_CHUNK_OF_DATA = 3;

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
          <WrappedCompilationWithProducts
            chunkOfData={DEFAULT_COMPILATION_CHUNK_OF_DATA}
            index={DEFAULT_COLLECTION_INDEX}
          />
          <Special />
          <WrappedPopularWithProducts
            chunkOfData={DEFAULT_POPULAR_CHUNK_OF_DATA}
            index={DEFAULT_COLLECTION_INDEX}
          />
          <Company />
        </main>
      </div>
    </>
  );
}

export { MainPage };

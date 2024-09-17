import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { getAsyncProducts, getAsyncUsers } from '../../store';
import { Header } from '../../components';
import { Special } from './special/special';
import {
  WrappedCompilationWithSliceProducts,
  WrappedPopularWithSliceProducts,
  WrappedSupportedWithSliceUsers,
} from '../../hof';

const DEFAULT_COLLECTION_INDEX = 0;
const DEFAULT_POPULAR_CHUNK_OF_DATA = 4;
const DEFAULT_COMPILATION_CHUNK_OF_DATA = 3;
const DEFAULT_SUPPORTER_CHUNK_OF_DATA = 4;

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAsyncProducts());
    dispatch(getAsyncUsers());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Helmet>
        <title>FitFriends</title>
      </Helmet>
      <Header />
      <main>
        <h1 className="visually-hidden">
          FitFriends — Время находить тренировки, спортзалы и друзей спортсменов
        </h1>
        <WrappedCompilationWithSliceProducts
          index={DEFAULT_COLLECTION_INDEX}
          chunkOfData={DEFAULT_COMPILATION_CHUNK_OF_DATA}
        />
        <Special />
        <WrappedPopularWithSliceProducts
          index={DEFAULT_COLLECTION_INDEX}
          chunkOfData={DEFAULT_POPULAR_CHUNK_OF_DATA}
        />
        <WrappedSupportedWithSliceUsers
          index={DEFAULT_COLLECTION_INDEX}
          chunkOfData={DEFAULT_SUPPORTER_CHUNK_OF_DATA}
        />
      </main>
    </div>
  );
}

export { MainPage };

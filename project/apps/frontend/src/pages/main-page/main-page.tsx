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
const ChunkOfData = {
  Popular: 4,
  Compilation: 3,
  Supported: 4,
} as const;

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
          chunkOfData={ChunkOfData.Compilation}
        />
        <Special />
        <WrappedPopularWithSliceProducts
          index={DEFAULT_COLLECTION_INDEX}
          chunkOfData={ChunkOfData.Popular}
        />
        <WrappedSupportedWithSliceUsers
          index={DEFAULT_COLLECTION_INDEX}
          chunkOfData={ChunkOfData.Supported}
        />
      </main>
    </div>
  );
}

export { MainPage };

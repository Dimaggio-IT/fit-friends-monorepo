import { Helmet } from 'react-helmet-async';
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
  return (
    <div className="wrapper">
      <Helmet>
        <title>FitFriends - главная страница</title>
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

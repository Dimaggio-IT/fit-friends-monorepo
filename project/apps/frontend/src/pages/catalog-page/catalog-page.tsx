import { Link } from 'react-router-dom';
import { AppRoute } from '../../common';
import { Hidden } from '../../components/hidden/hidden';
import { Catalog, Navigation } from '../../components';
import { Search } from '../../components';
import { QueryForm } from './query-form/query-form';

function CatalogPage(): JSX.Element {
  return (
    <>
      <Hidden />
      <div className="wrapper">
        <header className="header">
          <div className="container">
            <Link
              className="header__logo"
              to={AppRoute.Main}
              aria-label="Переход на главную"
            >
              <svg width="187" height="70" aria-hidden="true">
                <use xlinkHref="#logo"></use>
              </svg>
            </Link>

            <Navigation />
            <Search />
          </div>
        </header>
        <main>
          <section className="inner-page">
            <div className="container">
              <div className="inner-page__wrapper">
                <h1 className="visually-hidden">Каталог тренировок</h1>
                <QueryForm />
                <Catalog />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export { CatalogPage };

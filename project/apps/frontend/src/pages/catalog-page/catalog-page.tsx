import { Catalog, Header } from '../../components';
import { QueryForm } from './query-form/query-form';

function CatalogPage(): JSX.Element {
  return (
      <div className="wrapper">
        <Header />
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
  );
}

export { CatalogPage };

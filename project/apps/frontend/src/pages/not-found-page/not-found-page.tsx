import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styles from './not-found-page.module.scss';
import { AppRoute } from '../../const.ts';
import { CSSProperties } from 'react';

const style: CSSProperties = {
  textAlign: 'center',
};

function NotFoundPage(): JSX.Element {
  return (
    <div className={`page ${styles['page--notFoundPage']}`}>
      <Helmet>
        <title>6 Cities - Not found page</title>
      </Helmet>
      <div style={style}>
        <img
          src="img/oops-bg.png"
          width={500}
          height={60}
          alt="Not found page image"
        />
        <h1 className={styles.page__title}>404. Page not found</h1>
        <p className={styles.page__text}>
          Return to the{' '}
          <Link to={AppRoute.Main} className={styles.page__link}>
            main page
          </Link>
        </p>
      </div>
    </div>
  );
}

export { NotFoundPage };

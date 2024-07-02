import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../common';

function ProductPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Helmet>
        <title>Карточка тренировки — FitFriends</title>
      </Helmet>
      <h1>ENERGY</h1>
      <p>
        Упражнения укрепляют мышечный корсет, делают суставы более гибкими,
        улучшают осанку и координацию. Return to the{' '}
        <Link to={AppRoute.Main}>main page</Link>
      </p>
    </div>
  );
}

export { ProductPage };

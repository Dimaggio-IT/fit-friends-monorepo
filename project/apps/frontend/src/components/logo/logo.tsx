import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type TLogoProps = {
  width?: number;
  height?: number;
};

function Logo(
  { width, height }: TLogoProps = { width: 81, height: 41 }
): JSX.Element {
  return (
    <Link className="header__logo-link" to={AppRoute.Main} data-testid="header-link">
      <img
        className="header__logo"
        src="img/logo.svg"
        alt="6 cities logo"
        width={width}
        height={height}
        data-testid="logo-img"
      />
    </Link>
  );
}

export { Logo };

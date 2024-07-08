import { Link } from 'react-router-dom';
import { AppRoute } from '../../common';
import { Logo, Navigation } from '../../components';
import { Search } from '../../components';

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <Logo />
        <Navigation />
        <Search />
      </div>
    </header>
  );
}

export { Header };

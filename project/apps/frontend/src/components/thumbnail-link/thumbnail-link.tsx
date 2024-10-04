import { Link } from 'react-router-dom';
import { Theme, TTheme } from '../../common';
import { AppRoute } from '../../common';
import { TIconLink } from '../../common/type/icon.type';

type TThumbnailLinkProps = {
  theme: TTheme;
  icon: TIconLink;
  to: AppRoute;
  content: string;
};

const ThemeLightClassName = {
  Link: `thumbnail-link--theme-light`,
  Icon: `thumbnail-link__icon--theme-dark`,
} as const;

const ThemeDarkClassName = {
  Link: `thumbnail-link--theme-dark`,
  Icon: `thumbnail-link__icon--theme-dark`,
} as const;

function ThumbnailLink({
  theme,
  icon,
  to,
  content,
}: TThumbnailLinkProps): JSX.Element {
  const themeLinkCN =
    theme === Theme.Light ? ThemeLightClassName.Link : ThemeDarkClassName.Link;
  const themeIconCN =
    theme === Theme.Light ? ThemeLightClassName.Icon : ThemeDarkClassName.Icon;

  return (
    <Link className={`thumbnail-link ${themeLinkCN}`} to={to}>
      <div className={`thumbnail-link__icon ${themeIconCN}`}>
        <svg width="30" height="26" aria-hidden="true">
          <use xlinkHref={icon}></use>
        </svg>
      </div>
      <span className="thumbnail-link__text">{content}</span>
    </Link>
  );
}

export { ThumbnailLink };
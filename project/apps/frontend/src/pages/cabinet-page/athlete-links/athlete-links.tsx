import { ThumbnailLink } from '../../../components';
import { AppRoute, IconLink, LinkContent, Theme } from '../../../common';

function AthleteLinks(): JSX.Element {
  return (
    <>
      <ThumbnailLink
        theme={Theme.Light}
        icon={IconLink.Friends}
        to={AppRoute.Friends}
        content={LinkContent.Friends}
        isHidden={true}
      />
      <ThumbnailLink
        theme={Theme.Light}
        icon={IconLink.Cart}
        to={AppRoute.Balances}
        content={LinkContent.Balances}
      />
    </>
  );
}

export { AthleteLinks };

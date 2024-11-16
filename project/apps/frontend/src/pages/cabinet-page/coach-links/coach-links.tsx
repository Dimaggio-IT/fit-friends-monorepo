import { ThumbnailLink } from '../../../components';
import { AppRoute, IconLink, LinkContent, Theme } from '../../../common';

function CoachLinks(): JSX.Element {
  return (
    <>
      <ThumbnailLink
        theme={Theme.Light}
        icon={IconLink.Trainings}
        to={AppRoute.Catalog}
        content={LinkContent.Training}
      />

      <ThumbnailLink
        theme={Theme.Light}
        icon={IconLink.AddTraining}
        to={AppRoute.Product}
        content={LinkContent.AddTraining}
      />

      <ThumbnailLink
        theme={Theme.Light}
        icon={IconLink.Friends}
        to={AppRoute.Friends}
        content={LinkContent.Friends}
      />
    </>
  );
}

export { CoachLinks };

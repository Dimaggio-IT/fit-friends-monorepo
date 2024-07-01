import { TProductId, TUserId } from '../../common';

type TUri = string;
type TUriProps = {
  uri: TUri;
  productId?: TProductId;
  userId?: TUserId;
};

function replaceURI(
  {
    uri,
    productId = '',
    userId = ''
  }: TUriProps): TUri | null {
  const patternProductId = /{productId}/g;
  const patternUserId = /{userId}/g;

  if (!productId && !userId) {
    return null;
  }
  return uri.replace(patternProductId, productId)
    .replace(patternUserId, userId);
}

export { replaceURI };

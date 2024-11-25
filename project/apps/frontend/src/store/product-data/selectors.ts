import { NameSpace } from '../../common';
import { IProductRdo } from '@project/common';
import { TState } from '../../common';

const selectProduct = (state: Pick<TState, NameSpace.Product>): IProductRdo | null => state[NameSpace.Product].product;

export { selectProduct };

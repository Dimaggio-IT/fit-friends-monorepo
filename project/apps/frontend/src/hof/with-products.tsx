import { IProductRdo } from '@project/common';
import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../hooks';
import { selectIsEmptyProducts, selectProducts } from '../store';
import { Popular } from '../pages/main-page/popular/popular';

export interface WrapperProps {
  index: number;
  chunkOfData: number;
}

export interface WrapperForWrappedProps {
  isEmptyProducts: boolean;
  products: IProductRdo[];
  onIndexNextChange: () => void;
  onIndexPreviousChange: () => void;
}

export function withProducts(
  WrappedComponent: FC<WrapperProps & WrapperForWrappedProps>
): FC<WrapperProps> {
  const WrapperComponent: FC<WrapperProps> = (props) => {
    const { index: defaultIndex, chunkOfData } = props;
    const [index, setIndex] = useState(defaultIndex);
    const data = useAppSelector(selectProducts);
    const [products, setProducts] = useState(data);
    const isEmptyProducts = useAppSelector(selectIsEmptyProducts);

    useEffect(() => {
      setProducts(data.slice(index, index + chunkOfData));
    }, [index, data, chunkOfData]);

    const handlePreviousNextChange = () => {
      if (index > 0) {
        setIndex((prevIndex) => prevIndex - 1);
      }
    };

    const handleNextButtonClick = () => {
      if (index <= data.length - chunkOfData) {
        setIndex((prevIndex) => prevIndex + 1);
      }
    };

    const wrapperToWrappedProps = {
      index,
      chunkOfData,
      onIndexNextChange: handleNextButtonClick,
      onIndexPreviousChange: handlePreviousNextChange,
      isEmptyProducts,
      products,
    };

    return <WrappedComponent {...wrapperToWrappedProps} />;
  };

  return WrapperComponent;
}

export const WrappedPopularWithProducts = withProducts(Popular);

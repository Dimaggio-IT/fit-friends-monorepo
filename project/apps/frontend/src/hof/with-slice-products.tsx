import { IProductRdo } from '@project/common';
import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../hooks';
import { selectProducts } from '../store';
import { Popular } from '../pages/main-page/popular/popular';
import { Compilation } from '../pages/main-page/compilation/compilation';

interface CustomComponentProps {
  index: number;
  chunkOfData: number;
}

interface WrapperForWrappedProps {
  isEmptyProducts: boolean;
  amountOfProducts: number;
  products: IProductRdo[];
  onIndexNextChange: () => void;
  onIndexPreviousChange: () => void;
}

function withSliceProducts(
  WrappedComponent: FC<CustomComponentProps & WrapperForWrappedProps>
): FC<CustomComponentProps> {
  const WrapperComponent: FC<CustomComponentProps> = (props) => {
    const { index: defaultIndex, chunkOfData } = props;
    const [index, setIndex] = useState(defaultIndex);
    const data = useAppSelector(selectProducts);
    const [products, setProducts] = useState(data);
    const amountOfProducts = data.length;
    const isEmptyProducts = data.length === 0;

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
      amountOfProducts,
      isEmptyProducts,
      products,
    };

    return <WrappedComponent {...wrapperToWrappedProps} />;
  };

  return WrapperComponent;
}

const WrappedPopularWithSliceProducts = withSliceProducts(Popular);

const WrappedCompilationWithSliceProducts =
  withSliceProducts(Compilation);

export {
  WrappedPopularWithSliceProducts,
  WrappedCompilationWithSliceProducts,
  CustomComponentProps,
  WrapperForWrappedProps,
};

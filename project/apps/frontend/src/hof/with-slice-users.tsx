import React, { ComponentType, FC, useEffect, useState } from 'react';
import { Supporter } from '../pages/main-page/supporter/supporter';
import { IUserRdo } from '@project/common';
import { useAppSelector } from '../hooks';
import { selectUsers } from '../store';

interface WrapperSliceUsersProps {
  isEmptyUsers: boolean;
  amountOfUsers: number;
  users: IUserRdo[];
  onIndexNextChange: () => void;
  onIndexPreviousChange: () => void;
}

interface CustomSliceUsersProps {
  index: number;
  chunkOfData: number;
}

function withHoc(
  WrappedComponent: ComponentType<CustomSliceUsersProps & WrapperSliceUsersProps>
): FC<CustomSliceUsersProps> {
  const WrapperComponent: FC<CustomSliceUsersProps> = (props) => {
    const { index: defaultIndex, chunkOfData } = props;
    const [index, setIndex] = useState(defaultIndex);
    const data = useAppSelector(selectUsers);
    const [users, setUsers] = useState(data);
    const amountOfUsers = data.length;
    const isEmptyUsers = data.length === 0;

    useEffect(() => {
      setUsers(data.slice(index, index + chunkOfData));
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

    const wrappedFullProps = {
      index,
      chunkOfData,
      onIndexNextChange: handleNextButtonClick,
      onIndexPreviousChange: handlePreviousNextChange,
      amountOfUsers,
      isEmptyUsers,
      users,
    };

    return <WrappedComponent {...wrappedFullProps} />;
  };

  return WrapperComponent;
}

const WrappedSupportedWithSliceUsers = withHoc(Supporter);

export {
  WrappedSupportedWithSliceUsers,
  WrapperSliceUsersProps,
  CustomSliceUsersProps,
};

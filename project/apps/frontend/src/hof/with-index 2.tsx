import React, { ComponentType, FC } from 'react';

export interface WrapperProps {
  a: number;
  b: string;
}
export interface WrapperForWrappedProps {
  c: boolean;
}

export interface CustomComponentProps {
  d: number;
  e: string;
}

export function withIndex<WrappedProps>(
  WrappedComponent: ComponentType<WrappedProps & WrapperForWrappedProps>
): FC<WrappedProps & WrapperProps> {
  const WrapperComponent: FC<WrappedProps & WrapperProps> = (props) => {
    const { a, b, ...wrappedOnlyProps } = props;
    const wrapperToWrappedProps = {
      c: true,
    };
    const wrappedFullProps = {
      ...wrapperToWrappedProps,
      ...(wrappedOnlyProps as unknown as WrappedProps),
    };

    return <WrappedComponent {...wrappedFullProps} />;
  };

  return WrapperComponent;
}

export const CustomComponent: FC<
  CustomComponentProps & WrapperForWrappedProps
> = ({ c, d, e }) => {
  return null;
};

export const CustomComponentWrapped = withIndex(CustomComponent);

// Ниже так написано, просто что не высвечивало ошибку, имею ввиду <>...</>
<>
  <CustomComponentWrapped a={0} b={``} d={1} e={``} />;
  <CustomComponent c={true} d={5} e={``} />
  <CustomComponentWrapped a={0} b={``} c={true} d={1} e={``} />
</>;

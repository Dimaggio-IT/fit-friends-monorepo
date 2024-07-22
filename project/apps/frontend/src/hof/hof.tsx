// import React, { ComponentType, FC } from 'react';

// export interface WrapperProps {
//   a: number;
//   b: string;
// }
// export interface WrapperForWrappedProps {
//   c: boolean;
// }

// export interface CustomComponentProps {
//   d: number;
//   e: string;
// }

// export function withHoc<WrappedProps>(
//   WrappedComponent: ComponentType<WrappedProps & WrapperForWrappedProps>
// ): FC<WrappedProps & WrapperProps> {
//   const WrapperComponent: FC<WrappedProps & WrapperProps> = (props) => {
//     const { a, b, ...wrappedOnlyProps } = props;
//     const wrapperToWrappedProps = {
//       c: true,
//     };
//     const wrappedFullProps = {
//       ...wrapperToWrappedProps,
//       ...(wrappedOnlyProps as unknown as WrappedProps),
//     };

//     return <WrappedComponent {...wrappedFullProps} />;
//   };

//   return WrapperComponent;
// }

// export const CustomComponent: FC<
//   CustomComponentProps & WrapperForWrappedProps
// > = ({ c, d, e }) => {
//   return null;
// };

// export const CustomComponentWrapped = withHoc(CustomComponent);

// // Ниже так написано, просто что не высвечивало ошибку, имею ввиду <>...</>
// <>
//   <CustomComponentWrapped a={0} b={``} d={1} e={``} />;
//   <CustomComponent c={true} d={5} e={``} />
//   <CustomComponentWrapped a={0} b={``} c={true} d={1} e={``} />
// </>;

// class Point {
//   x: number;
//   y: number;
//   constructor(initial: { x: number; y: number }) {
//     this.x = initial.x;
//     this.y = initial.y;
//   }
// }

// // Same as `{x: number, y: number}`
// type PointInstance = InstanceType<typeof Point>;

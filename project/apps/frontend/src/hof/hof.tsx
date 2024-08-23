// import React, { ComponentType, FC } from 'react';

// //! это пропсы которые прийдут
// //! в обёртку и будут использованы только ей(обёрткой)
// //! они НЕ направятся в обёртываемы(целевой) компонент
// interface WrapperProps {
//   a: number;
//   b: string;
// }

// //! это пропсы "рождаются" в обертке
// //! и направляются в обёртываемы(целевой) компонент
// interface WrapperForWrappedProps {
//   c: boolean;
// }

// //! эти пропсы вначале передаются в обёртку а из неё уже
// //! поступают и в обёртываемый компонент
// interface CustomComponentProps {
//   d: number;
//   e: string;
// }

// function withHoc<WrappedProps>(
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

// const CustomComponent: FC<
//   CustomComponentProps & WrapperForWrappedProps
// > = ({ c, d, e }) => {
//   return null;
// };

// const CustomComponentWrapped = withHoc(CustomComponent);

// export {
//   CustomComponent,
//   CustomComponentWrapped,
//   WrapperProps,
//   WrapperForWrappedProps,
//   CustomComponentProps,
// };

// ниже пример использования
// Ниже так написано, просто что не высвечивало ошибку, имею ввиду <>...</>
//<>
//  <CustomComponent c={true} d={5} e={``} />
//  <CustomComponentWrapped a={0} b={``} d={1} e={``} />;
//  <CustomComponentWrapped a={0} b={``} c={true} d={1} e={``} g={false} u={``}/>
//</>;

// class Point {
//   x: number;
//   y: number;
//   constructor(initial: { x: number; y: number }) {
//     this.x = initial.x;
//     this.y = initial.y;
//   }
// }

// Same as `{x: number, y: number}`
// type PointInstance = InstanceType<typeof Point>;

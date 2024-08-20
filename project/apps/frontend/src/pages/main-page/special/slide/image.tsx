type TSlideImageProps = {
  slide: number;
};

function SlideImage({ slide }: TSlideImageProps): JSX.Element {
  const currentNameIndex = slide + 1;

  return (
    <img
      src={`img/content/promo-${currentNameIndex}.png`}
      srcSet={`img/content/promo-${currentNameIndex}@2x.png 2x`}
      width="1040"
      height="469"
      alt={`slide${currentNameIndex}`}
    />
  );
}

export { SlideImage };

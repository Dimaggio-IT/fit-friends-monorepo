import { Theme } from '../constant/theme.const';

type TTheme = typeof Theme[keyof typeof Theme];

export { type TTheme };

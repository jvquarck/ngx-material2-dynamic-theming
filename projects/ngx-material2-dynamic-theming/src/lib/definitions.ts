
export interface PaletteValues extends GradientsColors {
  contrast?: GradientsColors;
}

export interface ThemingExtraOptions {
  contrastRatio?: number;
}

export interface ThemingOptions {
  extra?: ThemingExtraOptions,
  palettes?: Partial<PaletteValuesType>,
}

export interface GradientsK extends Gradients<number> { }
export interface GradientsColors extends Gradients<string> { }
export interface Gradients<T> {
  50?: T;
  100?: T;
  200?: T;
  300?: T;
  400?: T;
  500: T;
  600?: T;
  700?: T;
  800?: T;
  900?: T;
  A100?: T;
  A200?: T;
  A400?: T;
  A700?: T;
}

export enum Palettes {
  primary = 'primary',
  secondary = 'secondary',
  warn = 'warn',
  dark = 'dark',
}

export enum CommonPaletteValues {
  Default = 'default',
  Lighter = 'lighter',
  Darker = 'darker',
  Hover = 'hover',
}

export type PaletteMap<C extends object, T> = { [P in keyof C]: T };

export type PaletteValuesType = PaletteMap<typeof Palettes, PaletteValues | string>;

export const OPACITY_FACTOR = .4;
export const HOVER_OPACITY_FACTOR = .2;
export const FOREGROUND_COLORS_BRIGHT_FACTOR = 200;
export const BACKGROUND_COLORS_BRIGHT_FACTOR = 245;
export const AUTO_GENERATE_FOREGROUNDS = true;

export const DEFAULT_THEME_PALETTES: PaletteValuesType = {
  primary: '#00a0b2',
  secondary: '#9355b7',
  dark: '#616161',
  warn: '#f44336',
};

export const DEFAULT_THEMING_EXTRA_OPTIONS: ThemingExtraOptions = {
  contrastRatio: BACKGROUND_COLORS_BRIGHT_FACTOR
};

export const DEFAULT_THEMING_OPTIONS: ThemingOptions = {
  extra: DEFAULT_THEMING_EXTRA_OPTIONS,
  palettes: DEFAULT_THEME_PALETTES,
}

export const BRIGHTEN_HOVER_K = 1;
export const LIGHT_LIGHTEN_K = .9;
export const LIGHT_DARKEN_K = .7;
export const LIGHT_HOVER_K = .5;

export const GRADIENTS_K: GradientsK = {
  50: 0.85,
  100: 0.7,
  200: 0.5,
  300: 0.3,
  400: 0.15,
  500: 0,
  600: 0.05,
  700: 0.1,
  800: 0.15,
  900: 0.25,
  A100: 0.35,
  A200: 0.5,
  A400: 0.65,
  A700: 0.8,
};
export const GRADIENTS = Object.keys(GRADIENTS_K);
export const DEFAULT_GRADIENT_INDEX = 5;
export const RED_COEFICIENT = 0.2126;
export const GREEN_COEFICIENT = 0.7152;
export const BLUE_COEFICIENT = 0.0722;
export const LOW_GAMME_ADJUST_COEFICIENT = 1 / 12.92;

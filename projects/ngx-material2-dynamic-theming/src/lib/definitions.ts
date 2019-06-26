import { Gradients } from './utils';

export interface PaletteValues extends Gradients {
  contrast?: Gradients;
}

export interface ThemingExtraOptions {
  autoAdjust: boolean; // If true, check if the derived colors from the default one need some extra adjusting based on 'brightnessFactor' property.
  brightnessFactor?: number;
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
    primary: '#3F51B5',
    secondary: '#FFD31F',
    dark: '#616161',
    warn: '#F44336',
};

export const DEFAULT_THEMING_EXTRA_OPTIONS: ThemingExtraOptions = {
    autoAdjust: false,
    brightnessFactor: BACKGROUND_COLORS_BRIGHT_FACTOR
};

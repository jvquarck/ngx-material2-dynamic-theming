export interface PaletteValues {
    default: string;
    lighter?: string;
    darker?: string;
    hover?: string;
    contrast?: {
        default?: string;
        lighter?: string;
        darker?: string;
        hover?: string;
    };
}
export interface ThemingExtraOptions {
    autoAdjust: boolean;
    brightnessFactor?: number;
}
export declare enum Palettes {
    primary = "primary",
    secondary = "secondary",
    warn = "warn",
    dark = "dark"
}
export declare enum CommonPaletteValues {
    Default = "default",
    Lighter = "lighter",
    Darker = "darker",
    Hover = "hover"
}
export declare type PaletteMap<C extends object, T> = {
    [P in keyof C]: T;
};
export declare type PaletteValuesType = PaletteMap<typeof Palettes, PaletteValues | string>;
export declare const OPACITY_FACTOR = 0.4;
export declare const HOVER_OPACITY_FACTOR = 0.2;
export declare const FOREGROUND_COLORS_BRIGHT_FACTOR = 200;
export declare const BACKGROUND_COLORS_BRIGHT_FACTOR = 245;
export declare const AUTO_GENERATE_FOREGROUNDS = true;
export declare const DEFAULT_THEME_PALETTES: PaletteValuesType;
export declare const DEFAULT_THEMING_EXTRA_OPTIONS: ThemingExtraOptions;

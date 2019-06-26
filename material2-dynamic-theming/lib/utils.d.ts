import { ElementRef } from '@angular/core';
import { Palettes, PaletteValues, ThemingExtraOptions } from './definitions';
export declare const DARKENING_K: number;
export declare const BRIGHTEN_K: number;
export declare const BRIGHTEN_HOVER_K: number;
export declare const LIGHT_LIGHTEN_K: number;
export declare const LIGHT_DARKEN_K: number;
export declare const LIGHT_HOVER_K: number;
/**
 * Returns a solid color that is the resulting of adding opacity to <color> and having a <background> beneath it
 * @param color hex value color
 * @param background hex value background color
 * @param opacity 0 to 1 opacity value
 */
export declare function getSolidColorFromOpacityBackground(color: string, background: string, opacity: number): string;
/**
 * Returns a new color brighter depending on k
 * @param color hex color (e.g.: #FFFFFF)
 * @param k (from 0 to 1)
 */
export declare function getDarkerColor(color: string, k: number): string;
/**
 * Returns a new color brighter depending on k
 * @param color hex color (e.g.: #FFFFFF)
 * @param k (from 0 to 1)
 */
export declare function getBrighterColor(color: string, k: number): string;
/**
 * Shallow copy keeps references to original objects, arrays or functions within the new object,
 * so the "copy" is still linked to the original object. In other words, they will be pointing to the same memory location.
 * @param oldObj
 */
export declare function shallowCopy(oldObj: any): {};
/**
 * Deep copy duplicates everything, and allocates memory in a different location.
 * @param oldObj
 */
export declare function deepCopy(oldObj: any): any;
/**
 * Return the desired property from an object if found
 * @param obj target Object
 * @param path path to the desired property with . notation i.e: 'path.to.object'
 */
export declare function getProperty(obj: any, path: string): any;
export declare class ThemingUtil {
    /**
     * Returns the color and its lighter and darker versions [color, lighter, darker]
     * @param color
     */
    static getColorsFromBase(color: string): [string, string, string, string];
    /**
     * Returns the colors [default, lighten, darken, hover] for a color that is considered 'bright'.
     * @param color
     */
    static getColorsFromLightColor(color: string): [string, string, string, string];
    /**
     * Get hex value from a color string either if it comes in #FFFFFF or 255, 255, 255 notation
     * @param hexColor
     */
    static getColorString(hexColor: string): string;
    /**
     * Get a random hex color
     */
    static getRandomHex(): string;
    /**
     * Generic method to get custom properties
     * @param elementRef elementRef element where custom properties will be retrieved from
     * @param customProperties list of properties to get
     */
    static getCustomProperties(elementRef: ElementRef, customProperties: string[]): string[];
    /**
     * Generic method to set custom properties
     * @param elementRef elementRef element where custom properties will be set to
     * @param customProperties dictionary of properties to set
     */
    static setCustomProperties(elementRef: ElementRef, customProperties: {
        [k: string]: any;
    }): void;
    /**
     * Set css custom properties based on a palette name and values and onto and onto an ElementRef styles
     * @param elementRef element where custom properties will be set
     * @param paletteValues color values
     * @param paletteName name of the palette to set
     * @param options custom to set if needed
     */
    static setPaletteCustomProperties(elementRef: ElementRef, paletteValues: PaletteValues | string, paletteName: Palettes, options?: ThemingExtraOptions): void;
    /**
     * Return custom property keys for a palette
     * @param contrast flag indicating to return contrast custom properties keys
     */
    static getPaletteCustomPropertiesNames(paletteName: string, contrast?: boolean): [string, string, string, string];
    /**
     * Get hex color from either an hex or `r, g, b` string
     * @param color  hex or `r, g, b` string
     */
    static getHexValueFromColor(color: string): string;
    /**
     * AutoGenerate foreground color based on a background color
     * http://www.w3.org/TR/AERT#color-contrast
     * @param backgroundColor background color from which the foreground color will be calculated
     */
    static getForegroundColorW3C(backgroundColor: string): string;
    /**
     * Resolve if color is bright (otherwise is dark)
     * http://www.w3.org/TR/AERT#color-contrast
     * @param color value to check if bright or dark should be applied
     * @param brightFactor value from 0 to 255 that specifies the limit where this color is considered 'Bright'
     */
    static getIsBright(color: string, brightFactor: number): boolean;
}

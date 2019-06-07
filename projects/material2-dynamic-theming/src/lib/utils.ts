import { ElementRef } from '@angular/core';
import { color as d3Color, rgb } from 'd3-color';
// import { getProperty } from '../../../utils/object.utils';
import { AUTO_GENERATE_FOREGROUNDS, CommonPaletteValues as CommonPaletteValuesEnum, DEFAULT_THEMING_EXTRA_OPTIONS, FOREGROUND_COLORS_BRIGHT_FACTOR, OPACITY_FACTOR, Palettes, PaletteValues, ThemingExtraOptions } from './definitions';

export const DARKENING_K: number = OPACITY_FACTOR;
export const BRIGHTEN_K: number = OPACITY_FACTOR;
export const BRIGHTEN_HOVER_K: number = 1;
export const LIGHT_LIGHTEN_K: number = .9;
export const LIGHT_DARKEN_K: number = .7;
export const LIGHT_HOVER_K: number = .5;

const CommonPaletteValues: string[] = Object.values(CommonPaletteValuesEnum);

/**
 * Returns a solid color that is the resulting of adding opacity to <color> and having a <background> beneath it
 * @param color hex value color
 * @param background hex value background color
 * @param opacity 0 to 1 opacity value
 */
export function getSolidColorFromOpacityBackground(color: string, background: string, opacity: number): string {
    const delta: number = 1 - opacity;
    const dColor = d3Color(color).rgb();
    const dBackgroundColor = d3Color(background).rgb();
    return rgb(Math.round(dColor.r + ((dBackgroundColor.r - dColor.r) * delta)),
        Math.round(dColor.g + ((dBackgroundColor.g - dColor.g) * delta)),
        Math.round(dColor.b + ((dBackgroundColor.b - dColor.b) * delta))).hex();
}

/**
 * Returns a new color brighter depending on k
 * @param color hex color (e.g.: #FFFFFF)
 * @param k (from 0 to 1)
 */
export function getDarkerColor(color: string, k: number): string {
    try {
        return getSolidColorFromOpacityBackground(color, '#000000', k);
    } catch (error) {
        console.warn('d3-color', 'darker', `Wrong color ${ color } provided`);
        return color;
    }
}

/**
 * Returns a new color brighter depending on k
 * @param color hex color (e.g.: #FFFFFF)
 * @param k (from 0 to 1)
 */
export function getBrighterColor(color: string, k: number): string {
    try {
        return getSolidColorFromOpacityBackground(color, '#FFFFFF', k);
    } catch (error) {
        console.warn('d3-color', 'brighter', `Wrong color ${ color } provided`);
        return color;
    }
}

// full credit to: http://geniuscarrier.com/copy-object-in-javascript/
/**
 * Shallow copy keeps references to original objects, arrays or functions within the new object,
 * so the "copy" is still linked to the original object. In other words, they will be pointing to the same memory location.
 * @param oldObj
 */
export function shallowCopy(oldObj) {
  const newObj = {};
  for(var i in oldObj) {
      if(oldObj.hasOwnProperty(i)) {
          newObj[i] = oldObj[i];
      }
  }
  return newObj;
}

// full credit to: http://geniuscarrier.com/copy-object-in-javascript/
/**
 * Deep copy duplicates everything, and allocates memory in a different location.
 * @param oldObj
 */
export function deepCopy(oldObj) {
  let newObj = oldObj;
  if (oldObj && typeof oldObj === 'object') {
      newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
      for (let i in oldObj) {
          newObj[i] = deepCopy(oldObj[i]);
      }
  }
  return newObj;
}

/**
 * Return the desired property from an object if found
 * @param obj target Object
 * @param path path to the desired property with . notation i.e: 'path.to.object'
 */
export function getProperty(obj: any, path: string): any {
  if(/^([A-Za-z\d]+\.?)*$/.test(path)) {
    let pathParts = path.split('.');
    if(obj.hasOwnProperty(pathParts[0])) {
      if(pathParts.length === 1) {
        return obj[pathParts[0]];
      } else {
        return getProperty(obj, pathParts.slice(1).join('.'));
      }
    }
  }
  return void 0;
}

export class ThemingUtil {

    /**
     * Returns the color and its lighter and darker versions [color, lighter, darker]
     * @param color
     */
    static getColorsFromBase(color: string): [string, string, string, string] {
        return [
                ThemingUtil.getColorString(color),
                ThemingUtil.getColorString(getBrighterColor(color, BRIGHTEN_K)),
                ThemingUtil.getColorString(getDarkerColor(color, DARKENING_K)),
                ThemingUtil.getColorString(getBrighterColor(color, BRIGHTEN_HOVER_K)),
            ];
    }

    /**
     * Returns the colors [default, lighten, darken, hover] for a color that is considered 'bright'.
     * @param color
     */
    static getColorsFromLightColor(color: string): [string, string, string, string] {
        return [
            ThemingUtil.getColorString(color),
            ThemingUtil.getColorString(getDarkerColor(color, LIGHT_LIGHTEN_K)),
            ThemingUtil.getColorString(getDarkerColor(color, LIGHT_DARKEN_K)),
            ThemingUtil.getColorString(getDarkerColor(color, LIGHT_HOVER_K)),
        ];
    }

    /**
     * Get hex value from a color string either if it comes in #FFFFFF or 255, 255, 255 notation
     * @param hexColor
     */
    static getColorString(hexColor: string): string {
        const dColor = rgb(hexColor);
        return `${ dColor.r },${ dColor.g },${ dColor.b }`;
    }

    /**
     * Get a random hex color
     */
    static getRandomHex(): string {
        return ThemingUtil.getHexValueFromColor(
            `${ Math.floor(Math.random() * 255) },${ Math.floor(Math.random() * 255) },${ Math.floor(Math.random() * 255) }`
        );
    }

    /**
     * Generic method to get custom properties
     * @param elementRef elementRef element where custom properties will be retrieved from
     * @param customProperties list of properties to get
     */
    static getCustomProperties(elementRef: ElementRef, customProperties: string[]) {
        const styles = getComputedStyle(elementRef.nativeElement);
        return customProperties.map((propertyName: string) => {
            return styles.getPropertyValue(propertyName);
        });
    }

    /**
     * Generic method to set custom properties
     * @param elementRef elementRef element where custom properties will be set to
     * @param customProperties dictionary of properties to set
     */
    static setCustomProperties(elementRef: ElementRef, customProperties: { [k: string]: any }): void {
        Object.keys(customProperties).forEach((propertyKey: string) => {
            elementRef.nativeElement.style.setProperty(propertyKey, customProperties[propertyKey]);
        });
    }

    /**
     * Set css custom properties based on a palette name and values and onto and onto an ElementRef styles
     * @param elementRef element where custom properties will be set
     * @param paletteValues color values
     * @param paletteName name of the palette to set
     * @param options custom to set if needed
     */
    static setPaletteCustomProperties(elementRef: ElementRef, paletteValues: PaletteValues | string, paletteName: Palettes,
        options?: ThemingExtraOptions) {
        options = { ...DEFAULT_THEMING_EXTRA_OPTIONS, ...options };
        if (!paletteValues) console.error(this, `paletteValues should be <string | PaletteValues>`, paletteValues);
        const defaultColor = (typeof paletteValues === 'string') ?
            ThemingUtil.getHexValueFromColor(paletteValues) : ThemingUtil.getHexValueFromColor(paletteValues.default);
        const autoColors: [string, string, string, string] = options.autoAdjust && ThemingUtil.getIsBright(defaultColor, options.brightnessFactor)
            ? ThemingUtil.getColorsFromLightColor(defaultColor) : ThemingUtil.getColorsFromBase(defaultColor);
        const autoContrasts = autoColors.map(ThemingUtil.getHexValueFromColor).map(ThemingUtil.getForegroundColorW3C).map(ThemingUtil.getColorString);
        const customProperties: { [k: string]: any } = {};
        const paletteKeys = ThemingUtil.getPaletteCustomPropertiesNames(paletteName, false);
        paletteKeys.forEach((key: string, index: number) =>
            customProperties[paletteKeys[index]] = ((paletteValues as PaletteValues)[CommonPaletteValues[index]]) || autoColors[index]);
        if (AUTO_GENERATE_FOREGROUNDS) {
            const contrastKeys = ThemingUtil.getPaletteCustomPropertiesNames(paletteName, true);
            contrastKeys.forEach((key: string, index: number) =>
                customProperties[contrastKeys[index]] = getProperty(paletteValues, `contrast.${ contrastKeys[index] }`) || autoContrasts[index]);
        }
        ThemingUtil.setCustomProperties(elementRef, customProperties);
    }

    /**
     * Return custom property keys for a palette
     * @param contrast flag indicating to return contrast custom properties keys
     */
    static getPaletteCustomPropertiesNames(paletteName: string, contrast: boolean = false): [string, string, string, string] {
        const contrastModifier: string = !contrast ? '' : 'contrast-';
        return [
            `--${ paletteName }-palette-${ contrastModifier }default`,
            `--${ paletteName }-palette-${ contrastModifier }lighter`,
            `--${ paletteName }-palette-${ contrastModifier }darker`,
            `--${ paletteName }-palette-${ contrastModifier }hover`,
        ];
    }

    /**
     * Get hex color from either an hex or `r, g, b` string
     * @param color  hex or `r, g, b` string
     */
    static getHexValueFromColor(color: string): string {
        if (!color.includes('#')) {
            const colorRGB: number[] = color.replace(/\s/gi, '').split(',').map((val) => parseInt(val));
            color = rgb(colorRGB[0], colorRGB[1], colorRGB[2]).hex();
        }
        return color;
    }

    /**
     * AutoGenerate foreground color based on a background color
     * http://www.w3.org/TR/AERT#color-contrast
     * @param backgroundColor background color from which the foreground color will be calculated
     */
    static getForegroundColorW3C(backgroundColor: string): string {
        return ThemingUtil.getIsBright(backgroundColor, FOREGROUND_COLORS_BRIGHT_FACTOR) ?  '#000000' : '#FFFFFF';
    }

    /**
     * Resolve if color is bright (otherwise is dark)
     * http://www.w3.org/TR/AERT#color-contrast
     * @param color value to check if bright or dark should be applied
     * @param brightFactor value from 0 to 255 that specifies the limit where this color is considered 'Bright'
     */
    static getIsBright(color: string, brightFactor: number): boolean {
        const dColor = rgb(color);
        const o = Math.round(((dColor.r * 299) + (dColor.g * 587) + (dColor.b * 114)) / 1000);
        return o > brightFactor;
    }
}

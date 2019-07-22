import { ElementRef } from '@angular/core';
import { color as d3Color, hsl, rgb } from 'd3-color';
import { AUTO_GENERATE_FOREGROUNDS, CommonPaletteValues as CommonPaletteValuesEnum, Palettes, PaletteValues, ThemingExtraOptions, LOW_GAMME_ADJUST_COEFICIENT, RED_COEFICIENT, GREEN_COEFICIENT, BLUE_COEFICIENT, GRADIENTS, DEFAULT_GRADIENT_INDEX, GRADIENTS_K } from './definitions';

const CommonPaletteValues: string[] = Object.values(CommonPaletteValuesEnum);
const blackColor = '#000000';
const whiteColor = '#FFFFFF';

/**
 * Returns a new color brighter depending on k
 * @param color hex color (e.g.: #FFFFFF)
 * @param k (from 0 to 1)
 */
export function getDarkerColor(color: string, k: number): string {
  try {
    const newColor = hsl(color);
    newColor.l -= newColor.l * k;
    return newColor;
  } catch (error) {
    console.warn('d3-color', 'darker', `Wrong color ${color} provided`);
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
    // return d3Color(color).brighter(k).hex();
    const newColor = hsl(color);
    newColor.l = ((1 - newColor.l) * k) + newColor.l;
    return newColor
  } catch (error) {
    console.warn('d3-color', 'brighter', `Wrong color ${color} provided`);
    return color;
  }
}

/**
 * Generate random hex color
 */
export function generateRandomHexColor(): string {
  return ThemingUtil.getHexValueFromColor(`${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}`);
}

// full credit to: http://geniuscarrier.com/copy-object-in-javascript/
/**
 * Shallow copy keeps references to original objects, arrays or functions within the new object,
 * so the "copy" is still linked to the original object. In other words, they will be pointing to the same memory location.
 * @param oldObj
 */
export function shallowCopy(oldObj) {
  const newObj = {};
  for (var i in oldObj) {
    if (oldObj.hasOwnProperty(i)) {
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
  if (/^([A-Za-z\d]+\.?)*$/.test(path)) {
    let pathParts = path.split('.');
    if (obj.hasOwnProperty(pathParts[0])) {
      if (pathParts.length === 1) {
        return obj[pathParts[0]];
      } else {
        return getProperty(obj, pathParts.slice(1).join('.'));
      }
    }
  }
  return void 0;
}

function adjustGamma(_) {
  return Math.pow((_ + 0.055) / 1.055, 2.4);
}

/**
 * Given a 3-element array of R, G, B varying from 0 to 255, return the luminance
 * as a number from 0 to 1.
 * Many thanks to: https://github.com/tmcw/relative-luminance
 * @param color hexadecimal color
 * @returns luminance, between 0 and 1
 */
export function relativeLuminance(color: string): number {
  const rgbColor = rgb(color);
  const rsrgb = rgbColor.r / 255;
  const gsrgb = rgbColor.g / 255;
  const bsrgb = rgbColor.b / 255;

  const r = rsrgb <= 0.03928 ? rsrgb * LOW_GAMME_ADJUST_COEFICIENT : adjustGamma(rsrgb);
  const g = gsrgb <= 0.03928 ? gsrgb * LOW_GAMME_ADJUST_COEFICIENT : adjustGamma(gsrgb);
  const b = bsrgb <= 0.03928 ? bsrgb * LOW_GAMME_ADJUST_COEFICIENT : adjustGamma(bsrgb);

  return r * RED_COEFICIENT + g * GREEN_COEFICIENT + b * BLUE_COEFICIENT;
}

/**
 * Get the contrast ratio between two relative luminance values
 * Many thanks to: https://github.com/tmcw/wcag-contrast
 * @param a luminance value
 * @param b luminance value
 * @returns contrast ratio
 * @example
 * luminance(1, 1); // = 1
 */
export function luminance(a, b): number {
  const l1 = Math.max(a, b);
  const l2 = Math.min(a, b);
  return (l1 + 0.05) / (l2 + 0.05);
}

/**
 * Returns the contrast ratio given to colors in hexadecimal
 * Many thanks to: https://github.com/tmcw/wcag-contrast
 * @param a string hex color a
 * @param b string hex color b
 */
export function contrastRatioCheck(a, b) {
  return luminance(relativeLuminance(a), relativeLuminance(b));
}

// @dynamic
export class ThemingUtil {

  /**
   * Returns the color and its lighter and darker versions [color, lighter, darker]
   * @param color
   */
  static getColorsFromBase(color: string): string[] {
    return GRADIENTS.map((gradient, index) => {
      if (index < DEFAULT_GRADIENT_INDEX) {
        return ThemingUtil.getColorString(getBrighterColor(color, GRADIENTS_K[gradient]));
      }
      if (index === DEFAULT_GRADIENT_INDEX) {
        return ThemingUtil.getColorString(color);
      }
      if (index > DEFAULT_GRADIENT_INDEX) {
        return ThemingUtil.getColorString(getDarkerColor(color, GRADIENTS_K[gradient]));
      }
    });
  }

  /**
   * Get hex value from a color string either if it comes in #FFFFFF or 255, 255, 255 notation
   * @param hexColor
   */
  static getColorString(hexColor: string): string {
    const dColor = rgb(hexColor);
    return `${dColor.r},${dColor.g},${dColor.b}`;
  }

  /**
   * Generic method to get custom properties
   * @param elementRef elementRef element where custom properties will be retrieved from
   * @param customProperties list of properties to get
   */
  static getCustomProperties(elementRef: ElementRef, customProperties: string[]): PaletteValues {
    const styles = getComputedStyle(elementRef.nativeElement);
    const result: PaletteValues = {} as PaletteValues;
    customProperties.forEach((propertyName: string) => {
      result[propertyName] = styles.getPropertyValue(propertyName);
    });
    return result;
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
   * @param paletteName name of theGRADIENTS_K palette to set
   * @param options custom to set if needed
   */
  static setPaletteCustomProperties(elementRef: ElementRef, paletteValues: PaletteValues | string, paletteName: Palettes,
    options?: ThemingExtraOptions) {

    if (!paletteValues) console.error(this, `paletteValues should be <string | PaletteValues>`, paletteValues);

    const defaultColor = (typeof paletteValues === 'string') ?
      ThemingUtil.getHexValueFromColor(paletteValues) : ThemingUtil.getHexValueFromColor(paletteValues[GRADIENTS[DEFAULT_GRADIENT_INDEX]]);
    const autoColors: string[] = ThemingUtil.getColorsFromBase(defaultColor);
    if (paletteValues instanceof Object) {
      Object.keys(paletteValues).forEach((key) => {
        if (key !== 'contrast') autoColors[ThemingUtil.findGradientIndex(key)] = ThemingUtil.getColorString(paletteValues[key]);
      });
    }
    let autoContrasts = autoColors.map(ThemingUtil.getHexValueFromColor)
      .map((c, index) => ThemingUtil.getForegroundColorW3C(c, options.contrastRatio, `${Object.keys(GRADIENTS_K)[index]}@${paletteName}`))
      .map(ThemingUtil.getColorString);

    if (paletteValues instanceof Object && paletteValues.hasOwnProperty('contrast')) {
      Object.keys(paletteValues.contrast).forEach((key) => {
        autoContrasts[ThemingUtil.findGradientIndex(key)] = ThemingUtil.getColorString(paletteValues.contrast[key]);
      });
    }
    const customProperties: { [k: string]: any } = {};
    const paletteKeys = ThemingUtil.getPaletteCustomPropertiesNames(paletteName, false);
    paletteKeys.forEach((key: string, index: number) =>
      customProperties[paletteKeys[index]] = ((paletteValues as PaletteValues)[CommonPaletteValues[index]]) || autoColors[index]);
    if (AUTO_GENERATE_FOREGROUNDS) {
      const contrastKeys = ThemingUtil.getPaletteCustomPropertiesNames(paletteName, true);
      contrastKeys.forEach((key: string, index: number) =>
        customProperties[contrastKeys[index]] = getProperty(paletteValues, `foreground.${contrastKeys[index]}`) || autoContrasts[index]);
    }
    ThemingUtil.setCustomProperties(elementRef, customProperties);
  }

  /**
   * Returns the index position for this gradient in the palette gradients
   * @param gradientKey key for the desired gradient to find
   */
  static findGradientIndex(gradientKey: string) {
    return Object.keys(GRADIENTS_K).indexOf(gradientKey);
  }

  /**
   * Return custom property keys for a palette
   * @param foreground flag indicating to return foreground custom properties keys
   */
  static getPaletteCustomPropertiesNames(paletteName: string, foreground: boolean = false): string[] {
    const contrastModifier: string = !foreground ? '' : '-foreground';

    return GRADIENTS.map((gradient, index) => {
      return `--${paletteName}-palette-${gradient}${contrastModifier}`;
    });
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
   * http://www.w3.org/TR/AERT#color-foreground
   * @param backgroundColor background color from which the foreground color will be calculated
   */
  static getForegroundColorW3C(backgroundColor: string, contrastRatio: number = 4.5, identifier: string = ''): string {
    const blackContrastCheck = contrastRatioCheck(backgroundColor, blackColor);
    const whiteContrastCheck = contrastRatioCheck(backgroundColor, whiteColor);
    if (whiteContrastCheck < contrastRatio && blackContrastCheck < contrastRatio) {
      console.warn(`ForegroundColor for "${backgroundColor}" ${identifier} did not meet contrastRatio requirements B/W - ${blackContrastCheck}/${whiteContrastCheck}`);
    }
    return (whiteContrastCheck > contrastRatio) ? whiteColor :
      whiteContrastCheck > blackContrastCheck ? whiteColor : blackColor;
  }

}

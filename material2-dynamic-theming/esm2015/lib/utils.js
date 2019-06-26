/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { color as d3Color, rgb } from 'd3-color';
// import { getProperty } from '../../../utils/object.utils';
import { AUTO_GENERATE_FOREGROUNDS, CommonPaletteValues as CommonPaletteValuesEnum, DEFAULT_THEMING_EXTRA_OPTIONS, FOREGROUND_COLORS_BRIGHT_FACTOR, OPACITY_FACTOR } from './definitions';
/** @type {?} */
export const DARKENING_K = OPACITY_FACTOR;
/** @type {?} */
export const BRIGHTEN_K = OPACITY_FACTOR;
/** @type {?} */
export const BRIGHTEN_HOVER_K = 1;
/** @type {?} */
export const LIGHT_LIGHTEN_K = .9;
/** @type {?} */
export const LIGHT_DARKEN_K = .7;
/** @type {?} */
export const LIGHT_HOVER_K = .5;
/** @type {?} */
const CommonPaletteValues = Object.values(CommonPaletteValuesEnum);
/**
 * Returns a solid color that is the resulting of adding opacity to <color> and having a <background> beneath it
 * @param {?} color hex value color
 * @param {?} background hex value background color
 * @param {?} opacity 0 to 1 opacity value
 * @return {?}
 */
export function getSolidColorFromOpacityBackground(color, background, opacity) {
    /** @type {?} */
    const delta = 1 - opacity;
    /** @type {?} */
    const dColor = d3Color(color).rgb();
    /** @type {?} */
    const dBackgroundColor = d3Color(background).rgb();
    return rgb(Math.round(dColor.r + ((dBackgroundColor.r - dColor.r) * delta)), Math.round(dColor.g + ((dBackgroundColor.g - dColor.g) * delta)), Math.round(dColor.b + ((dBackgroundColor.b - dColor.b) * delta))).hex();
}
/**
 * Returns a new color brighter depending on k
 * @param {?} color hex color (e.g.: #FFFFFF)
 * @param {?} k (from 0 to 1)
 * @return {?}
 */
export function getDarkerColor(color, k) {
    try {
        return getSolidColorFromOpacityBackground(color, '#000000', k);
    }
    catch (error) {
        console.warn('d3-color', 'darker', `Wrong color ${color} provided`);
        return color;
    }
}
/**
 * Returns a new color brighter depending on k
 * @param {?} color hex color (e.g.: #FFFFFF)
 * @param {?} k (from 0 to 1)
 * @return {?}
 */
export function getBrighterColor(color, k) {
    try {
        return getSolidColorFromOpacityBackground(color, '#FFFFFF', k);
    }
    catch (error) {
        console.warn('d3-color', 'brighter', `Wrong color ${color} provided`);
        return color;
    }
}
// full credit to: http://geniuscarrier.com/copy-object-in-javascript/
/**
 * Shallow copy keeps references to original objects, arrays or functions within the new object,
 * so the "copy" is still linked to the original object. In other words, they will be pointing to the same memory location.
 * @param {?} oldObj
 * @return {?}
 */
export function shallowCopy(oldObj) {
    /** @type {?} */
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
 * @param {?} oldObj
 * @return {?}
 */
export function deepCopy(oldObj) {
    /** @type {?} */
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
 * @param {?} obj target Object
 * @param {?} path path to the desired property with . notation i.e: 'path.to.object'
 * @return {?}
 */
export function getProperty(obj, path) {
    if (/^([A-Za-z\d]+\.?)*$/.test(path)) {
        /** @type {?} */
        let pathParts = path.split('.');
        if (obj.hasOwnProperty(pathParts[0])) {
            if (pathParts.length === 1) {
                return obj[pathParts[0]];
            }
            else {
                return getProperty(obj, pathParts.slice(1).join('.'));
            }
        }
    }
    return void 0;
}
export class ThemingUtil {
    /**
     * Returns the color and its lighter and darker versions [color, lighter, darker]
     * @param {?} color
     * @return {?}
     */
    static getColorsFromBase(color) {
        return [
            ThemingUtil.getColorString(color),
            ThemingUtil.getColorString(getBrighterColor(color, BRIGHTEN_K)),
            ThemingUtil.getColorString(getDarkerColor(color, DARKENING_K)),
            ThemingUtil.getColorString(getBrighterColor(color, BRIGHTEN_HOVER_K)),
        ];
    }
    /**
     * Returns the colors [default, lighten, darken, hover] for a color that is considered 'bright'.
     * @param {?} color
     * @return {?}
     */
    static getColorsFromLightColor(color) {
        return [
            ThemingUtil.getColorString(color),
            ThemingUtil.getColorString(getDarkerColor(color, LIGHT_LIGHTEN_K)),
            ThemingUtil.getColorString(getDarkerColor(color, LIGHT_DARKEN_K)),
            ThemingUtil.getColorString(getDarkerColor(color, LIGHT_HOVER_K)),
        ];
    }
    /**
     * Get hex value from a color string either if it comes in #FFFFFF or 255, 255, 255 notation
     * @param {?} hexColor
     * @return {?}
     */
    static getColorString(hexColor) {
        /** @type {?} */
        const dColor = rgb(hexColor);
        return `${dColor.r},${dColor.g},${dColor.b}`;
    }
    /**
     * Get a random hex color
     * @return {?}
     */
    static getRandomHex() {
        return ThemingUtil.getHexValueFromColor(`${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)}`);
    }
    /**
     * Generic method to get custom properties
     * @param {?} elementRef elementRef element where custom properties will be retrieved from
     * @param {?} customProperties list of properties to get
     * @return {?}
     */
    static getCustomProperties(elementRef, customProperties) {
        /** @type {?} */
        const styles = getComputedStyle(elementRef.nativeElement);
        return customProperties.map((/**
         * @param {?} propertyName
         * @return {?}
         */
        (propertyName) => {
            return styles.getPropertyValue(propertyName);
        }));
    }
    /**
     * Generic method to set custom properties
     * @param {?} elementRef elementRef element where custom properties will be set to
     * @param {?} customProperties dictionary of properties to set
     * @return {?}
     */
    static setCustomProperties(elementRef, customProperties) {
        Object.keys(customProperties).forEach((/**
         * @param {?} propertyKey
         * @return {?}
         */
        (propertyKey) => {
            elementRef.nativeElement.style.setProperty(propertyKey, customProperties[propertyKey]);
        }));
    }
    /**
     * Set css custom properties based on a palette name and values and onto and onto an ElementRef styles
     * @param {?} elementRef element where custom properties will be set
     * @param {?} paletteValues color values
     * @param {?} paletteName name of the palette to set
     * @param {?=} options custom to set if needed
     * @return {?}
     */
    static setPaletteCustomProperties(elementRef, paletteValues, paletteName, options) {
        options = Object.assign({}, DEFAULT_THEMING_EXTRA_OPTIONS, options);
        if (!paletteValues)
            console.error(this, `paletteValues should be <string | PaletteValues>`, paletteValues);
        /** @type {?} */
        const defaultColor = (typeof paletteValues === 'string') ?
            ThemingUtil.getHexValueFromColor(paletteValues) : ThemingUtil.getHexValueFromColor(paletteValues.default);
        /** @type {?} */
        const autoColors = options.autoAdjust && ThemingUtil.getIsBright(defaultColor, options.brightnessFactor)
            ? ThemingUtil.getColorsFromLightColor(defaultColor) : ThemingUtil.getColorsFromBase(defaultColor);
        /** @type {?} */
        const autoContrasts = autoColors.map(ThemingUtil.getHexValueFromColor).map(ThemingUtil.getForegroundColorW3C).map(ThemingUtil.getColorString);
        /** @type {?} */
        const customProperties = {};
        /** @type {?} */
        const paletteKeys = ThemingUtil.getPaletteCustomPropertiesNames(paletteName, false);
        paletteKeys.forEach((/**
         * @param {?} key
         * @param {?} index
         * @return {?}
         */
        (key, index) => customProperties[paletteKeys[index]] = (((/** @type {?} */ (paletteValues)))[CommonPaletteValues[index]]) || autoColors[index]));
        if (AUTO_GENERATE_FOREGROUNDS) {
            /** @type {?} */
            const contrastKeys = ThemingUtil.getPaletteCustomPropertiesNames(paletteName, true);
            contrastKeys.forEach((/**
             * @param {?} key
             * @param {?} index
             * @return {?}
             */
            (key, index) => customProperties[contrastKeys[index]] = getProperty(paletteValues, `contrast.${contrastKeys[index]}`) || autoContrasts[index]));
        }
        ThemingUtil.setCustomProperties(elementRef, customProperties);
    }
    /**
     * Return custom property keys for a palette
     * @param {?} paletteName
     * @param {?=} contrast flag indicating to return contrast custom properties keys
     * @return {?}
     */
    static getPaletteCustomPropertiesNames(paletteName, contrast = false) {
        /** @type {?} */
        const contrastModifier = !contrast ? '' : 'contrast-';
        return [
            `--${paletteName}-palette-${contrastModifier}default`,
            `--${paletteName}-palette-${contrastModifier}lighter`,
            `--${paletteName}-palette-${contrastModifier}darker`,
            `--${paletteName}-palette-${contrastModifier}hover`,
        ];
    }
    /**
     * Get hex color from either an hex or `r, g, b` string
     * @param {?} color  hex or `r, g, b` string
     * @return {?}
     */
    static getHexValueFromColor(color) {
        if (!color.includes('#')) {
            /** @type {?} */
            const colorRGB = color.replace(/\s/gi, '').split(',').map((/**
             * @param {?} val
             * @return {?}
             */
            (val) => parseInt(val)));
            color = rgb(colorRGB[0], colorRGB[1], colorRGB[2]).hex();
        }
        return color;
    }
    /**
     * AutoGenerate foreground color based on a background color
     * http://www.w3.org/TR/AERT#color-contrast
     * @param {?} backgroundColor background color from which the foreground color will be calculated
     * @return {?}
     */
    static getForegroundColorW3C(backgroundColor) {
        return ThemingUtil.getIsBright(backgroundColor, FOREGROUND_COLORS_BRIGHT_FACTOR) ? '#000000' : '#FFFFFF';
    }
    /**
     * Resolve if color is bright (otherwise is dark)
     * http://www.w3.org/TR/AERT#color-contrast
     * @param {?} color value to check if bright or dark should be applied
     * @param {?} brightFactor value from 0 to 255 that specifies the limit where this color is considered 'Bright'
     * @return {?}
     */
    static getIsBright(color, brightFactor) {
        /** @type {?} */
        const dColor = rgb(color);
        /** @type {?} */
        const o = Math.round(((dColor.r * 299) + (dColor.g * 587) + (dColor.b * 114)) / 1000);
        return o > brightFactor;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXRlcmlhbDItZHluYW1pYy10aGVtaW5nLyIsInNvdXJjZXMiOlsibGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsS0FBSyxJQUFJLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxVQUFVLENBQUM7O0FBRWpELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxtQkFBbUIsSUFBSSx1QkFBdUIsRUFBRSw2QkFBNkIsRUFBRSwrQkFBK0IsRUFBRSxjQUFjLEVBQWdELE1BQU0sZUFBZSxDQUFDOztBQUV4TyxNQUFNLE9BQU8sV0FBVyxHQUFXLGNBQWM7O0FBQ2pELE1BQU0sT0FBTyxVQUFVLEdBQVcsY0FBYzs7QUFDaEQsTUFBTSxPQUFPLGdCQUFnQixHQUFXLENBQUM7O0FBQ3pDLE1BQU0sT0FBTyxlQUFlLEdBQVcsRUFBRTs7QUFDekMsTUFBTSxPQUFPLGNBQWMsR0FBVyxFQUFFOztBQUN4QyxNQUFNLE9BQU8sYUFBYSxHQUFXLEVBQUU7O01BRWpDLG1CQUFtQixHQUFhLE1BQU0sQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUM7Ozs7Ozs7O0FBUTVFLE1BQU0sVUFBVSxrQ0FBa0MsQ0FBQyxLQUFhLEVBQUUsVUFBa0IsRUFBRSxPQUFlOztVQUMzRixLQUFLLEdBQVcsQ0FBQyxHQUFHLE9BQU87O1VBQzNCLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFOztVQUM3QixnQkFBZ0IsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ2xELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUN2RSxJQUFJLENBQUMsS0FBSyxDQUFDLE1B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LEVBQUUsK0JBQStCLENBQUMsQ0FBQyxDQUFDLENBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDOUcsQ0FBQzs7Ozs7Ozs7SUFRRCxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQWEsRUFBRSxZQUFvQjs7Y0FDNUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7O2NBQ25CLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDckYsT0FBTyxDQUFDLEdBQUcsWUFBWSxDQUFDO0lBQzVCLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbG9yIGFzIGQzQ29sb3IsIHJnYiB9IGZyb20gJ2QzLWNvbG9yJztcbi8vIGltcG9ydCB7IGdldFByb3BlcnR5IH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvb2JqZWN0LnV0aWxzJztcbmltcG9ydCB7IEFVVE9fR0VORVJBVEVfRk9SRUdST1VORFMsIENvbW1vblBhbGV0dGVWYWx1ZXMgYXMgQ29tbW9uUGFsZXR0ZVZhbHVlc0VudW0sIERFRkFVTFRfVEhFTUlOR19FWFRSQV9PUFRJT05TLCBGT1JFR1JPVU5EX0NPTE9SU19CUklHSFRfRkFDVE9SLCBPUEFDSVRZX0ZBQ1RPUiwgUGFsZXR0ZXMsIFBhbGV0dGVWYWx1ZXMsIFRoZW1pbmdFeHRyYU9wdGlvbnMgfSBmcm9tICcuL2RlZmluaXRpb25zJztcblxuZXhwb3J0IGNvbnN0IERBUktFTklOR19LOiBudW1iZXIgPSBPUEFDSVRZX0ZBQ1RPUjtcbmV4cG9ydCBjb25zdCBCUklHSFRFTl9LOiBudW1iZXIgPSBPUEFDSVRZX0ZBQ1RPUjtcbmV4cG9ydCBjb25zdCBCUklHSFRFTl9IT1ZFUl9LOiBudW1iZXIgPSAxO1xuZXhwb3J0IGNvbnN0IExJR0hUX0xJR0hURU5fSzogbnVtYmVyID0gLjk7XG5leHBvcnQgY29uc3QgTElHSFRfREFSS0VOX0s6IG51bWJlciA9IC43O1xuZXhwb3J0IGNvbnN0IExJR0hUX0hPVkVSX0s6IG51bWJlciA9IC41O1xuXG5jb25zdCBDb21tb25QYWxldHRlVmFsdWVzOiBzdHJpbmdbXSA9IE9iamVjdC52YWx1ZXMoQ29tbW9uUGFsZXR0ZVZhbHVlc0VudW0pO1xuXG4vKipcbiAqIFJldHVybnMgYSBzb2xpZCBjb2xvciB0aGF0IGlzIHRoZSByZXN1bHRpbmcgb2YgYWRkaW5nIG9wYWNpdHkgdG8gPGNvbG9yPiBhbmQgaGF2aW5nIGEgPGJhY2tncm91bmQ+IGJlbmVhdGggaXRcbiAqIEBwYXJhbSBjb2xvciBoZXggdmFsdWUgY29sb3JcbiAqIEBwYXJhbSBiYWNrZ3JvdW5kIGhleCB2YWx1ZSBiYWNrZ3JvdW5kIGNvbG9yXG4gKiBAcGFyYW0gb3BhY2l0eSAwIHRvIDEgb3BhY2l0eSB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U29saWRDb2xvckZyb21PcGFjaXR5QmFja2dyb3VuZChjb2xvcjogc3RyaW5nLCBiYWNrZ3JvdW5kOiBzdHJpbmcsIG9wYWNpdHk6IG51bWJlcik6IHN0cmluZyB7XG4gICAgY29uc3QgZGVsdGE6IG51bWJlciA9IDEgLSBvcGFjaXR5O1xuICAgIGNvbnN0IGRDb2xvciA9IGQzQ29sb3IoY29sb3IpLnJnYigpO1xuICAgIGNvbnN0IGRCYWNrZ3JvdW5kQ29sb3IgPSBkM0NvbG9yKGJhY2tncm91bmQpLnJnYigpO1xuICAgIHJldHVybiByZ2IoTWF0aC5yb3VuZChkQ29sb3IuciArICgoZEJhY2tncm91bmRDb2xvci5yIC0gZENvbG9yLnIpICogZGVsdGEpKSxcbiAgICAgICAgTWF0aC5yb3VuZChkQ29sb3IuZyArICgoZEJhY2tncm91bmRDb2xvci5nIC0gZENvbG9yLmcpICogZGVsdGEpKSxcbiAgICAgICAgTWF0aC5yb3VuZChkQ29sb3IuYiArICgoZEJhY2tncm91bmRDb2xvci5iIC0gZENvbG9yLmIpICogZGVsdGEpKSkuaGV4KCk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBjb2xvciBicmlnaHRlciBkZXBlbmRpbmcgb24ga1xuICogQHBhcmFtIGNvbG9yIGhleCBjb2xvciAoZS5nLjogI0ZGRkZGRilcbiAqIEBwYXJhbSBrIChmcm9tIDAgdG8gMSlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERhcmtlckNvbG9yKGNvbG9yOiBzdHJpbmcsIGs6IG51bWJlcik6IHN0cmluZyB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGdldFNvbGlkQ29sb3JGcm9tT3BhY2l0eUJhY2tncm91bmQoY29sb3IsICcjMDAwMDAwJywgayk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdkMy1jb2xvcicsICdkYXJrZXInLCBgV3JvbmcgY29sb3IgJHsgY29sb3IgfSBwcm92aWRlZGApO1xuICAgICAgICByZXR1cm4gY29sb3I7XG4gICAgfVxufVxuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgY29sb3IgYnJpZ2h0ZXIgZGVwZW5kaW5nIG9uIGtcbiAqIEBwYXJhbSBjb2xvciBoZXggY29sb3IgKGUuZy46ICNGRkZGRkYpXG4gKiBAcGFyYW0gayAoZnJvbSAwIHRvIDEpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRCcmlnaHRlckNvbG9yKGNvbG9yOiBzdHJpbmcsIGs6IG51bWJlcik6IHN0cmluZyB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGdldFNvbGlkQ29sb3JGcm9tT3BhY2l0eUJhY2tncm91bmQoY29sb3IsICcjRkZGRkZGJywgayk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdkMy1jb2xvcicsICdicmlnaHRlcicsIGBXcm9uZyBjb2xvciAkeyBjb2xvciB9IHByb3ZpZGVkYCk7XG4gICAgICAgIHJldHVybiBjb2xvcjtcbiAgICB9XG59XG5cbi8vIGZ1bGwgY3JlZGl0IHRvOiBodHRwOi8vZ2VuaXVzY2Fycmllci5jb20vY29weS1vYmplY3QtaW4tamF2YXNjcmlwdC9cbi8qKlxuICogU2hhbGxvdyBjb3B5IGtlZXBzIHJlZmVyZW5jZXMgdG8gb3JpZ2luYWwgb2JqZWN0cywgYXJyYXlzIG9yIGZ1bmN0aW9ucyB3aXRoaW4gdGhlIG5ldyBvYmplY3QsXG4gKiBzbyB0aGUgXCJjb3B5XCIgaXMgc3RpbGwgbGlua2VkIHRvIHRoZSBvcmlnaW5hbCBvYmplY3QuIEluIG90aGVyIHdvcmRzLCB0aGV5IHdpbGwgYmUgcG9pbnRpbmcgdG8gdGhlIHNhbWUgbWVtb3J5IGxvY2F0aW9uLlxuICogQHBhcmFtIG9sZE9ialxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hhbGxvd0NvcHkob2xkT2JqKSB7XG4gIGNvbnN0IG5ld09iaiA9IHt9O1xuICBmb3IodmFyIGkgaW4gb2xkT2JqKSB7XG4gICAgICBpZihvbGRPYmouaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICBuZXdPYmpbaV0gPSBvbGRPYmpbaV07XG4gICAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld09iajtcbn1cblxuLy8gZnVsbCBjcmVkaXQgdG86IGh0dHA6Ly9nZW5pdXNjYXJyaWVyLmNvbS9jb3B5LW9iamVjdC1pbi1qYXZhc2NyaXB0L1xuLyoqXG4gKiBEZWVwIGNvcHkgZHVwbGljYXRlcyBldmVyeXRoaW5nLCBhbmQgYWxsb2NhdGVzIG1lbW9yeSBpbiBhIGRpZmZlcmVudCBsb2NhdGlvbi5cbiAqIEBwYXJhbSBvbGRPYmpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBDb3B5KG9sZE9iaikge1xuICBsZXQgbmV3T2JqID0gb2xkT2JqO1xuICBpZiAob2xkT2JqICYmIHR5cGVvZiBvbGRPYmogPT09ICdvYmplY3QnKSB7XG4gICAgICBuZXdPYmogPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2xkT2JqKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiID8gW10gOiB7fTtcbiAgICAgIGZvciAobGV0IGkgaW4gb2xkT2JqKSB7XG4gICAgICAgICAgbmV3T2JqW2ldID0gZGVlcENvcHkob2xkT2JqW2ldKTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gbmV3T2JqO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgZGVzaXJlZCBwcm9wZXJ0eSBmcm9tIGFuIG9iamVjdCBpZiBmb3VuZFxuICogQHBhcmFtIG9iaiB0YXJnZXQgT2JqZWN0XG4gKiBAcGFyYW0gcGF0aCBwYXRoIHRvIHRoZSBkZXNpcmVkIHByb3BlcnR5IHdpdGggLiBub3RhdGlvbiBpLmU6ICdwYXRoLnRvLm9iamVjdCdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3BlcnR5KG9iajogYW55LCBwYXRoOiBzdHJpbmcpOiBhbnkge1xuICBpZigvXihbQS1aYS16XFxkXStcXC4/KSokLy50ZXN0KHBhdGgpKSB7XG4gICAgbGV0IHBhdGhQYXJ0cyA9IHBhdGguc3BsaXQoJy4nKTtcbiAgICBpZihvYmouaGFzT3duUHJvcGVydHkocGF0aFBhcnRzWzBdKSkge1xuICAgICAgaWYocGF0aFBhcnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gb2JqW3BhdGhQYXJ0c1swXV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZ2V0UHJvcGVydHkob2JqLCBwYXRoUGFydHMuc2xpY2UoMSkuam9pbignLicpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZvaWQgMDtcbn1cblxuZXhwb3J0IGNsYXNzIFRoZW1pbmdVdGlsIHtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNvbG9yIGFuZCBpdHMgbGlnaHRlciBhbmQgZGFya2VyIHZlcnNpb25zIFtjb2xvciwgbGlnaHRlciwgZGFya2VyXVxuICAgICAqIEBwYXJhbSBjb2xvclxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRDb2xvcnNGcm9tQmFzZShjb2xvcjogc3RyaW5nKTogW3N0cmluZywgc3RyaW5nLCBzdHJpbmcsIHN0cmluZ10ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIFRoZW1pbmdVdGlsLmdldENvbG9yU3RyaW5nKGNvbG9yKSxcbiAgICAgICAgICAgICAgICBUaGVtaW5nVXRpbC5nZXRDb2xvclN0cmluZyhnZXRCcmlnaHRlckNvbG9yKGNvbG9yLCBCUklHSFRFTl9LKSksXG4gICAgICAgICAgICAgICAgVGhlbWluZ1V0aWwuZ2V0Q29sb3JTdHJpbmcoZ2V0RGFya2VyQ29sb3IoY29sb3IsIERBUktFTklOR19LKSksXG4gICAgICAgICAgICAgICAgVGhlbWluZ1V0aWwuZ2V0Q29sb3JTdHJpbmcoZ2V0QnJpZ2h0ZXJDb2xvcihjb2xvciwgQlJJR0hURU5fSE9WRVJfSykpLFxuICAgICAgICAgICAgXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjb2xvcnMgW2RlZmF1bHQsIGxpZ2h0ZW4sIGRhcmtlbiwgaG92ZXJdIGZvciBhIGNvbG9yIHRoYXQgaXMgY29uc2lkZXJlZCAnYnJpZ2h0Jy5cbiAgICAgKiBAcGFyYW0gY29sb3JcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q29sb3JzRnJvbUxpZ2h0Q29sb3IoY29sb3I6IHN0cmluZyk6IFtzdHJpbmcsIHN0cmluZywgc3RyaW5nLCBzdHJpbmddIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFRoZW1pbmdVdGlsLmdldENvbG9yU3RyaW5nKGNvbG9yKSxcbiAgICAgICAgICAgIFRoZW1pbmdVdGlsLmdldENvbG9yU3RyaW5nKGdldERhcmtlckNvbG9yKGNvbG9yLCBMSUdIVF9MSUdIVEVOX0spKSxcbiAgICAgICAgICAgIFRoZW1pbmdVdGlsLmdldENvbG9yU3RyaW5nKGdldERhcmtlckNvbG9yKGNvbG9yLCBMSUdIVF9EQVJLRU5fSykpLFxuICAgICAgICAgICAgVGhlbWluZ1V0aWwuZ2V0Q29sb3JTdHJpbmcoZ2V0RGFya2VyQ29sb3IoY29sb3IsIExJR0hUX0hPVkVSX0spKSxcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgaGV4IHZhbHVlIGZyb20gYSBjb2xvciBzdHJpbmcgZWl0aGVyIGlmIGl0IGNvbWVzIGluICNGRkZGRkYgb3IgMjU1LCAyNTUsIDI1NSBub3RhdGlvblxuICAgICAqIEBwYXJhbSBoZXhDb2xvclxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRDb2xvclN0cmluZyhoZXhDb2xvcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgZENvbG9yID0gcmdiKGhleENvbG9yKTtcbiAgICAgICAgcmV0dXJuIGAkeyBkQ29sb3IuciB9LCR7IGRDb2xvci5nIH0sJHsgZENvbG9yLmIgfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgcmFuZG9tIGhleCBjb2xvclxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRSYW5kb21IZXgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFRoZW1pbmdVdGlsLmdldEhleFZhbHVlRnJvbUNvbG9yKFxuICAgICAgICAgICAgYCR7IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NSkgfSwkeyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTUpIH0sJHsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KSB9YFxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyaWMgbWV0aG9kIHRvIGdldCBjdXN0b20gcHJvcGVydGllc1xuICAgICAqIEBwYXJhbSBlbGVtZW50UmVmIGVsZW1lbnRSZWYgZWxlbWVudCB3aGVyZSBjdXN0b20gcHJvcGVydGllcyB3aWxsIGJlIHJldHJpZXZlZCBmcm9tXG4gICAgICogQHBhcmFtIGN1c3RvbVByb3BlcnRpZXMgbGlzdCBvZiBwcm9wZXJ0aWVzIHRvIGdldFxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRDdXN0b21Qcm9wZXJ0aWVzKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIGN1c3RvbVByb3BlcnRpZXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIGN1c3RvbVByb3BlcnRpZXMubWFwKChwcm9wZXJ0eU5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5TmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyaWMgbWV0aG9kIHRvIHNldCBjdXN0b20gcHJvcGVydGllc1xuICAgICAqIEBwYXJhbSBlbGVtZW50UmVmIGVsZW1lbnRSZWYgZWxlbWVudCB3aGVyZSBjdXN0b20gcHJvcGVydGllcyB3aWxsIGJlIHNldCB0b1xuICAgICAqIEBwYXJhbSBjdXN0b21Qcm9wZXJ0aWVzIGRpY3Rpb25hcnkgb2YgcHJvcGVydGllcyB0byBzZXRcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0Q3VzdG9tUHJvcGVydGllcyhlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBjdXN0b21Qcm9wZXJ0aWVzOiB7IFtrOiBzdHJpbmddOiBhbnkgfSk6IHZvaWQge1xuICAgICAgICBPYmplY3Qua2V5cyhjdXN0b21Qcm9wZXJ0aWVzKS5mb3JFYWNoKChwcm9wZXJ0eUtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHlLZXksIGN1c3RvbVByb3BlcnRpZXNbcHJvcGVydHlLZXldKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGNzcyBjdXN0b20gcHJvcGVydGllcyBiYXNlZCBvbiBhIHBhbGV0dGUgbmFtZSBhbmQgdmFsdWVzIGFuZCBvbnRvIGFuZCBvbnRvIGFuIEVsZW1lbnRSZWYgc3R5bGVzXG4gICAgICogQHBhcmFtIGVsZW1lbnRSZWYgZWxlbWVudCB3aGVyZSBjdXN0b20gcHJvcGVydGllcyB3aWxsIGJlIHNldFxuICAgICAqIEBwYXJhbSBwYWxldHRlVmFsdWVzIGNvbG9yIHZhbHVlc1xuICAgICAqIEBwYXJhbSBwYWxldHRlTmFtZSBuYW1lIG9mIHRoZSBwYWxldHRlIHRvIHNldFxuICAgICAqIEBwYXJhbSBvcHRpb25zIGN1c3RvbSB0byBzZXQgaWYgbmVlZGVkXG4gICAgICovXG4gICAgc3RhdGljIHNldFBhbGV0dGVDdXN0b21Qcm9wZXJ0aWVzKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHBhbGV0dGVWYWx1ZXM6IFBhbGV0dGVWYWx1ZXMgfCBzdHJpbmcsIHBhbGV0dGVOYW1lOiBQYWxldHRlcyxcbiAgICAgICAgb3B0aW9ucz86IFRoZW1pbmdFeHRyYU9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IHsgLi4uREVGQVVMVF9USEVNSU5HX0VYVFJBX09QVElPTlMsIC4uLm9wdGlvbnMgfTtcbiAgICAgICAgaWYgKCFwYWxldHRlVmFsdWVzKSBjb25zb2xlLmVycm9yKHRoaXMsIGBwYWxldHRlVmFsdWVzIHNob3VsZCBiZSA8c3RyaW5nIHwgUGFsZXR0ZVZhbHVlcz5gLCBwYWxldHRlVmFsdWVzKTtcbiAgICAgICAgY29uc3QgZGVmYXVsdENvbG9yID0gKHR5cGVvZiBwYWxldHRlVmFsdWVzID09PSAnc3RyaW5nJykgP1xuICAgICAgICAgICAgVGhlbWluZ1V0aWwuZ2V0SGV4VmFsdWVGcm9tQ29sb3IocGFsZXR0ZVZhbHVlcykgOiBUaGVtaW5nVXRpbC5nZXRIZXhWYWx1ZUZyb21Db2xvcihwYWxldHRlVmFsdWVzLmRlZmF1bHQpO1xuICAgICAgICBjb25zdCBhdXRvQ29sb3JzOiBbc3RyaW5nLCBzdHJpbmcsIHN0cmluZywgc3RyaW5nXSA9IG9wdGlvbnMuYXV0b0FkanVzdCAmJiBUaGVtaW5nVXRpbC5nZXRJc0JyaWdodChkZWZhdWx0Q29sb3IsIG9wdGlvbnMuYnJpZ2h0bmVzc0ZhY3RvcilcbiAgICAgICAgICAgID8gVGhlbWluZ1V0aWwuZ2V0Q29sb3JzRnJvbUxpZ2h0Q29sb3IoZGVmYXVsdENvbG9yKSA6IFRoZW1pbmdVdGlsLmdldENvbG9yc0Zyb21CYXNlKGRlZmF1bHRDb2xvcik7XG4gICAgICAgIGNvbnN0IGF1dG9Db250cmFzdHMgPSBhdXRvQ29sb3JzLm1hcChUaGVtaW5nVXRpbC5nZXRIZXhWYWx1ZUZyb21Db2xvcikubWFwKFRoZW1pbmdVdGlsLmdldEZvcmVncm91bmRDb2xvclczQykubWFwKFRoZW1pbmdVdGlsLmdldENvbG9yU3RyaW5nKTtcbiAgICAgICAgY29uc3QgY3VzdG9tUHJvcGVydGllczogeyBbazogc3RyaW5nXTogYW55IH0gPSB7fTtcbiAgICAgICAgY29uc3QgcGFsZXR0ZUtleXMgPSBUaGVtaW5nVXRpbC5nZXRQYWxldHRlQ3VzdG9tUHJvcGVydGllc05hbWVzKHBhbGV0dGVOYW1lLCBmYWxzZSk7XG4gICAgICAgIHBhbGV0dGVLZXlzLmZvckVhY2goKGtleTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PlxuICAgICAgICAgICAgY3VzdG9tUHJvcGVydGllc1twYWxldHRlS2V5c1tpbmRleF1dID0gKChwYWxldHRlVmFsdWVzIGFzIFBhbGV0dGVWYWx1ZXMpW0NvbW1vblBhbGV0dGVWYWx1ZXNbaW5kZXhdXSkgfHwgYXV0b0NvbG9yc1tpbmRleF0pO1xuICAgICAgICBpZiAoQVVUT19HRU5FUkFURV9GT1JFR1JPVU5EUykge1xuICAgICAgICAgICAgY29uc3QgY29udHJhc3RLZXlzID0gVGhlbWluZ1V0aWwuZ2V0UGFsZXR0ZUN1c3RvbVByb3BlcnRpZXNOYW1lcyhwYWxldHRlTmFtZSwgdHJ1ZSk7XG4gICAgICAgICAgICBjb250cmFzdEtleXMuZm9yRWFjaCgoa2V5OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+XG4gICAgICAgICAgICAgICAgY3VzdG9tUHJvcGVydGllc1tjb250cmFzdEtleXNbaW5kZXhdXSA9IGdldFByb3BlcnR5KHBhbGV0dGVWYWx1ZXMsIGBjb250cmFzdC4keyBjb250cmFzdEtleXNbaW5kZXhdIH1gKSB8fCBhdXRvQ29udHJhc3RzW2luZGV4XSk7XG4gICAgICAgIH1cbiAgICAgICAgVGhlbWluZ1V0aWwuc2V0Q3VzdG9tUHJvcGVydGllcyhlbGVtZW50UmVmLCBjdXN0b21Qcm9wZXJ0aWVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gY3VzdG9tIHByb3BlcnR5IGtleXMgZm9yIGEgcGFsZXR0ZVxuICAgICAqIEBwYXJhbSBjb250cmFzdCBmbGFnIGluZGljYXRpbmcgdG8gcmV0dXJuIGNvbnRyYXN0IGN1c3RvbSBwcm9wZXJ0aWVzIGtleXNcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0UGFsZXR0ZUN1c3RvbVByb3BlcnRpZXNOYW1lcyhwYWxldHRlTmFtZTogc3RyaW5nLCBjb250cmFzdDogYm9vbGVhbiA9IGZhbHNlKTogW3N0cmluZywgc3RyaW5nLCBzdHJpbmcsIHN0cmluZ10ge1xuICAgICAgICBjb25zdCBjb250cmFzdE1vZGlmaWVyOiBzdHJpbmcgPSAhY29udHJhc3QgPyAnJyA6ICdjb250cmFzdC0nO1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgYC0tJHsgcGFsZXR0ZU5hbWUgfS1wYWxldHRlLSR7IGNvbnRyYXN0TW9kaWZpZXIgfWRlZmF1bHRgLFxuICAgICAgICAgICAgYC0tJHsgcGFsZXR0ZU5hbWUgfS1wYWxldHRlLSR7IGNvbnRyYXN0TW9kaWZpZXIgfWxpZ2h0ZXJgLFxuICAgICAgICAgICAgYC0tJHsgcGFsZXR0ZU5hbWUgfS1wYWxldHRlLSR7IGNvbnRyYXN0TW9kaWZpZXIgfWRhcmtlcmAsXG4gICAgICAgICAgICBgLS0keyBwYWxldHRlTmFtZSB9LXBhbGV0dGUtJHsgY29udHJhc3RNb2RpZmllciB9aG92ZXJgLFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBoZXggY29sb3IgZnJvbSBlaXRoZXIgYW4gaGV4IG9yIGByLCBnLCBiYCBzdHJpbmdcbiAgICAgKiBAcGFyYW0gY29sb3IgIGhleCBvciBgciwgZywgYmAgc3RyaW5nXG4gICAgICovXG4gICAgc3RhdGljIGdldEhleFZhbHVlRnJvbUNvbG9yKGNvbG9yOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIWNvbG9yLmluY2x1ZGVzKCcjJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbG9yUkdCOiBudW1iZXJbXSA9IGNvbG9yLnJlcGxhY2UoL1xccy9naSwgJycpLnNwbGl0KCcsJykubWFwKCh2YWwpID0+IHBhcnNlSW50KHZhbCkpO1xuICAgICAgICAgICAgY29sb3IgPSByZ2IoY29sb3JSR0JbMF0sIGNvbG9yUkdCWzFdLCBjb2xvclJHQlsyXSkuaGV4KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbG9yO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEF1dG9HZW5lcmF0ZSBmb3JlZ3JvdW5kIGNvbG9yIGJhc2VkIG9uIGEgYmFja2dyb3VuZCBjb2xvclxuICAgICAqIGh0dHA6Ly93d3cudzMub3JnL1RSL0FFUlQjY29sb3ItY29udHJhc3RcbiAgICAgKiBAcGFyYW0gYmFja2dyb3VuZENvbG9yIGJhY2tncm91bmQgY29sb3IgZnJvbSB3aGljaCB0aGUgZm9yZWdyb3VuZCBjb2xvciB3aWxsIGJlIGNhbGN1bGF0ZWRcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Rm9yZWdyb3VuZENvbG9yVzNDKGJhY2tncm91bmRDb2xvcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFRoZW1pbmdVdGlsLmdldElzQnJpZ2h0KGJhY2tncm91bmRDb2xvciwgRk9SRUdST1VORF9DT0xPUlNfQlJJR0hUX0ZBQ1RPUikgPyAgJyMwMDAwMDAnIDogJyNGRkZGRkYnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc29sdmUgaWYgY29sb3IgaXMgYnJpZ2h0IChvdGhlcndpc2UgaXMgZGFyaylcbiAgICAgKiBodHRwOi8vd3d3LnczLm9yZy9UUi9BRVJUI2NvbG9yLWNvbnRyYXN0XG4gICAgICogQHBhcmFtIGNvbG9yIHZhbHVlIHRvIGNoZWNrIGlmIGJyaWdodCBvciBkYXJrIHNob3VsZCBiZSBhcHBsaWVkXG4gICAgICogQHBhcmFtIGJyaWdodEZhY3RvciB2YWx1ZSBmcm9tIDAgdG8gMjU1IHRoYXQgc3BlY2lmaWVzIHRoZSBsaW1pdCB3aGVyZSB0aGlzIGNvbG9yIGlzIGNvbnNpZGVyZWQgJ0JyaWdodCdcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0SXNCcmlnaHQoY29sb3I6IHN0cmluZywgYnJpZ2h0RmFjdG9yOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgZENvbG9yID0gcmdiKGNvbG9yKTtcbiAgICAgICAgY29uc3QgbyA9IE1hdGgucm91bmQoKChkQ29sb3IuciAqIDI5OSkgKyAoZENvbG9yLmcgKiA1ODcpICsgKGRDb2xvci5iICogMTE0KSkgLyAxMDAwKTtcbiAgICAgICAgcmV0dXJuIG8gPiBicmlnaHRGYWN0b3I7XG4gICAgfVxufVxuIl19
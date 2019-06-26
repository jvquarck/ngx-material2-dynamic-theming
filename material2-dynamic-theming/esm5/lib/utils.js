/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { color as d3Color, rgb } from 'd3-color';
// import { getProperty } from '../../../utils/object.utils';
import { AUTO_GENERATE_FOREGROUNDS, CommonPaletteValues as CommonPaletteValuesEnum, DEFAULT_THEMING_EXTRA_OPTIONS, FOREGROUND_COLORS_BRIGHT_FACTOR, OPACITY_FACTOR } from './definitions';
/** @type {?} */
export var DARKENING_K = OPACITY_FACTOR;
/** @type {?} */
export var BRIGHTEN_K = OPACITY_FACTOR;
/** @type {?} */
export var BRIGHTEN_HOVER_K = 1;
/** @type {?} */
export var LIGHT_LIGHTEN_K = .9;
/** @type {?} */
export var LIGHT_DARKEN_K = .7;
/** @type {?} */
export var LIGHT_HOVER_K = .5;
/** @type {?} */
var CommonPaletteValues = Object.values(CommonPaletteValuesEnum);
/**
 * Returns a solid color that is the resulting of adding opacity to <color> and having a <background> beneath it
 * @param {?} color hex value color
 * @param {?} background hex value background color
 * @param {?} opacity 0 to 1 opacity value
 * @return {?}
 */
export function getSolidColorFromOpacityBackground(color, background, opacity) {
    /** @type {?} */
    var delta = 1 - opacity;
    /** @type {?} */
    var dColor = d3Color(color).rgb();
    /** @type {?} */
    var dBackgroundColor = d3Color(background).rgb();
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
        console.warn('d3-color', 'darker', "Wrong color " + color + " provided");
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
        console.warn('d3-color', 'brighter', "Wrong color " + color + " provided");
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
    var newObj = {};
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
    var newObj = oldObj;
    if (oldObj && typeof oldObj === 'object') {
        newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
        for (var i in oldObj) {
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
        var pathParts = path.split('.');
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
var ThemingUtil = /** @class */ (function () {
    function ThemingUtil() {
    }
    /**
     * Returns the color and its lighter and darker versions [color, lighter, darker]
     * @param color
     */
    /**
     * Returns the color and its lighter and darker versions [color, lighter, darker]
     * @param {?} color
     * @return {?}
     */
    ThemingUtil.getColorsFromBase = /**
     * Returns the color and its lighter and darker versions [color, lighter, darker]
     * @param {?} color
     * @return {?}
     */
    function (color) {
        return [
            ThemingUtil.getColorString(color),
            ThemingUtil.getColorString(getBrighterColor(color, BRIGHTEN_K)),
            ThemingUtil.getColorString(getDarkerColor(color, DARKENING_K)),
            ThemingUtil.getColorString(getBrighterColor(color, BRIGHTEN_HOVER_K)),
        ];
    };
    /**
     * Returns the colors [default, lighten, darken, hover] for a color that is considered 'bright'.
     * @param color
     */
    /**
     * Returns the colors [default, lighten, darken, hover] for a color that is considered 'bright'.
     * @param {?} color
     * @return {?}
     */
    ThemingUtil.getColorsFromLightColor = /**
     * Returns the colors [default, lighten, darken, hover] for a color that is considered 'bright'.
     * @param {?} color
     * @return {?}
     */
    function (color) {
        return [
            ThemingUtil.getColorString(color),
            ThemingUtil.getColorString(getDarkerColor(color, LIGHT_LIGHTEN_K)),
            ThemingUtil.getColorString(getDarkerColor(color, LIGHT_DARKEN_K)),
            ThemingUtil.getColorString(getDarkerColor(color, LIGHT_HOVER_K)),
        ];
    };
    /**
     * Get hex value from a color string either if it comes in #FFFFFF or 255, 255, 255 notation
     * @param hexColor
     */
    /**
     * Get hex value from a color string either if it comes in #FFFFFF or 255, 255, 255 notation
     * @param {?} hexColor
     * @return {?}
     */
    ThemingUtil.getColorString = /**
     * Get hex value from a color string either if it comes in #FFFFFF or 255, 255, 255 notation
     * @param {?} hexColor
     * @return {?}
     */
    function (hexColor) {
        /** @type {?} */
        var dColor = rgb(hexColor);
        return dColor.r + "," + dColor.g + "," + dColor.b;
    };
    /**
     * Get a random hex color
     */
    /**
     * Get a random hex color
     * @return {?}
     */
    ThemingUtil.getRandomHex = /**
     * Get a random hex color
     * @return {?}
     */
    function () {
        return ThemingUtil.getHexValueFromColor(Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255));
    };
    /**
     * Generic method to get custom properties
     * @param elementRef elementRef element where custom properties will be retrieved from
     * @param customProperties list of properties to get
     */
    /**
     * Generic method to get custom properties
     * @param {?} elementRef elementRef element where custom properties will be retrieved from
     * @param {?} customProperties list of properties to get
     * @return {?}
     */
    ThemingUtil.getCustomProperties = /**
     * Generic method to get custom properties
     * @param {?} elementRef elementRef element where custom properties will be retrieved from
     * @param {?} customProperties list of properties to get
     * @return {?}
     */
    function (elementRef, customProperties) {
        /** @type {?} */
        var styles = getComputedStyle(elementRef.nativeElement);
        return customProperties.map((/**
         * @param {?} propertyName
         * @return {?}
         */
        function (propertyName) {
            return styles.getPropertyValue(propertyName);
        }));
    };
    /**
     * Generic method to set custom properties
     * @param elementRef elementRef element where custom properties will be set to
     * @param customProperties dictionary of properties to set
     */
    /**
     * Generic method to set custom properties
     * @param {?} elementRef elementRef element where custom properties will be set to
     * @param {?} customProperties dictionary of properties to set
     * @return {?}
     */
    ThemingUtil.setCustomProperties = /**
     * Generic method to set custom properties
     * @param {?} elementRef elementRef element where custom properties will be set to
     * @param {?} customProperties dictionary of properties to set
     * @return {?}
     */
    function (elementRef, customProperties) {
        Object.keys(customProperties).forEach((/**
         * @param {?} propertyKey
         * @return {?}
         */
        function (propertyKey) {
            elementRef.nativeElement.style.setProperty(propertyKey, customProperties[propertyKey]);
        }));
    };
    /**
     * Set css custom properties based on a palette name and values and onto and onto an ElementRef styles
     * @param elementRef element where custom properties will be set
     * @param paletteValues color values
     * @param paletteName name of the palette to set
     * @param options custom to set if needed
     */
    /**
     * Set css custom properties based on a palette name and values and onto and onto an ElementRef styles
     * @param {?} elementRef element where custom properties will be set
     * @param {?} paletteValues color values
     * @param {?} paletteName name of the palette to set
     * @param {?=} options custom to set if needed
     * @return {?}
     */
    ThemingUtil.setPaletteCustomProperties = /**
     * Set css custom properties based on a palette name and values and onto and onto an ElementRef styles
     * @param {?} elementRef element where custom properties will be set
     * @param {?} paletteValues color values
     * @param {?} paletteName name of the palette to set
     * @param {?=} options custom to set if needed
     * @return {?}
     */
    function (elementRef, paletteValues, paletteName, options) {
        options = tslib_1.__assign({}, DEFAULT_THEMING_EXTRA_OPTIONS, options);
        if (!paletteValues)
            console.error(this, "paletteValues should be <string | PaletteValues>", paletteValues);
        /** @type {?} */
        var defaultColor = (typeof paletteValues === 'string') ?
            ThemingUtil.getHexValueFromColor(paletteValues) : ThemingUtil.getHexValueFromColor(paletteValues.default);
        /** @type {?} */
        var autoColors = options.autoAdjust && ThemingUtil.getIsBright(defaultColor, options.brightnessFactor)
            ? ThemingUtil.getColorsFromLightColor(defaultColor) : ThemingUtil.getColorsFromBase(defaultColor);
        /** @type {?} */
        var autoContrasts = autoColors.map(ThemingUtil.getHexValueFromColor).map(ThemingUtil.getForegroundColorW3C).map(ThemingUtil.getColorString);
        /** @type {?} */
        var customProperties = {};
        /** @type {?} */
        var paletteKeys = ThemingUtil.getPaletteCustomPropertiesNames(paletteName, false);
        paletteKeys.forEach((/**
         * @param {?} key
         * @param {?} index
         * @return {?}
         */
        function (key, index) {
            return customProperties[paletteKeys[index]] = (((/** @type {?} */ (paletteValues)))[CommonPaletteValues[index]]) || autoColors[index];
        }));
        if (AUTO_GENERATE_FOREGROUNDS) {
            /** @type {?} */
            var contrastKeys_1 = ThemingUtil.getPaletteCustomPropertiesNames(paletteName, true);
            contrastKeys_1.forEach((/**
             * @param {?} key
             * @param {?} index
             * @return {?}
             */
            function (key, index) {
                return customProperties[contrastKeys_1[index]] = getProperty(paletteValues, "contrast." + contrastKeys_1[index]) || autoContrasts[index];
            }));
        }
        ThemingUtil.setCustomProperties(elementRef, customProperties);
    };
    /**
     * Return custom property keys for a palette
     * @param contrast flag indicating to return contrast custom properties keys
     */
    /**
     * Return custom property keys for a palette
     * @param {?} paletteName
     * @param {?=} contrast flag indicating to return contrast custom properties keys
     * @return {?}
     */
    ThemingUtil.getPaletteCustomPropertiesNames = /**
     * Return custom property keys for a palette
     * @param {?} paletteName
     * @param {?=} contrast flag indicating to return contrast custom properties keys
     * @return {?}
     */
    function (paletteName, contrast) {
        if (contrast === void 0) { contrast = false; }
        /** @type {?} */
        var contrastModifier = !contrast ? '' : 'contrast-';
        return [
            "--" + paletteName + "-palette-" + contrastModifier + "default",
            "--" + paletteName + "-palette-" + contrastModifier + "lighter",
            "--" + paletteName + "-palette-" + contrastModifier + "darker",
            "--" + paletteName + "-palette-" + contrastModifier + "hover",
        ];
    };
    /**
     * Get hex color from either an hex or `r, g, b` string
     * @param color  hex or `r, g, b` string
     */
    /**
     * Get hex color from either an hex or `r, g, b` string
     * @param {?} color  hex or `r, g, b` string
     * @return {?}
     */
    ThemingUtil.getHexValueFromColor = /**
     * Get hex color from either an hex or `r, g, b` string
     * @param {?} color  hex or `r, g, b` string
     * @return {?}
     */
    function (color) {
        if (!color.includes('#')) {
            /** @type {?} */
            var colorRGB = color.replace(/\s/gi, '').split(',').map((/**
             * @param {?} val
             * @return {?}
             */
            function (val) { return parseInt(val); }));
            color = rgb(colorRGB[0], colorRGB[1], colorRGB[2]).hex();
        }
        return color;
    };
    /**
     * AutoGenerate foreground color based on a background color
     * http://www.w3.org/TR/AERT#color-contrast
     * @param backgroundColor background color from which the foreground color will be calculated
     */
    /**
     * AutoGenerate foreground color based on a background color
     * http://www.w3.org/TR/AERT#color-contrast
     * @param {?} backgroundColor background color from which the foreground color will be calculated
     * @return {?}
     */
    ThemingUtil.getForegroundColorW3C = /**
     * AutoGenerate foreground color based on a background color
     * http://www.w3.org/TR/AERT#color-contrast
     * @param {?} backgroundColor background color from which the foreground color will be calculated
     * @return {?}
     */
    function (backgroundColor) {
        return ThemingUtil.getIsBright(backgroundColor, FOREGROUND_COLORS_BRIGHT_FACTOR) ? '#000000' : '#FFFFFF';
    };
    /**
     * Resolve if color is bright (otherwise is dark)
     * http://www.w3.org/TR/AERT#color-contrast
     * @param color value to check if bright or dark should be applied
     * @param brightFactor value from 0 to 255 that specifies the limit where this color is considered 'Bright'
     */
    /**
     * Resolve if color is bright (otherwise is dark)
     * http://www.w3.org/TR/AERT#color-contrast
     * @param {?} color value to check if bright or dark should be applied
     * @param {?} brightFactor value from 0 to 255 that specifies the limit where this color is considered 'Bright'
     * @return {?}
     */
    ThemingUtil.getIsBright = /**
     * Resolve if color is bright (otherwise is dark)
     * http://www.w3.org/TR/AERT#color-contrast
     * @param {?} color value to check if bright or dark should be applied
     * @param {?} brightFactor value from 0 to 255 that specifies the limit where this color is considered 'Bright'
     * @return {?}
     */
    function (color, brightFactor) {
        /** @type {?} */
        var dColor = rgb(color);
        /** @type {?} */
        var o = Math.round(((dColor.r * 299) + (dColor.g * 587) + (dColor.b * 114)) / 1000);
        return o > brightFactor;
    };
    return ThemingUtil;
}());
export { ThemingUtil };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXRlcmlhbDItZHluYW1pYy10aGVtaW5nLyIsInNvdXJjZXMiOlsibGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLEtBQUssSUFBSSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sVUFBVSxDQUFDOztBQUVqRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsbUJBQW1CLElBQUksdUJBQXVCLEVBQUUsNkJBQTZCLEVBQUUsK0JBQStCLEVBQUUsY0FBYyxFQUFnRCxNQUFNLGVBQWUsQ0FBQzs7QUFFeE8sTUFBTSxLQUFPLFdBQVcsR0FBVyxjQUFjOztBQUNqRCxNQUFNLEtBQU8sVUFBVSxHQUFXLGNBQWM7O0FBQ2hELE1BQU0sS0FBTyxnQkFBZ0IsR0FBVyxDQUFDOztBQUN6QyxNQUFNLEtBQU8sZUFBZSxHQUFXLEVBQUU7O0FBQ3pDLE1BQU0sS0FBTyxjQUFjLEdBQVcsRUFBRTs7QUFDeEMsTUFBTSxLQUFPLGFBQWEsR0FBVyxFQUFFOztJQUVqQyxtQkFBbUIsR0FBYSxNQUFNLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDOzs7Ozs7OztBQVE1RSxNQUFNLFVBQVUsa0NBQWtDLENBQUMsS0FBYSxFQUFFLFVBQWtCLEVBQUUsT0FBZTs7UUFDM0YsS0FBSyxHQUFXLENBQUMsR0FBRyxPQUFPOztRQUMzQixNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRTs7UUFDN0IsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsRUFBRTtJQUNsRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFDdkUsSUFBSSxDQUFDLEtBQUssQ0FBQyxN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QUMsR0FBRyxFQUFFLENBQUM7U0FDNUQ7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNJLGlDQUFxQjs7Ozs7O0lBQTVCLFVBQTZCLGVBQXVCO1FBQ2hELE9BQU8sV0FBVyxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsK0JBQStCLENBQUMsQ0FBQyxDQUFDLENBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDOUcsQ0FBQztJQUVEOzs7OztPQUtHOzs7Ozs7OztJQUNJLHVCQUFXOzs7Ozs7O0lBQWxCLFVBQW1CLEtBQWEsRUFBRSxZQUFvQjs7WUFDNUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7O1lBQ25CLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDckYsT0FBTyxDQUFDLEdBQUcsWUFBWSxDQUFDO0lBQzVCLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUEvSUQsSUErSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2xvciBhcyBkM0NvbG9yLCByZ2IgfSBmcm9tICdkMy1jb2xvcic7XG4vLyBpbXBvcnQgeyBnZXRQcm9wZXJ0eSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL29iamVjdC51dGlscyc7XG5pbXBvcnQgeyBBVVRPX0dFTkVSQVRFX0ZPUkVHUk9VTkRTLCBDb21tb25QYWxldHRlVmFsdWVzIGFzIENvbW1vblBhbGV0dGVWYWx1ZXNFbnVtLCBERUZBVUxUX1RIRU1JTkdfRVhUUkFfT1BUSU9OUywgRk9SRUdST1VORF9DT0xPUlNfQlJJR0hUX0ZBQ1RPUiwgT1BBQ0lUWV9GQUNUT1IsIFBhbGV0dGVzLCBQYWxldHRlVmFsdWVzLCBUaGVtaW5nRXh0cmFPcHRpb25zIH0gZnJvbSAnLi9kZWZpbml0aW9ucyc7XG5cbmV4cG9ydCBjb25zdCBEQVJLRU5JTkdfSzogbnVtYmVyID0gT1BBQ0lUWV9GQUNUT1I7XG5leHBvcnQgY29uc3QgQlJJR0hURU5fSzogbnVtYmVyID0gT1BBQ0lUWV9GQUNUT1I7XG5leHBvcnQgY29uc3QgQlJJR0hURU5fSE9WRVJfSzogbnVtYmVyID0gMTtcbmV4cG9ydCBjb25zdCBMSUdIVF9MSUdIVEVOX0s6IG51bWJlciA9IC45O1xuZXhwb3J0IGNvbnN0IExJR0hUX0RBUktFTl9LOiBudW1iZXIgPSAuNztcbmV4cG9ydCBjb25zdCBMSUdIVF9IT1ZFUl9LOiBudW1iZXIgPSAuNTtcblxuY29uc3QgQ29tbW9uUGFsZXR0ZVZhbHVlczogc3RyaW5nW10gPSBPYmplY3QudmFsdWVzKENvbW1vblBhbGV0dGVWYWx1ZXNFbnVtKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc29saWQgY29sb3IgdGhhdCBpcyB0aGUgcmVzdWx0aW5nIG9mIGFkZGluZyBvcGFjaXR5IHRvIDxjb2xvcj4gYW5kIGhhdmluZyBhIDxiYWNrZ3JvdW5kPiBiZW5lYXRoIGl0XG4gKiBAcGFyYW0gY29sb3IgaGV4IHZhbHVlIGNvbG9yXG4gKiBAcGFyYW0gYmFja2dyb3VuZCBoZXggdmFsdWUgYmFja2dyb3VuZCBjb2xvclxuICogQHBhcmFtIG9wYWNpdHkgMCB0byAxIG9wYWNpdHkgdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNvbGlkQ29sb3JGcm9tT3BhY2l0eUJhY2tncm91bmQoY29sb3I6IHN0cmluZywgYmFja2dyb3VuZDogc3RyaW5nLCBvcGFjaXR5OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IGRlbHRhOiBudW1iZXIgPSAxIC0gb3BhY2l0eTtcbiAgICBjb25zdCBkQ29sb3IgPSBkM0NvbG9yKGNvbG9yKS5yZ2IoKTtcbiAgICBjb25zdCBkQmFja2dyb3VuZENvbG9yID0gZDNDb2xvcihiYWNrZ3JvdW5kKS5yZ2IoKTtcbiAgICByZXR1cm4gcmdiKE1hdGgucm91bmQoZENvbG9yLnIgKyAoKGRCYWNrZ3JvdW5kQ29sb3IuciAtIGRDb2xvci5yKSAqIGRlbHRhKSksXG4gICAgICAgIE1hdGgucm91bmQoZENvbG9yLmcgKyAoKGRCYWNrZ3JvdW5kQ29sb3IuZyAtIGRDb2xvci5nKSAqIGRlbHRhKSksXG4gICAgICAgIE1hdGgucm91bmQoZENvbG9yLmIgKyAoKGRCYWNrZ3JvdW5kQ29sb3IuYiAtIGRDb2xvci5iKSAqIGRlbHRhKSkpLmhleCgpO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgY29sb3IgYnJpZ2h0ZXIgZGVwZW5kaW5nIG9uIGtcbiAqIEBwYXJhbSBjb2xvciBoZXggY29sb3IgKGUuZy46ICNGRkZGRkYpXG4gKiBAcGFyYW0gayAoZnJvbSAwIHRvIDEpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXJrZXJDb2xvcihjb2xvcjogc3RyaW5nLCBrOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBnZXRTb2xpZENvbG9yRnJvbU9wYWNpdHlCYWNrZ3JvdW5kKGNvbG9yLCAnIzAwMDAwMCcsIGspO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignZDMtY29sb3InLCAnZGFya2VyJywgYFdyb25nIGNvbG9yICR7IGNvbG9yIH0gcHJvdmlkZWRgKTtcbiAgICAgICAgcmV0dXJuIGNvbG9yO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGNvbG9yIGJyaWdodGVyIGRlcGVuZGluZyBvbiBrXG4gKiBAcGFyYW0gY29sb3IgaGV4IGNvbG9yIChlLmcuOiAjRkZGRkZGKVxuICogQHBhcmFtIGsgKGZyb20gMCB0byAxKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QnJpZ2h0ZXJDb2xvcihjb2xvcjogc3RyaW5nLCBrOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBnZXRTb2xpZENvbG9yRnJvbU9wYWNpdHlCYWNrZ3JvdW5kKGNvbG9yLCAnI0ZGRkZGRicsIGspO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignZDMtY29sb3InLCAnYnJpZ2h0ZXInLCBgV3JvbmcgY29sb3IgJHsgY29sb3IgfSBwcm92aWRlZGApO1xuICAgICAgICByZXR1cm4gY29sb3I7XG4gICAgfVxufVxuXG4vLyBmdWxsIGNyZWRpdCB0bzogaHR0cDovL2dlbml1c2NhcnJpZXIuY29tL2NvcHktb2JqZWN0LWluLWphdmFzY3JpcHQvXG4vKipcbiAqIFNoYWxsb3cgY29weSBrZWVwcyByZWZlcmVuY2VzIHRvIG9yaWdpbmFsIG9iamVjdHMsIGFycmF5cyBvciBmdW5jdGlvbnMgd2l0aGluIHRoZSBuZXcgb2JqZWN0LFxuICogc28gdGhlIFwiY29weVwiIGlzIHN0aWxsIGxpbmtlZCB0byB0aGUgb3JpZ2luYWwgb2JqZWN0LiBJbiBvdGhlciB3b3JkcywgdGhleSB3aWxsIGJlIHBvaW50aW5nIHRvIHRoZSBzYW1lIG1lbW9yeSBsb2NhdGlvbi5cbiAqIEBwYXJhbSBvbGRPYmpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNoYWxsb3dDb3B5KG9sZE9iaikge1xuICBjb25zdCBuZXdPYmogPSB7fTtcbiAgZm9yKHZhciBpIGluIG9sZE9iaikge1xuICAgICAgaWYob2xkT2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgbmV3T2JqW2ldID0gb2xkT2JqW2ldO1xuICAgICAgfVxuICB9XG4gIHJldHVybiBuZXdPYmo7XG59XG5cbi8vIGZ1bGwgY3JlZGl0IHRvOiBodHRwOi8vZ2VuaXVzY2Fycmllci5jb20vY29weS1vYmplY3QtaW4tamF2YXNjcmlwdC9cbi8qKlxuICogRGVlcCBjb3B5IGR1cGxpY2F0ZXMgZXZlcnl0aGluZywgYW5kIGFsbG9jYXRlcyBtZW1vcnkgaW4gYSBkaWZmZXJlbnQgbG9jYXRpb24uXG4gKiBAcGFyYW0gb2xkT2JqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWVwQ29weShvbGRPYmopIHtcbiAgbGV0IG5ld09iaiA9IG9sZE9iajtcbiAgaWYgKG9sZE9iaiAmJiB0eXBlb2Ygb2xkT2JqID09PSAnb2JqZWN0Jykge1xuICAgICAgbmV3T2JqID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9sZE9iaikgPT09IFwiW29iamVjdCBBcnJheV1cIiA/IFtdIDoge307XG4gICAgICBmb3IgKGxldCBpIGluIG9sZE9iaikge1xuICAgICAgICAgIG5ld09ialtpXSA9IGRlZXBDb3B5KG9sZE9ialtpXSk7XG4gICAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld09iajtcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIGRlc2lyZWQgcHJvcGVydHkgZnJvbSBhbiBvYmplY3QgaWYgZm91bmRcbiAqIEBwYXJhbSBvYmogdGFyZ2V0IE9iamVjdFxuICogQHBhcmFtIHBhdGggcGF0aCB0byB0aGUgZGVzaXJlZCBwcm9wZXJ0eSB3aXRoIC4gbm90YXRpb24gaS5lOiAncGF0aC50by5vYmplY3QnXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9wZXJ0eShvYmo6IGFueSwgcGF0aDogc3RyaW5nKTogYW55IHtcbiAgaWYoL14oW0EtWmEtelxcZF0rXFwuPykqJC8udGVzdChwYXRoKSkge1xuICAgIGxldCBwYXRoUGFydHMgPSBwYXRoLnNwbGl0KCcuJyk7XG4gICAgaWYob2JqLmhhc093blByb3BlcnR5KHBhdGhQYXJ0c1swXSkpIHtcbiAgICAgIGlmKHBhdGhQYXJ0cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIG9ialtwYXRoUGFydHNbMF1dO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGdldFByb3BlcnR5KG9iaiwgcGF0aFBhcnRzLnNsaWNlKDEpLmpvaW4oJy4nKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB2b2lkIDA7XG59XG5cbmV4cG9ydCBjbGFzcyBUaGVtaW5nVXRpbCB7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjb2xvciBhbmQgaXRzIGxpZ2h0ZXIgYW5kIGRhcmtlciB2ZXJzaW9ucyBbY29sb3IsIGxpZ2h0ZXIsIGRhcmtlcl1cbiAgICAgKiBAcGFyYW0gY29sb3JcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q29sb3JzRnJvbUJhc2UoY29sb3I6IHN0cmluZyk6IFtzdHJpbmcsIHN0cmluZywgc3RyaW5nLCBzdHJpbmddIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICBUaGVtaW5nVXRpbC5nZXRDb2xvclN0cmluZyhjb2xvciksXG4gICAgICAgICAgICAgICAgVGhlbWluZ1V0aWwuZ2V0Q29sb3JTdHJpbmcoZ2V0QnJpZ2h0ZXJDb2xvcihjb2xvciwgQlJJR0hURU5fSykpLFxuICAgICAgICAgICAgICAgIFRoZW1pbmdVdGlsLmdldENvbG9yU3RyaW5nKGdldERhcmtlckNvbG9yKGNvbG9yLCBEQVJLRU5JTkdfSykpLFxuICAgICAgICAgICAgICAgIFRoZW1pbmdVdGlsLmdldENvbG9yU3RyaW5nKGdldEJyaWdodGVyQ29sb3IoY29sb3IsIEJSSUdIVEVOX0hPVkVSX0spKSxcbiAgICAgICAgICAgIF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY29sb3JzIFtkZWZhdWx0LCBsaWdodGVuLCBkYXJrZW4sIGhvdmVyXSBmb3IgYSBjb2xvciB0aGF0IGlzIGNvbnNpZGVyZWQgJ2JyaWdodCcuXG4gICAgICogQHBhcmFtIGNvbG9yXG4gICAgICovXG4gICAgc3RhdGljIGdldENvbG9yc0Zyb21MaWdodENvbG9yKGNvbG9yOiBzdHJpbmcpOiBbc3RyaW5nLCBzdHJpbmcsIHN0cmluZywgc3RyaW5nXSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBUaGVtaW5nVXRpbC5nZXRDb2xvclN0cmluZyhjb2xvciksXG4gICAgICAgICAgICBUaGVtaW5nVXRpbC5nZXRDb2xvclN0cmluZyhnZXREYXJrZXJDb2xvcihjb2xvciwgTElHSFRfTElHSFRFTl9LKSksXG4gICAgICAgICAgICBUaGVtaW5nVXRpbC5nZXRDb2xvclN0cmluZyhnZXREYXJrZXJDb2xvcihjb2xvciwgTElHSFRfREFSS0VOX0spKSxcbiAgICAgICAgICAgIFRoZW1pbmdVdGlsLmdldENvbG9yU3RyaW5nKGdldERhcmtlckNvbG9yKGNvbG9yLCBMSUdIVF9IT1ZFUl9LKSksXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGhleCB2YWx1ZSBmcm9tIGEgY29sb3Igc3RyaW5nIGVpdGhlciBpZiBpdCBjb21lcyBpbiAjRkZGRkZGIG9yIDI1NSwgMjU1LCAyNTUgbm90YXRpb25cbiAgICAgKiBAcGFyYW0gaGV4Q29sb3JcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q29sb3JTdHJpbmcoaGV4Q29sb3I6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGRDb2xvciA9IHJnYihoZXhDb2xvcik7XG4gICAgICAgIHJldHVybiBgJHsgZENvbG9yLnIgfSwkeyBkQ29sb3IuZyB9LCR7IGRDb2xvci5iIH1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIHJhbmRvbSBoZXggY29sb3JcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0UmFuZG9tSGV4KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBUaGVtaW5nVXRpbC5nZXRIZXhWYWx1ZUZyb21Db2xvcihcbiAgICAgICAgICAgIGAkeyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTUpIH0sJHsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KSB9LCR7IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NSkgfWBcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmljIG1ldGhvZCB0byBnZXQgY3VzdG9tIHByb3BlcnRpZXNcbiAgICAgKiBAcGFyYW0gZWxlbWVudFJlZiBlbGVtZW50UmVmIGVsZW1lbnQgd2hlcmUgY3VzdG9tIHByb3BlcnRpZXMgd2lsbCBiZSByZXRyaWV2ZWQgZnJvbVxuICAgICAqIEBwYXJhbSBjdXN0b21Qcm9wZXJ0aWVzIGxpc3Qgb2YgcHJvcGVydGllcyB0byBnZXRcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q3VzdG9tUHJvcGVydGllcyhlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBjdXN0b21Qcm9wZXJ0aWVzOiBzdHJpbmdbXSkge1xuICAgICAgICBjb25zdCBzdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHJldHVybiBjdXN0b21Qcm9wZXJ0aWVzLm1hcCgocHJvcGVydHlOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmljIG1ldGhvZCB0byBzZXQgY3VzdG9tIHByb3BlcnRpZXNcbiAgICAgKiBAcGFyYW0gZWxlbWVudFJlZiBlbGVtZW50UmVmIGVsZW1lbnQgd2hlcmUgY3VzdG9tIHByb3BlcnRpZXMgd2lsbCBiZSBzZXQgdG9cbiAgICAgKiBAcGFyYW0gY3VzdG9tUHJvcGVydGllcyBkaWN0aW9uYXJ5IG9mIHByb3BlcnRpZXMgdG8gc2V0XG4gICAgICovXG4gICAgc3RhdGljIHNldEN1c3RvbVByb3BlcnRpZXMoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgY3VzdG9tUHJvcGVydGllczogeyBbazogc3RyaW5nXTogYW55IH0pOiB2b2lkIHtcbiAgICAgICAgT2JqZWN0LmtleXMoY3VzdG9tUHJvcGVydGllcykuZm9yRWFjaCgocHJvcGVydHlLZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KHByb3BlcnR5S2V5LCBjdXN0b21Qcm9wZXJ0aWVzW3Byb3BlcnR5S2V5XSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBjc3MgY3VzdG9tIHByb3BlcnRpZXMgYmFzZWQgb24gYSBwYWxldHRlIG5hbWUgYW5kIHZhbHVlcyBhbmQgb250byBhbmQgb250byBhbiBFbGVtZW50UmVmIHN0eWxlc1xuICAgICAqIEBwYXJhbSBlbGVtZW50UmVmIGVsZW1lbnQgd2hlcmUgY3VzdG9tIHByb3BlcnRpZXMgd2lsbCBiZSBzZXRcbiAgICAgKiBAcGFyYW0gcGFsZXR0ZVZhbHVlcyBjb2xvciB2YWx1ZXNcbiAgICAgKiBAcGFyYW0gcGFsZXR0ZU5hbWUgbmFtZSBvZiB0aGUgcGFsZXR0ZSB0byBzZXRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBjdXN0b20gdG8gc2V0IGlmIG5lZWRlZFxuICAgICAqL1xuICAgIHN0YXRpYyBzZXRQYWxldHRlQ3VzdG9tUHJvcGVydGllcyhlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwYWxldHRlVmFsdWVzOiBQYWxldHRlVmFsdWVzIHwgc3RyaW5nLCBwYWxldHRlTmFtZTogUGFsZXR0ZXMsXG4gICAgICAgIG9wdGlvbnM/OiBUaGVtaW5nRXh0cmFPcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7IC4uLkRFRkFVTFRfVEhFTUlOR19FWFRSQV9PUFRJT05TLCAuLi5vcHRpb25zIH07XG4gICAgICAgIGlmICghcGFsZXR0ZVZhbHVlcykgY29uc29sZS5lcnJvcih0aGlzLCBgcGFsZXR0ZVZhbHVlcyBzaG91bGQgYmUgPHN0cmluZyB8IFBhbGV0dGVWYWx1ZXM+YCwgcGFsZXR0ZVZhbHVlcyk7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRDb2xvciA9ICh0eXBlb2YgcGFsZXR0ZVZhbHVlcyA9PT0gJ3N0cmluZycpID9cbiAgICAgICAgICAgIFRoZW1pbmdVdGlsLmdldEhleFZhbHVlRnJvbUNvbG9yKHBhbGV0dGVWYWx1ZXMpIDogVGhlbWluZ1V0aWwuZ2V0SGV4VmFsdWVGcm9tQ29sb3IocGFsZXR0ZVZhbHVlcy5kZWZhdWx0KTtcbiAgICAgICAgY29uc3QgYXV0b0NvbG9yczogW3N0cmluZywgc3RyaW5nLCBzdHJpbmcsIHN0cmluZ10gPSBvcHRpb25zLmF1dG9BZGp1c3QgJiYgVGhlbWluZ1V0aWwuZ2V0SXNCcmlnaHQoZGVmYXVsdENvbG9yLCBvcHRpb25zLmJyaWdodG5lc3NGYWN0b3IpXG4gICAgICAgICAgICA/IFRoZW1pbmdVdGlsLmdldENvbG9yc0Zyb21MaWdodENvbG9yKGRlZmF1bHRDb2xvcikgOiBUaGVtaW5nVXRpbC5nZXRDb2xvcnNGcm9tQmFzZShkZWZhdWx0Q29sb3IpO1xuICAgICAgICBjb25zdCBhdXRvQ29udHJhc3RzID0gYXV0b0NvbG9ycy5tYXAoVGhlbWluZ1V0aWwuZ2V0SGV4VmFsdWVGcm9tQ29sb3IpLm1hcChUaGVtaW5nVXRpbC5nZXRGb3JlZ3JvdW5kQ29sb3JXM0MpLm1hcChUaGVtaW5nVXRpbC5nZXRDb2xvclN0cmluZyk7XG4gICAgICAgIGNvbnN0IGN1c3RvbVByb3BlcnRpZXM6IHsgW2s6IHN0cmluZ106IGFueSB9ID0ge307XG4gICAgICAgIGNvbnN0IHBhbGV0dGVLZXlzID0gVGhlbWluZ1V0aWwuZ2V0UGFsZXR0ZUN1c3RvbVByb3BlcnRpZXNOYW1lcyhwYWxldHRlTmFtZSwgZmFsc2UpO1xuICAgICAgICBwYWxldHRlS2V5cy5mb3JFYWNoKChrZXk6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT5cbiAgICAgICAgICAgIGN1c3RvbVByb3BlcnRpZXNbcGFsZXR0ZUtleXNbaW5kZXhdXSA9ICgocGFsZXR0ZVZhbHVlcyBhcyBQYWxldHRlVmFsdWVzKVtDb21tb25QYWxldHRlVmFsdWVzW2luZGV4XV0pIHx8IGF1dG9Db2xvcnNbaW5kZXhdKTtcbiAgICAgICAgaWYgKEFVVE9fR0VORVJBVEVfRk9SRUdST1VORFMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRyYXN0S2V5cyA9IFRoZW1pbmdVdGlsLmdldFBhbGV0dGVDdXN0b21Qcm9wZXJ0aWVzTmFtZXMocGFsZXR0ZU5hbWUsIHRydWUpO1xuICAgICAgICAgICAgY29udHJhc3RLZXlzLmZvckVhY2goKGtleTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PlxuICAgICAgICAgICAgICAgIGN1c3RvbVByb3BlcnRpZXNbY29udHJhc3RLZXlzW2luZGV4XV0gPSBnZXRQcm9wZXJ0eShwYWxldHRlVmFsdWVzLCBgY29udHJhc3QuJHsgY29udHJhc3RLZXlzW2luZGV4XSB9YCkgfHwgYXV0b0NvbnRyYXN0c1tpbmRleF0pO1xuICAgICAgICB9XG4gICAgICAgIFRoZW1pbmdVdGlsLnNldEN1c3RvbVByb3BlcnRpZXMoZWxlbWVudFJlZiwgY3VzdG9tUHJvcGVydGllcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGN1c3RvbSBwcm9wZXJ0eSBrZXlzIGZvciBhIHBhbGV0dGVcbiAgICAgKiBAcGFyYW0gY29udHJhc3QgZmxhZyBpbmRpY2F0aW5nIHRvIHJldHVybiBjb250cmFzdCBjdXN0b20gcHJvcGVydGllcyBrZXlzXG4gICAgICovXG4gICAgc3RhdGljIGdldFBhbGV0dGVDdXN0b21Qcm9wZXJ0aWVzTmFtZXMocGFsZXR0ZU5hbWU6IHN0cmluZywgY29udHJhc3Q6IGJvb2xlYW4gPSBmYWxzZSk6IFtzdHJpbmcsIHN0cmluZywgc3RyaW5nLCBzdHJpbmddIHtcbiAgICAgICAgY29uc3QgY29udHJhc3RNb2RpZmllcjogc3RyaW5nID0gIWNvbnRyYXN0ID8gJycgOiAnY29udHJhc3QtJztcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIGAtLSR7IHBhbGV0dGVOYW1lIH0tcGFsZXR0ZS0keyBjb250cmFzdE1vZGlmaWVyIH1kZWZhdWx0YCxcbiAgICAgICAgICAgIGAtLSR7IHBhbGV0dGVOYW1lIH0tcGFsZXR0ZS0keyBjb250cmFzdE1vZGlmaWVyIH1saWdodGVyYCxcbiAgICAgICAgICAgIGAtLSR7IHBhbGV0dGVOYW1lIH0tcGFsZXR0ZS0keyBjb250cmFzdE1vZGlmaWVyIH1kYXJrZXJgLFxuICAgICAgICAgICAgYC0tJHsgcGFsZXR0ZU5hbWUgfS1wYWxldHRlLSR7IGNvbnRyYXN0TW9kaWZpZXIgfWhvdmVyYCxcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgaGV4IGNvbG9yIGZyb20gZWl0aGVyIGFuIGhleCBvciBgciwgZywgYmAgc3RyaW5nXG4gICAgICogQHBhcmFtIGNvbG9yICBoZXggb3IgYHIsIGcsIGJgIHN0cmluZ1xuICAgICAqL1xuICAgIHN0YXRpYyBnZXRIZXhWYWx1ZUZyb21Db2xvcihjb2xvcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCFjb2xvci5pbmNsdWRlcygnIycpKSB7XG4gICAgICAgICAgICBjb25zdCBjb2xvclJHQjogbnVtYmVyW10gPSBjb2xvci5yZXBsYWNlKC9cXHMvZ2ksICcnKS5zcGxpdCgnLCcpLm1hcCgodmFsKSA9PiBwYXJzZUludCh2YWwpKTtcbiAgICAgICAgICAgIGNvbG9yID0gcmdiKGNvbG9yUkdCWzBdLCBjb2xvclJHQlsxXSwgY29sb3JSR0JbMl0pLmhleCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xvcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBdXRvR2VuZXJhdGUgZm9yZWdyb3VuZCBjb2xvciBiYXNlZCBvbiBhIGJhY2tncm91bmQgY29sb3JcbiAgICAgKiBodHRwOi8vd3d3LnczLm9yZy9UUi9BRVJUI2NvbG9yLWNvbnRyYXN0XG4gICAgICogQHBhcmFtIGJhY2tncm91bmRDb2xvciBiYWNrZ3JvdW5kIGNvbG9yIGZyb20gd2hpY2ggdGhlIGZvcmVncm91bmQgY29sb3Igd2lsbCBiZSBjYWxjdWxhdGVkXG4gICAgICovXG4gICAgc3RhdGljIGdldEZvcmVncm91bmRDb2xvclczQyhiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBUaGVtaW5nVXRpbC5nZXRJc0JyaWdodChiYWNrZ3JvdW5kQ29sb3IsIEZPUkVHUk9VTkRfQ09MT1JTX0JSSUdIVF9GQUNUT1IpID8gICcjMDAwMDAwJyA6ICcjRkZGRkZGJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNvbHZlIGlmIGNvbG9yIGlzIGJyaWdodCAob3RoZXJ3aXNlIGlzIGRhcmspXG4gICAgICogaHR0cDovL3d3dy53My5vcmcvVFIvQUVSVCNjb2xvci1jb250cmFzdFxuICAgICAqIEBwYXJhbSBjb2xvciB2YWx1ZSB0byBjaGVjayBpZiBicmlnaHQgb3IgZGFyayBzaG91bGQgYmUgYXBwbGllZFxuICAgICAqIEBwYXJhbSBicmlnaHRGYWN0b3IgdmFsdWUgZnJvbSAwIHRvIDI1NSB0aGF0IHNwZWNpZmllcyB0aGUgbGltaXQgd2hlcmUgdGhpcyBjb2xvciBpcyBjb25zaWRlcmVkICdCcmlnaHQnXG4gICAgICovXG4gICAgc3RhdGljIGdldElzQnJpZ2h0KGNvbG9yOiBzdHJpbmcsIGJyaWdodEZhY3RvcjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGRDb2xvciA9IHJnYihjb2xvcik7XG4gICAgICAgIGNvbnN0IG8gPSBNYXRoLnJvdW5kKCgoZENvbG9yLnIgKiAyOTkpICsgKGRDb2xvci5nICogNTg3KSArIChkQ29sb3IuYiAqIDExNCkpIC8gMTAwMCk7XG4gICAgICAgIHJldHVybiBvID4gYnJpZ2h0RmFjdG9yO1xuICAgIH1cbn1cbiJdfQ==
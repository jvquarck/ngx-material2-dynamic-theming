import { color, rgb } from 'd3-color';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { ApplicationRef, Inject, Injectable, NgModule, defineInjectable, inject } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const Palettes = {
    primary: 'primary',
    secondary: 'secondary',
    warn: 'warn',
    dark: 'dark',
};
/** @enum {string} */
const CommonPaletteValues = {
    Default: 'default',
    Lighter: 'lighter',
    Darker: 'darker',
    Hover: 'hover',
};
/** @type {?} */
const OPACITY_FACTOR = .4;
/** @type {?} */
const HOVER_OPACITY_FACTOR = .2;
/** @type {?} */
const FOREGROUND_COLORS_BRIGHT_FACTOR = 200;
/** @type {?} */
const BACKGROUND_COLORS_BRIGHT_FACTOR = 245;
/** @type {?} */
const AUTO_GENERATE_FOREGROUNDS = true;
/** @type {?} */
const DEFAULT_THEME_PALETTES = {
    primary: '#3F51B5',
    secondary: '#FFD31F',
    dark: '#616161',
    warn: '#F44336',
};
/** @type {?} */
const DEFAULT_THEMING_EXTRA_OPTIONS = {
    autoAdjust: false,
    brightnessFactor: BACKGROUND_COLORS_BRIGHT_FACTOR
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const DARKENING_K = OPACITY_FACTOR;
/** @type {?} */
const BRIGHTEN_K = OPACITY_FACTOR;
/** @type {?} */
const BRIGHTEN_HOVER_K = 1;
/** @type {?} */
const LIGHT_LIGHTEN_K = .9;
/** @type {?} */
const LIGHT_DARKEN_K = .7;
/** @type {?} */
const LIGHT_HOVER_K = .5;
/** @type {?} */
const CommonPaletteValues$1 = Object.values(CommonPaletteValues);
/**
 * Returns a solid color that is the resulting of adding opacity to <color> and having a <background> beneath it
 * @param {?} color hex value color
 * @param {?} background hex value background color
 * @param {?} opacity 0 to 1 opacity value
 * @return {?}
 */
function getSolidColorFromOpacityBackground(color$$1, background, opacity) {
    /** @type {?} */
    const delta = 1 - opacity;
    /** @type {?} */
    const dColor = color(color$$1).rgb();
    /** @type {?} */
    const dBackgroundColor = color(background).rgb();
    return rgb(Math.round(dColor.r + ((dBackgroundColor.r - dColor.r) * delta)), Math.round(dColor.g + ((dBackgroundColor.g - dColor.g) * delta)), Math.round(dColor.b + ((dBackgroundColor.b - dColor.b) * delta))).hex();
}
/**
 * Returns a new color brighter depending on k
 * @param {?} color hex color (e.g.: #FFFFFF)
 * @param {?} k (from 0 to 1)
 * @return {?}
 */
function getDarkerColor(color$$1, k) {
    try {
        return getSolidColorFromOpacityBackground(color$$1, '#000000', k);
    }
    catch (error) {
        console.warn('d3-color', 'darker', `Wrong color ${color$$1} provided`);
        return color$$1;
    }
}
/**
 * Returns a new color brighter depending on k
 * @param {?} color hex color (e.g.: #FFFFFF)
 * @param {?} k (from 0 to 1)
 * @return {?}
 */
function getBrighterColor(color$$1, k) {
    try {
        return getSolidColorFromOpacityBackground(color$$1, '#FFFFFF', k);
    }
    catch (error) {
        console.warn('d3-color', 'brighter', `Wrong color ${color$$1} provided`);
        return color$$1;
    }
}
// full credit to: http://geniuscarrier.com/copy-object-in-javascript/
/**
 * Shallow copy keeps references to original objects, arrays or functions within the new object,
 * so the "copy" is still linked to the original object. In other words, they will be pointing to the same memory location.
 * @param {?} oldObj
 * @return {?}
 */
function shallowCopy(oldObj) {
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
function deepCopy(oldObj) {
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
function getProperty(obj, path) {
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
class ThemingUtil {
    /**
     * Returns the color and its lighter and darker versions [color, lighter, darker]
     * @param {?} color
     * @return {?}
     */
    static getColorsFromBase(color$$1) {
        return [
            ThemingUtil.getColorString(color$$1),
            ThemingUtil.getColorString(getBrighterColor(color$$1, BRIGHTEN_K)),
            ThemingUtil.getColorString(getDarkerColor(color$$1, DARKENING_K)),
            ThemingUtil.getColorString(getBrighterColor(color$$1, BRIGHTEN_HOVER_K)),
        ];
    }
    /**
     * Returns the colors [default, lighten, darken, hover] for a color that is considered 'bright'.
     * @param {?} color
     * @return {?}
     */
    static getColorsFromLightColor(color$$1) {
        return [
            ThemingUtil.getColorString(color$$1),
            ThemingUtil.getColorString(getDarkerColor(color$$1, LIGHT_LIGHTEN_K)),
            ThemingUtil.getColorString(getDarkerColor(color$$1, LIGHT_DARKEN_K)),
            ThemingUtil.getColorString(getDarkerColor(color$$1, LIGHT_HOVER_K)),
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
        (key, index) => customProperties[paletteKeys[index]] = (((/** @type {?} */ (paletteValues)))[CommonPaletteValues$1[index]]) || autoColors[index]));
        {
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
    static getHexValueFromColor(color$$1) {
        if (!color$$1.includes('#')) {
            /** @type {?} */
            const colorRGB = color$$1.replace(/\s/gi, '').split(',').map((/**
             * @param {?} val
             * @return {?}
             */
            (val) => parseInt(val)));
            color$$1 = rgb(colorRGB[0], colorRGB[1], colorRGB[2]).hex();
        }
        return color$$1;
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
    static getIsBright(color$$1, brightFactor) {
        /** @type {?} */
        const dColor = rgb(color$$1);
        /** @type {?} */
        const o = Math.round(((dColor.r * 299) + (dColor.g * 587) + (dColor.b * 114)) / 1000);
        return o > brightFactor;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  Rationale: This provider is a singleton and should be injected only once, since it styles the application when constructor is executed
 *  Pitfall: YOU MUST NOT provide this service via a component decorator, component providers won't respect `providedIn: 'root'` property value.
 */
class ThemingService {
    /**
     * @param {?} appRef
     * @param {?} document
     */
    constructor(appRef, document) {
        this.appRef = appRef;
        this.document = document;
        this.currentPalettes$ = new BehaviorSubject(DEFAULT_THEME_PALETTES);
        // this.rootElementRef = this.appRef.components[0].location;
        // this.initThemingPalettes();
    }
    /**
     * Set the theming palette for a given scope/elementRef
     * @param {?} elementRef
     * @param {?} paletteValue
     * @param {?} paletteName
     * @param {?=} options
     * @return {?}
     */
    setThemingPalette(elementRef, paletteValue, paletteName, options) {
        ThemingUtil.setPaletteCustomProperties(elementRef, paletteValue, paletteName, options);
    }
    /**
     * Set the theming palette application wide
     * @param {?} paletteValue
     * @param {?} paletteName
     * @param {?=} options
     * @return {?}
     */
    setThemingPaletteForRoot(paletteValue, paletteName, options) {
        ThemingUtil.setPaletteCustomProperties(this.rootElementRef, paletteValue, paletteName, options);
        ThemingUtil.setPaletteCustomProperties(this.rootElementRef, paletteValue, (/** @type {?} */ (`${paletteName}-root`)), options); // save for root
        // save for root
        /** @type {?} */
        const defaultPalettes = deepCopy(this.currentPalettes$.value);
        defaultPalettes[paletteName] = paletteValue;
        this.currentPalettes$.next(defaultPalettes);
    }
    /**
     * Observable that will push changes to the requested palette
     * @param {?} palette name of the palette
     * @return {?}
     */
    getPaletteObservable(palette) {
        return this.currentPalettes$.pipe(pluck(palette), distinctUntilChanged());
    }
    /**
     * Get palette values given a palette name and a ref (could be current component or app root)
     * @param {?} paletteName name of the palette which we want to query about
     * @param {?=} ref element ref, helps mark context
     * @return {?}
     */
    getDOMPaletteValues(paletteName, ref = this.rootElementRef) {
        /** @type {?} */
        const paletteCustomProperties = ThemingUtil.getCustomProperties(ref, ThemingUtil.getPaletteCustomPropertiesNames(paletteName, true));
        /** @type {?} */
        const paletteCustomPropertiesContrast = ThemingUtil.getCustomProperties(ref, ThemingUtil.getPaletteCustomPropertiesNames(paletteName, true));
        return {
            default: paletteCustomProperties[0],
            lighter: paletteCustomProperties[1],
            darker: paletteCustomProperties[2],
            hover: paletteCustomProperties[3],
            contrast: {
                default: paletteCustomPropertiesContrast[0],
                lighter: paletteCustomPropertiesContrast[1],
                darker: paletteCustomPropertiesContrast[2],
                hover: paletteCustomPropertiesContrast[3],
            }
        };
    }
    /**
     * Get current value of the palette
     * @param {?} palette name of the palette
     * @return {?}
     */
    getPalette(palette) {
        return this.currentPalettes$.value[palette];
    }
    /**
     * Initialize application theming palettes
     * @private
     * @return {?}
     */
    initThemingPalettes() {
        Object.keys(this.currentPalettes$.value).forEach((/**
         * @param {?} palette
         * @return {?}
         */
        (palette) => {
            ThemingUtil.setPaletteCustomProperties(this.rootElementRef, DEFAULT_THEME_PALETTES[palette], palette);
            ThemingUtil.setPaletteCustomProperties(this.rootElementRef, DEFAULT_THEME_PALETTES[palette], (/** @type {?} */ (`${palette}-root`))); // save for root
        }));
    }
    /**
     * Temporary showcase method, initiates the change of the theme palettes to random color values
     * @private
     * @return {?}
     */
    initThemeDemo() {
        // TODO: maybe integrate with some music?
    }
}
ThemingService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
ThemingService.ctorParameters = () => [
    { type: ApplicationRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ ThemingService.ngInjectableDef = defineInjectable({ factory: function ThemingService_Factory() { return new ThemingService(inject(ApplicationRef), inject(DOCUMENT)); }, token: ThemingService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// TODO: configuration: add forRoot provisioning of configuration
class ThemingModule {
}
ThemingModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [],
                exports: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ThemingService, ThemingModule, Palettes, CommonPaletteValues, OPACITY_FACTOR, HOVER_OPACITY_FACTOR, FOREGROUND_COLORS_BRIGHT_FACTOR, BACKGROUND_COLORS_BRIGHT_FACTOR, AUTO_GENERATE_FOREGROUNDS, DEFAULT_THEME_PALETTES, DEFAULT_THEMING_EXTRA_OPTIONS, getSolidColorFromOpacityBackground, getDarkerColor, getBrighterColor, shallowCopy, deepCopy, getProperty, DARKENING_K, BRIGHTEN_K, BRIGHTEN_HOVER_K, LIGHT_LIGHTEN_K, LIGHT_DARKEN_K, LIGHT_HOVER_K, ThemingUtil };

//# sourceMappingURL=material2-dynamic-theming.js.map
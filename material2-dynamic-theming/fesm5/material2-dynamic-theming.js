import { __assign } from 'tslib';
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
var Palettes = {
    primary: 'primary',
    secondary: 'secondary',
    warn: 'warn',
    dark: 'dark',
};
/** @enum {string} */
var CommonPaletteValues = {
    Default: 'default',
    Lighter: 'lighter',
    Darker: 'darker',
    Hover: 'hover',
};
/** @type {?} */
var OPACITY_FACTOR = .4;
/** @type {?} */
var HOVER_OPACITY_FACTOR = .2;
/** @type {?} */
var FOREGROUND_COLORS_BRIGHT_FACTOR = 200;
/** @type {?} */
var BACKGROUND_COLORS_BRIGHT_FACTOR = 245;
/** @type {?} */
var AUTO_GENERATE_FOREGROUNDS = true;
/** @type {?} */
var DEFAULT_THEME_PALETTES = {
    primary: '#3F51B5',
    secondary: '#FFD31F',
    dark: '#616161',
    warn: '#F44336',
};
/** @type {?} */
var DEFAULT_THEMING_EXTRA_OPTIONS = {
    autoAdjust: false,
    brightnessFactor: BACKGROUND_COLORS_BRIGHT_FACTOR
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var DARKENING_K = OPACITY_FACTOR;
/** @type {?} */
var BRIGHTEN_K = OPACITY_FACTOR;
/** @type {?} */
var BRIGHTEN_HOVER_K = 1;
/** @type {?} */
var LIGHT_LIGHTEN_K = .9;
/** @type {?} */
var LIGHT_DARKEN_K = .7;
/** @type {?} */
var LIGHT_HOVER_K = .5;
/** @type {?} */
var CommonPaletteValues$1 = Object.values(CommonPaletteValues);
/**
 * Returns a solid color that is the resulting of adding opacity to <color> and having a <background> beneath it
 * @param {?} color hex value color
 * @param {?} background hex value background color
 * @param {?} opacity 0 to 1 opacity value
 * @return {?}
 */
function getSolidColorFromOpacityBackground(color$$1, background, opacity) {
    /** @type {?} */
    var delta = 1 - opacity;
    /** @type {?} */
    var dColor = color(color$$1).rgb();
    /** @type {?} */
    var dBackgroundColor = color(background).rgb();
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
        console.warn('d3-color', 'darker', "Wrong color " + color$$1 + " provided");
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
        console.warn('d3-color', 'brighter', "Wrong color " + color$$1 + " provided");
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
function deepCopy(oldObj) {
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
function getProperty(obj, path) {
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
    function (color$$1) {
        return [
            ThemingUtil.getColorString(color$$1),
            ThemingUtil.getColorString(getBrighterColor(color$$1, BRIGHTEN_K)),
            ThemingUtil.getColorString(getDarkerColor(color$$1, DARKENING_K)),
            ThemingUtil.getColorString(getBrighterColor(color$$1, BRIGHTEN_HOVER_K)),
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
    function (color$$1) {
        return [
            ThemingUtil.getColorString(color$$1),
            ThemingUtil.getColorString(getDarkerColor(color$$1, LIGHT_LIGHTEN_K)),
            ThemingUtil.getColorString(getDarkerColor(color$$1, LIGHT_DARKEN_K)),
            ThemingUtil.getColorString(getDarkerColor(color$$1, LIGHT_HOVER_K)),
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
        options = __assign({}, DEFAULT_THEMING_EXTRA_OPTIONS, options);
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
            return customProperties[paletteKeys[index]] = (((/** @type {?} */ (paletteValues)))[CommonPaletteValues$1[index]]) || autoColors[index];
        }));
        {
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
    function (color$$1) {
        if (!color$$1.includes('#')) {
            /** @type {?} */
            var colorRGB = color$$1.replace(/\s/gi, '').split(',').map((/**
             * @param {?} val
             * @return {?}
             */
            function (val) { return parseInt(val); }));
            color$$1 = rgb(colorRGB[0], colorRGB[1], colorRGB[2]).hex();
        }
        return color$$1;
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
    function (color$$1, brightFactor) {
        /** @type {?} */
        var dColor = rgb(color$$1);
        /** @type {?} */
        var o = Math.round(((dColor.r * 299) + (dColor.g * 587) + (dColor.b * 114)) / 1000);
        return o > brightFactor;
    };
    return ThemingUtil;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  Rationale: This provider is a singleton and should be injected only once, since it styles the application when constructor is executed
 *  Pitfall: YOU MUST NOT provide this service via a component decorator, component providers won't respect `providedIn: 'root'` property value.
 */
var ThemingService = /** @class */ (function () {
    function ThemingService(appRef, document) {
        this.appRef = appRef;
        this.document = document;
        this.currentPalettes$ = new BehaviorSubject(DEFAULT_THEME_PALETTES);
        // this.rootElementRef = this.appRef.components[0].location;
        // this.initThemingPalettes();
    }
    /**
     * Set the theming palette for a given scope/elementRef
     * @param elementRef
     * @param paletteValue
     * @param paletteName
     */
    /**
     * Set the theming palette for a given scope/elementRef
     * @param {?} elementRef
     * @param {?} paletteValue
     * @param {?} paletteName
     * @param {?=} options
     * @return {?}
     */
    ThemingService.prototype.setThemingPalette = /**
     * Set the theming palette for a given scope/elementRef
     * @param {?} elementRef
     * @param {?} paletteValue
     * @param {?} paletteName
     * @param {?=} options
     * @return {?}
     */
    function (elementRef, paletteValue, paletteName, options) {
        ThemingUtil.setPaletteCustomProperties(elementRef, paletteValue, paletteName, options);
    };
    /**
     * Set the theming palette application wide
     * @param paletteValue
     * @param paletteName
     */
    /**
     * Set the theming palette application wide
     * @param {?} paletteValue
     * @param {?} paletteName
     * @param {?=} options
     * @return {?}
     */
    ThemingService.prototype.setThemingPaletteForRoot = /**
     * Set the theming palette application wide
     * @param {?} paletteValue
     * @param {?} paletteName
     * @param {?=} options
     * @return {?}
     */
    function (paletteValue, paletteName, options) {
        ThemingUtil.setPaletteCustomProperties(this.rootElementRef, paletteValue, paletteName, options);
        ThemingUtil.setPaletteCustomProperties(this.rootElementRef, paletteValue, (/** @type {?} */ (paletteName + "-root")), options); // save for root
        // save for root
        /** @type {?} */
        var defaultPalettes = deepCopy(this.currentPalettes$.value);
        defaultPalettes[paletteName] = paletteValue;
        this.currentPalettes$.next(defaultPalettes);
    };
    /**
     * Observable that will push changes to the requested palette
     * @param palette name of the palette
     */
    /**
     * Observable that will push changes to the requested palette
     * @param {?} palette name of the palette
     * @return {?}
     */
    ThemingService.prototype.getPaletteObservable = /**
     * Observable that will push changes to the requested palette
     * @param {?} palette name of the palette
     * @return {?}
     */
    function (palette) {
        return this.currentPalettes$.pipe(pluck(palette), distinctUntilChanged());
    };
    /**
     * Get palette values given a palette name and a ref (could be current component or app root)
     * @param paletteName name of the palette which we want to query about
     * @param ref element ref, helps mark context
     */
    /**
     * Get palette values given a palette name and a ref (could be current component or app root)
     * @param {?} paletteName name of the palette which we want to query about
     * @param {?=} ref element ref, helps mark context
     * @return {?}
     */
    ThemingService.prototype.getDOMPaletteValues = /**
     * Get palette values given a palette name and a ref (could be current component or app root)
     * @param {?} paletteName name of the palette which we want to query about
     * @param {?=} ref element ref, helps mark context
     * @return {?}
     */
    function (paletteName, ref) {
        if (ref === void 0) { ref = this.rootElementRef; }
        /** @type {?} */
        var paletteCustomProperties = ThemingUtil.getCustomProperties(ref, ThemingUtil.getPaletteCustomPropertiesNames(paletteName, true));
        /** @type {?} */
        var paletteCustomPropertiesContrast = ThemingUtil.getCustomProperties(ref, ThemingUtil.getPaletteCustomPropertiesNames(paletteName, true));
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
    };
    /**
     * Get current value of the palette
     * @param palette name of the palette
     */
    /**
     * Get current value of the palette
     * @param {?} palette name of the palette
     * @return {?}
     */
    ThemingService.prototype.getPalette = /**
     * Get current value of the palette
     * @param {?} palette name of the palette
     * @return {?}
     */
    function (palette) {
        return this.currentPalettes$.value[palette];
    };
    /**
     * Initialize application theming palettes
     */
    /**
     * Initialize application theming palettes
     * @private
     * @return {?}
     */
    ThemingService.prototype.initThemingPalettes = /**
     * Initialize application theming palettes
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        Object.keys(this.currentPalettes$.value).forEach((/**
         * @param {?} palette
         * @return {?}
         */
        function (palette) {
            ThemingUtil.setPaletteCustomProperties(_this.rootElementRef, DEFAULT_THEME_PALETTES[palette], palette);
            ThemingUtil.setPaletteCustomProperties(_this.rootElementRef, DEFAULT_THEME_PALETTES[palette], (/** @type {?} */ (palette + "-root"))); // save for root
        }));
    };
    /**
     * Temporary showcase method, initiates the change of the theme palettes to random color values
     */
    /**
     * Temporary showcase method, initiates the change of the theme palettes to random color values
     * @private
     * @return {?}
     */
    ThemingService.prototype.initThemeDemo = /**
     * Temporary showcase method, initiates the change of the theme palettes to random color values
     * @private
     * @return {?}
     */
    function () {
        // TODO: maybe integrate with some music?
    };
    ThemingService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    ThemingService.ctorParameters = function () { return [
        { type: ApplicationRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    /** @nocollapse */ ThemingService.ngInjectableDef = defineInjectable({ factory: function ThemingService_Factory() { return new ThemingService(inject(ApplicationRef), inject(DOCUMENT)); }, token: ThemingService, providedIn: "root" });
    return ThemingService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// TODO: configuration: add forRoot provisioning of configuration
var ThemingModule = /** @class */ (function () {
    function ThemingModule() {
    }
    ThemingModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    imports: [],
                    exports: []
                },] }
    ];
    return ThemingModule;
}());

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
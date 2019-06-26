/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ApplicationRef, Inject, Injectable } from '@angular/core';
import { DEFAULT_THEME_PALETTES } from './definitions';
import { deepCopy } from './utils';
import { ThemingUtil } from './utils';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
    /** @nocollapse */ ThemingService.ngInjectableDef = i0.defineInjectable({ factory: function ThemingService_Factory() { return new ThemingService(i0.inject(i0.ApplicationRef), i0.inject(i1.DOCUMENT)); }, token: ThemingService, providedIn: "root" });
    return ThemingService;
}());
export { ThemingService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ThemingService.prototype.currentPalettes$;
    /**
     * @type {?}
     * @private
     */
    ThemingService.prototype.rootElementRef;
    /**
     * @type {?}
     * @private
     */
    ThemingService.prototype.appRef;
    /**
     * @type {?}
     * @private
     */
    ThemingService.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWF0ZXJpYWwyLWR5bmFtaWMtdGhlbWluZy8iLCJzb3VyY2VzIjpbImxpYi90aGVtaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQWMsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUvRSxPQUFPLEVBQUUsc0JBQXNCLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDbkMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN0QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7QUFNN0Q7SUFNSSx3QkFDWSxNQUFzQixFQUNKLFFBQWE7UUFEL0IsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDSixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBTG5DLHFCQUFnQixHQUF1QyxJQUFJLGVBQWUsQ0FBb0Isc0JBQXNCLENBQUMsQ0FBQztRQU8xSCw0REFBNEQ7UUFDNUQsOEJBQThCO0lBQ2xDLENBQUM7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7O0lBQ0ksMENBQWlCOzs7Ozs7OztJQUF4QixVQUF5QixVQUFzQixFQUFFLFlBQW9DLEVBQUUsV0FBcUIsRUFDeEcsT0FBNkI7UUFDN0IsV0FBVyxDQUFDLDBCQUEwQixDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7OztJQUNJLGlEQUF3Qjs7Ozs7OztJQUEvQixVQUFnQyxZQUFvQyxFQUFFLFdBQXFC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ZCxNQUFNLFNBQUMsUUFBUTs7O3lCQXJCeEI7Q0ErR0MsQUFsR0QsSUFrR0M7U0FqR1ksY0FBYzs7Ozs7O0lBRXZCLDBDQUE4SDs7Ozs7SUFDOUgsd0NBQTRDOzs7OztJQUd4QyxnQ0FBOEI7Ozs7O0lBQzlCLGtDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcGxpY2F0aW9uUmVmLCBFbGVtZW50UmVmLCBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhbGV0dGVzLCBQYWxldHRlVmFsdWVzLCBUaGVtaW5nRXh0cmFPcHRpb25zIH0gZnJvbSAnLi9kZWZpbml0aW9ucyc7XG5pbXBvcnQgeyBERUZBVUxUX1RIRU1FX1BBTEVUVEVTLCBQYWxldHRlVmFsdWVzVHlwZSB9IGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuaW1wb3J0IHsgZGVlcENvcHkgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IFRoZW1pbmdVdGlsIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBwbHVjayB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyoqXG4gKiAgUmF0aW9uYWxlOiBUaGlzIHByb3ZpZGVyIGlzIGEgc2luZ2xldG9uIGFuZCBzaG91bGQgYmUgaW5qZWN0ZWQgb25seSBvbmNlLCBzaW5jZSBpdCBzdHlsZXMgdGhlIGFwcGxpY2F0aW9uIHdoZW4gY29uc3RydWN0b3IgaXMgZXhlY3V0ZWRcbiAqICBQaXRmYWxsOiBZT1UgTVVTVCBOT1QgcHJvdmlkZSB0aGlzIHNlcnZpY2UgdmlhIGEgY29tcG9uZW50IGRlY29yYXRvciwgY29tcG9uZW50IHByb3ZpZGVycyB3b24ndCByZXNwZWN0IGBwcm92aWRlZEluOiAncm9vdCdgIHByb3BlcnR5IHZhbHVlLlxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFRoZW1pbmdTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgY3VycmVudFBhbGV0dGVzJDogQmVoYXZpb3JTdWJqZWN0PFBhbGV0dGVWYWx1ZXNUeXBlPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGFsZXR0ZVZhbHVlc1R5cGU+KERFRkFVTFRfVEhFTUVfUEFMRVRURVMpO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcm9vdEVsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXG4gICAgKSB7XG4gICAgICAgIC8vIHRoaXMucm9vdEVsZW1lbnRSZWYgPSB0aGlzLmFwcFJlZi5jb21wb25lbnRzWzBdLmxvY2F0aW9uO1xuICAgICAgICAvLyB0aGlzLmluaXRUaGVtaW5nUGFsZXR0ZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHRoZW1pbmcgcGFsZXR0ZSBmb3IgYSBnaXZlbiBzY29wZS9lbGVtZW50UmVmXG4gICAgICogQHBhcmFtIGVsZW1lbnRSZWZcbiAgICAgKiBAcGFyYW0gcGFsZXR0ZVZhbHVlXG4gICAgICogQHBhcmFtIHBhbGV0dGVOYW1lXG4gICAgICovXG4gICAgcHVibGljIHNldFRoZW1pbmdQYWxldHRlKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHBhbGV0dGVWYWx1ZTogUGFsZXR0ZVZhbHVlcyB8IHN0cmluZywgcGFsZXR0ZU5hbWU6IFBhbGV0dGVzLFxuICAgICAgICBvcHRpb25zPzogVGhlbWluZ0V4dHJhT3B0aW9ucyk6IHZvaWQge1xuICAgICAgICBUaGVtaW5nVXRpbC5zZXRQYWxldHRlQ3VzdG9tUHJvcGVydGllcyhlbGVtZW50UmVmLCBwYWxldHRlVmFsdWUsIHBhbGV0dGVOYW1lLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHRoZW1pbmcgcGFsZXR0ZSBhcHBsaWNhdGlvbiB3aWRlXG4gICAgICogQHBhcmFtIHBhbGV0dGVWYWx1ZVxuICAgICAqIEBwYXJhbSBwYWxldHRlTmFtZVxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRUaGVtaW5nUGFsZXR0ZUZvclJvb3QocGFsZXR0ZVZhbHVlOiBQYWxldHRlVmFsdWVzIHwgc3RyaW5nLCBwYWxldHRlTmFtZTogUGFsZXR0ZXMsIG9wdGlvbnM/OiBUaGVtaW5nRXh0cmFPcHRpb25zKTogdm9pZCB7XG4gICAgICAgIFRoZW1pbmdVdGlsLnNldFBhbGV0dGVDdXN0b21Qcm9wZXJ0aWVzKHRoaXMucm9vdEVsZW1lbnRSZWYsIHBhbGV0dGVWYWx1ZSwgcGFsZXR0ZU5hbWUsIG9wdGlvbnMpO1xuICAgICAgICBUaGVtaW5nVXRpbC5zZXRQYWxldHRlQ3VzdG9tUHJvcGVydGllcyh0aGlzLnJvb3RFbGVtZW50UmVmLCBwYWxldHRlVmFsdWUsIDxhbnk+YCR7IHBhbGV0dGVOYW1lIH0tcm9vdGAsIG9wdGlvbnMpOyAvLyBzYXZlIGZvciByb290XG4gICAgICAgIGNvbnN0IGRlZmF1bHRQYWxldHRlczogYW55ID0gZGVlcENvcHkodGhpcy5jdXJyZW50UGFsZXR0ZXMkLnZhbHVlKTtcbiAgICAgICAgZGVmYXVsdFBhbGV0dGVzW3BhbGV0dGVOYW1lXSA9IHBhbGV0dGVWYWx1ZTtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFsZXR0ZXMkLm5leHQoZGVmYXVsdFBhbGV0dGVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPYnNlcnZhYmxlIHRoYXQgd2lsbCBwdXNoIGNoYW5nZXMgdG8gdGhlIHJlcXVlc3RlZCBwYWxldHRlXG4gICAgICogQHBhcmFtIHBhbGV0dGUgbmFtZSBvZiB0aGUgcGFsZXR0ZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRQYWxldHRlT2JzZXJ2YWJsZShwYWxldHRlOiBQYWxldHRlcyk6IE9ic2VydmFibGU8UGFsZXR0ZVZhbHVlcyB8IHN0cmluZyB8IHt9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRQYWxldHRlcyQucGlwZShcbiAgICAgICAgICAgIHBsdWNrKHBhbGV0dGUpLFxuICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBwYWxldHRlIHZhbHVlcyBnaXZlbiBhIHBhbGV0dGUgbmFtZSBhbmQgYSByZWYgKGNvdWxkIGJlIGN1cnJlbnQgY29tcG9uZW50IG9yIGFwcCByb290KVxuICAgICAqIEBwYXJhbSBwYWxldHRlTmFtZSBuYW1lIG9mIHRoZSBwYWxldHRlIHdoaWNoIHdlIHdhbnQgdG8gcXVlcnkgYWJvdXRcbiAgICAgKiBAcGFyYW0gcmVmIGVsZW1lbnQgcmVmLCBoZWxwcyBtYXJrIGNvbnRleHRcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0RE9NUGFsZXR0ZVZhbHVlcyhwYWxldHRlTmFtZTogUGFsZXR0ZXMsIHJlZjogRWxlbWVudFJlZiA9IHRoaXMucm9vdEVsZW1lbnRSZWYpOiBQYWxldHRlVmFsdWVzIHtcbiAgICAgICAgY29uc3QgcGFsZXR0ZUN1c3RvbVByb3BlcnRpZXMgPVxuICAgICAgICAgICAgVGhlbWluZ1V0aWwuZ2V0Q3VzdG9tUHJvcGVydGllcyhyZWYsIFRoZW1pbmdVdGlsLmdldFBhbGV0dGVDdXN0b21Qcm9wZXJ0aWVzTmFtZXMocGFsZXR0ZU5hbWUsIHRydWUpKTtcbiAgICAgICAgY29uc3QgcGFsZXR0ZUN1c3RvbVByb3BlcnRpZXNDb250cmFzdCA9XG4gICAgICAgICAgICBUaGVtaW5nVXRpbC5nZXRDdXN0b21Qcm9wZXJ0aWVzKHJlZiwgVGhlbWluZ1V0aWwuZ2V0UGFsZXR0ZUN1c3RvbVByb3BlcnRpZXNOYW1lcyhwYWxldHRlTmFtZSwgdHJ1ZSkpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGVmYXVsdDogcGFsZXR0ZUN1c3RvbVByb3BlcnRpZXNbMF0sXG4gICAgICAgICAgICBsaWdodGVyOiBwYWxldHRlQ3VzdG9tUHJvcGVydGllc1sxXSxcbiAgICAgICAgICAgIGRhcmtlcjogcGFsZXR0ZUN1c3RvbVByb3BlcnRpZXNbMl0sXG4gICAgICAgICAgICBob3ZlcjogcGFsZXR0ZUN1c3RvbVByb3BlcnRpZXNbM10sXG4gICAgICAgICAgICBjb250cmFzdDoge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHBhbGV0dGVDdXN0b21Qcm9wZXJ0aWVzQ29udHJhc3RbMF0sXG4gICAgICAgICAgICAgICAgbGlnaHRlcjogcGFsZXR0ZUN1c3RvbVByb3BlcnRpZXNDb250cmFzdFsxXSxcbiAgICAgICAgICAgICAgICBkYXJrZXI6IHBhbGV0dGVDdXN0b21Qcm9wZXJ0aWVzQ29udHJhc3RbMl0sXG4gICAgICAgICAgICAgICAgaG92ZXI6IHBhbGV0dGVDdXN0b21Qcm9wZXJ0aWVzQ29udHJhc3RbM10sXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGN1cnJlbnQgdmFsdWUgb2YgdGhlIHBhbGV0dGVcbiAgICAgKiBAcGFyYW0gcGFsZXR0ZSBuYW1lIG9mIHRoZSBwYWxldHRlXG4gICAgICovXG4gICAgcHVibGljIGdldFBhbGV0dGUocGFsZXR0ZTogUGFsZXR0ZXMpOiBQYWxldHRlVmFsdWVzIHwgc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFBhbGV0dGVzJC52YWx1ZVtwYWxldHRlXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIGFwcGxpY2F0aW9uIHRoZW1pbmcgcGFsZXR0ZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXRUaGVtaW5nUGFsZXR0ZXMoKTogdm9pZCB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuY3VycmVudFBhbGV0dGVzJC52YWx1ZSkuZm9yRWFjaCgocGFsZXR0ZTogUGFsZXR0ZXMpID0+IHtcbiAgICAgICAgICAgIFRoZW1pbmdVdGlsLnNldFBhbGV0dGVDdXN0b21Qcm9wZXJ0aWVzKHRoaXMucm9vdEVsZW1lbnRSZWYsIERFRkFVTFRfVEhFTUVfUEFMRVRURVNbcGFsZXR0ZV0sIHBhbGV0dGUpO1xuICAgICAgICAgICAgVGhlbWluZ1V0aWwuc2V0UGFsZXR0ZUN1c3RvbVByb3BlcnRpZXModGhpcy5yb290RWxlbWVudFJlZiwgREVGQVVMVF9USEVNRV9QQUxFVFRFU1twYWxldHRlXSwgPGFueT5gJHsgcGFsZXR0ZSB9LXJvb3RgKTsgLy8gc2F2ZSBmb3Igcm9vdFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUZW1wb3Jhcnkgc2hvd2Nhc2UgbWV0aG9kLCBpbml0aWF0ZXMgdGhlIGNoYW5nZSBvZiB0aGUgdGhlbWUgcGFsZXR0ZXMgdG8gcmFuZG9tIGNvbG9yIHZhbHVlc1xuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdFRoZW1lRGVtbygpOiB2b2lkIHtcbiAgICAgICAgLy8gVE9ETzogbWF5YmUgaW50ZWdyYXRlIHdpdGggc29tZSBtdXNpYz9cbiAgICB9XG5cbn1cbiJdfQ==
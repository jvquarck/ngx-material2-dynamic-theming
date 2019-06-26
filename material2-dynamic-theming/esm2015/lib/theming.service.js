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
export class ThemingService {
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
/** @nocollapse */ ThemingService.ngInjectableDef = i0.defineInjectable({ factory: function ThemingService_Factory() { return new ThemingService(i0.inject(i0.ApplicationRef), i0.inject(i1.DOCUMENT)); }, token: ThemingService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWF0ZXJpYWwyLWR5bmFtaWMtdGhlbWluZy8iLCJzb3VyY2VzIjpbImxpYi90aGVtaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQWMsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUvRSxPQUFPLEVBQUUsc0JBQXNCLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDbkMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN0QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7QUFPN0QsTUFBTSxPQUFPLGNBQWM7Ozs7O0lBS3ZCLFlBQ1ksTUFBc0IsRUFDSixRQUFhO1FBRC9CLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ0osYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUxuQyxxQkFBZ0IsR0FBdUMsSUFBSSxlQUFlLENBQW9CLHNCQUFzQixDQUFDLENBQUM7UUFPMUgsNERBQTREO1FBQzVELDhCQUE4QjtJQUNsQyxDQUFDOzs7Ozs7Ozs7SUFRTSxpQkFBaUIsQ0FBQyxVQUFzQixFQUFFLFlBQW9DLEVBQUUsV0FBcUIsRUFDeEcsT0FBNkI7UUFDN0IsV0FBVyxDQUFDLDBCQUEwQixDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNGLENBQUM7Ozs7Ozs7O0lBT00sd0JBQXdCLENBQUMsWUFBb0MsRUFBRSxXQUFxQixFQUFFLE9BQTZCO1FBQ3RILFdBQVcsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDaEcsV0FBVyxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsWUFBWSxFQUFFLG1CQUFLLEdBQUksV0FBWSxPQUFPLEVBQUEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLGdCQUFnQjs7O2NBQzVILGVBQWUsR0FBUSxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQztRQUNsRSxlQUFlLENBQUMsV0FBVyxDQUFDLEdBQUcsWUFBWSxDQUFDO1FBQzVDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Ozs7O0lBTU0sb0JBQW9CLENBQUMsT0FBaUI7UUFDekMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUM3QixLQUFLLENBQUMsT0FBTyxDQUFDLEVBQ2Qsb0JBQW9CLEVBQUUsQ0FDekIsQ0FBQztJQUNOLENBQUM7Ozs7Ozs7SUFPTSxtQkFBbUIsQ0FBQyxXQUFxQixFQUFFLE1BQWtCLElBQUksQ0FBQyxjQUFjOztjQUM3RSx1QkFBdUIsR0FDekIsV0FBVyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsK0JBQStCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDOztjQUNsRywrQkFBK0IsR0FDakMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsK0JBQStCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hHLE9BQU87WUFDSCxPQUFPLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO1lBQ25DLE9BQU8sRUFBRSx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7WUFDbkMsTUFBTSxFQUFFLHVCQUF1QixDQUFDLENBQUMsQ0FBQztZQUNsQyxLQUFLLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLFFBQVEsRUFBRTtnQkFDTixPQUFPLEVBQUUsK0JBQStCLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxPQUFPLEVBQUUsK0JBQStCLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLEVBQUUsK0JBQStCLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxLQUFLLEVBQUUsK0JBQStCLENBQUMsQ0FBQyxDQUFDO2FBQzVDO1NBQ0osQ0FBQztJQUNOLENBQUM7Ozs7OztJQU1NLFVBQVUsQ0FBQyxPQUFpQjtRQUMvQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Ozs7O0lBS08sbUJBQW1CO1FBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLE9BQWlCLEVBQUUsRUFBRTtZQUNuRSxXQUFXLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN0RyxXQUFXLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxtQkFBSyxHQUFJLE9BQVEsT0FBTyxFQUFBLENBQUMsQ0FBQyxDQUFDLGdCQUFnQjtRQUM1SSxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUtPLGFBQWE7UUFDakIseUNBQXlDO0lBQzdDLENBQUM7OztZQWhHSixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7O1lBYnpCLGNBQWM7NENBcUJkLE1BQU0sU0FBQyxRQUFROzs7Ozs7OztJQUxwQiwwQ0FBOEg7Ozs7O0lBQzlILHdDQUE0Qzs7Ozs7SUFHeEMsZ0NBQThCOzs7OztJQUM5QixrQ0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBsaWNhdGlvblJlZiwgRWxlbWVudFJlZiwgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWxldHRlcywgUGFsZXR0ZVZhbHVlcywgVGhlbWluZ0V4dHJhT3B0aW9ucyB9IGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuaW1wb3J0IHsgREVGQVVMVF9USEVNRV9QQUxFVFRFUywgUGFsZXR0ZVZhbHVlc1R5cGUgfSBmcm9tICcuL2RlZmluaXRpb25zJztcbmltcG9ydCB7IGRlZXBDb3B5IH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBUaGVtaW5nVXRpbCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgcGx1Y2sgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICogIFJhdGlvbmFsZTogVGhpcyBwcm92aWRlciBpcyBhIHNpbmdsZXRvbiBhbmQgc2hvdWxkIGJlIGluamVjdGVkIG9ubHkgb25jZSwgc2luY2UgaXQgc3R5bGVzIHRoZSBhcHBsaWNhdGlvbiB3aGVuIGNvbnN0cnVjdG9yIGlzIGV4ZWN1dGVkXG4gKiAgUGl0ZmFsbDogWU9VIE1VU1QgTk9UIHByb3ZpZGUgdGhpcyBzZXJ2aWNlIHZpYSBhIGNvbXBvbmVudCBkZWNvcmF0b3IsIGNvbXBvbmVudCBwcm92aWRlcnMgd29uJ3QgcmVzcGVjdCBgcHJvdmlkZWRJbjogJ3Jvb3QnYCBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBUaGVtaW5nU2VydmljZSB7XG5cbiAgICBwcml2YXRlIGN1cnJlbnRQYWxldHRlcyQ6IEJlaGF2aW9yU3ViamVjdDxQYWxldHRlVmFsdWVzVHlwZT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhbGV0dGVWYWx1ZXNUeXBlPihERUZBVUxUX1RIRU1FX1BBTEVUVEVTKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJvb3RFbGVtZW50UmVmOiBFbGVtZW50UmVmO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxuICAgICkge1xuICAgICAgICAvLyB0aGlzLnJvb3RFbGVtZW50UmVmID0gdGhpcy5hcHBSZWYuY29tcG9uZW50c1swXS5sb2NhdGlvbjtcbiAgICAgICAgLy8gdGhpcy5pbml0VGhlbWluZ1BhbGV0dGVzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB0aGVtaW5nIHBhbGV0dGUgZm9yIGEgZ2l2ZW4gc2NvcGUvZWxlbWVudFJlZlxuICAgICAqIEBwYXJhbSBlbGVtZW50UmVmXG4gICAgICogQHBhcmFtIHBhbGV0dGVWYWx1ZVxuICAgICAqIEBwYXJhbSBwYWxldHRlTmFtZVxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRUaGVtaW5nUGFsZXR0ZShlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwYWxldHRlVmFsdWU6IFBhbGV0dGVWYWx1ZXMgfCBzdHJpbmcsIHBhbGV0dGVOYW1lOiBQYWxldHRlcyxcbiAgICAgICAgb3B0aW9ucz86IFRoZW1pbmdFeHRyYU9wdGlvbnMpOiB2b2lkIHtcbiAgICAgICAgVGhlbWluZ1V0aWwuc2V0UGFsZXR0ZUN1c3RvbVByb3BlcnRpZXMoZWxlbWVudFJlZiwgcGFsZXR0ZVZhbHVlLCBwYWxldHRlTmFtZSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB0aGVtaW5nIHBhbGV0dGUgYXBwbGljYXRpb24gd2lkZVxuICAgICAqIEBwYXJhbSBwYWxldHRlVmFsdWVcbiAgICAgKiBAcGFyYW0gcGFsZXR0ZU5hbWVcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0VGhlbWluZ1BhbGV0dGVGb3JSb290KHBhbGV0dGVWYWx1ZTogUGFsZXR0ZVZhbHVlcyB8IHN0cmluZywgcGFsZXR0ZU5hbWU6IFBhbGV0dGVzLCBvcHRpb25zPzogVGhlbWluZ0V4dHJhT3B0aW9ucyk6IHZvaWQge1xuICAgICAgICBUaGVtaW5nVXRpbC5zZXRQYWxldHRlQ3VzdG9tUHJvcGVydGllcyh0aGlzLnJvb3RFbGVtZW50UmVmLCBwYWxldHRlVmFsdWUsIHBhbGV0dGVOYW1lLCBvcHRpb25zKTtcbiAgICAgICAgVGhlbWluZ1V0aWwuc2V0UGFsZXR0ZUN1c3RvbVByb3BlcnRpZXModGhpcy5yb290RWxlbWVudFJlZiwgcGFsZXR0ZVZhbHVlLCA8YW55PmAkeyBwYWxldHRlTmFtZSB9LXJvb3RgLCBvcHRpb25zKTsgLy8gc2F2ZSBmb3Igcm9vdFxuICAgICAgICBjb25zdCBkZWZhdWx0UGFsZXR0ZXM6IGFueSA9IGRlZXBDb3B5KHRoaXMuY3VycmVudFBhbGV0dGVzJC52YWx1ZSk7XG4gICAgICAgIGRlZmF1bHRQYWxldHRlc1twYWxldHRlTmFtZV0gPSBwYWxldHRlVmFsdWU7XG4gICAgICAgIHRoaXMuY3VycmVudFBhbGV0dGVzJC5uZXh0KGRlZmF1bHRQYWxldHRlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT2JzZXJ2YWJsZSB0aGF0IHdpbGwgcHVzaCBjaGFuZ2VzIHRvIHRoZSByZXF1ZXN0ZWQgcGFsZXR0ZVxuICAgICAqIEBwYXJhbSBwYWxldHRlIG5hbWUgb2YgdGhlIHBhbGV0dGVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UGFsZXR0ZU9ic2VydmFibGUocGFsZXR0ZTogUGFsZXR0ZXMpOiBPYnNlcnZhYmxlPFBhbGV0dGVWYWx1ZXMgfCBzdHJpbmcgfCB7fT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50UGFsZXR0ZXMkLnBpcGUoXG4gICAgICAgICAgICBwbHVjayhwYWxldHRlKSxcbiAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgcGFsZXR0ZSB2YWx1ZXMgZ2l2ZW4gYSBwYWxldHRlIG5hbWUgYW5kIGEgcmVmIChjb3VsZCBiZSBjdXJyZW50IGNvbXBvbmVudCBvciBhcHAgcm9vdClcbiAgICAgKiBAcGFyYW0gcGFsZXR0ZU5hbWUgbmFtZSBvZiB0aGUgcGFsZXR0ZSB3aGljaCB3ZSB3YW50IHRvIHF1ZXJ5IGFib3V0XG4gICAgICogQHBhcmFtIHJlZiBlbGVtZW50IHJlZiwgaGVscHMgbWFyayBjb250ZXh0XG4gICAgICovXG4gICAgcHVibGljIGdldERPTVBhbGV0dGVWYWx1ZXMocGFsZXR0ZU5hbWU6IFBhbGV0dGVzLCByZWY6IEVsZW1lbnRSZWYgPSB0aGlzLnJvb3RFbGVtZW50UmVmKTogUGFsZXR0ZVZhbHVlcyB7XG4gICAgICAgIGNvbnN0IHBhbGV0dGVDdXN0b21Qcm9wZXJ0aWVzID1cbiAgICAgICAgICAgIFRoZW1pbmdVdGlsLmdldEN1c3RvbVByb3BlcnRpZXMocmVmLCBUaGVtaW5nVXRpbC5nZXRQYWxldHRlQ3VzdG9tUHJvcGVydGllc05hbWVzKHBhbGV0dGVOYW1lLCB0cnVlKSk7XG4gICAgICAgIGNvbnN0IHBhbGV0dGVDdXN0b21Qcm9wZXJ0aWVzQ29udHJhc3QgPVxuICAgICAgICAgICAgVGhlbWluZ1V0aWwuZ2V0Q3VzdG9tUHJvcGVydGllcyhyZWYsIFRoZW1pbmdVdGlsLmdldFBhbGV0dGVDdXN0b21Qcm9wZXJ0aWVzTmFtZXMocGFsZXR0ZU5hbWUsIHRydWUpKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHBhbGV0dGVDdXN0b21Qcm9wZXJ0aWVzWzBdLFxuICAgICAgICAgICAgbGlnaHRlcjogcGFsZXR0ZUN1c3RvbVByb3BlcnRpZXNbMV0sXG4gICAgICAgICAgICBkYXJrZXI6IHBhbGV0dGVDdXN0b21Qcm9wZXJ0aWVzWzJdLFxuICAgICAgICAgICAgaG92ZXI6IHBhbGV0dGVDdXN0b21Qcm9wZXJ0aWVzWzNdLFxuICAgICAgICAgICAgY29udHJhc3Q6IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiBwYWxldHRlQ3VzdG9tUHJvcGVydGllc0NvbnRyYXN0WzBdLFxuICAgICAgICAgICAgICAgIGxpZ2h0ZXI6IHBhbGV0dGVDdXN0b21Qcm9wZXJ0aWVzQ29udHJhc3RbMV0sXG4gICAgICAgICAgICAgICAgZGFya2VyOiBwYWxldHRlQ3VzdG9tUHJvcGVydGllc0NvbnRyYXN0WzJdLFxuICAgICAgICAgICAgICAgIGhvdmVyOiBwYWxldHRlQ3VzdG9tUHJvcGVydGllc0NvbnRyYXN0WzNdLFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBjdXJyZW50IHZhbHVlIG9mIHRoZSBwYWxldHRlXG4gICAgICogQHBhcmFtIHBhbGV0dGUgbmFtZSBvZiB0aGUgcGFsZXR0ZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRQYWxldHRlKHBhbGV0dGU6IFBhbGV0dGVzKTogUGFsZXR0ZVZhbHVlcyB8IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRQYWxldHRlcyQudmFsdWVbcGFsZXR0ZV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBhcHBsaWNhdGlvbiB0aGVtaW5nIHBhbGV0dGVzXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0VGhlbWluZ1BhbGV0dGVzKCk6IHZvaWQge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmN1cnJlbnRQYWxldHRlcyQudmFsdWUpLmZvckVhY2goKHBhbGV0dGU6IFBhbGV0dGVzKSA9PiB7XG4gICAgICAgICAgICBUaGVtaW5nVXRpbC5zZXRQYWxldHRlQ3VzdG9tUHJvcGVydGllcyh0aGlzLnJvb3RFbGVtZW50UmVmLCBERUZBVUxUX1RIRU1FX1BBTEVUVEVTW3BhbGV0dGVdLCBwYWxldHRlKTtcbiAgICAgICAgICAgIFRoZW1pbmdVdGlsLnNldFBhbGV0dGVDdXN0b21Qcm9wZXJ0aWVzKHRoaXMucm9vdEVsZW1lbnRSZWYsIERFRkFVTFRfVEhFTUVfUEFMRVRURVNbcGFsZXR0ZV0sIDxhbnk+YCR7IHBhbGV0dGUgfS1yb290YCk7IC8vIHNhdmUgZm9yIHJvb3RcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGVtcG9yYXJ5IHNob3djYXNlIG1ldGhvZCwgaW5pdGlhdGVzIHRoZSBjaGFuZ2Ugb2YgdGhlIHRoZW1lIHBhbGV0dGVzIHRvIHJhbmRvbSBjb2xvciB2YWx1ZXNcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXRUaGVtZURlbW8oKTogdm9pZCB7XG4gICAgICAgIC8vIFRPRE86IG1heWJlIGludGVncmF0ZSB3aXRoIHNvbWUgbXVzaWM/XG4gICAgfVxuXG59XG4iXX0=
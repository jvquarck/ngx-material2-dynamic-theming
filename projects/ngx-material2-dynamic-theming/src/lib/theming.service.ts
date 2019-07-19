import { ApplicationRef, ElementRef, Inject, Injectable } from '@angular/core';
import { Palettes, PaletteValues, ThemingExtraOptions } from './definitions';
import { DEFAULT_THEME_PALETTES, PaletteValuesType } from './definitions';
import { deepCopy } from './utils';
import { ThemingUtil } from './utils';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck, filter } from 'rxjs/operators';

/**
 *  Rationale: This provider is a singleton and should be injected only once, since it styles the application when constructor is executed
 *  Pitfall: YOU MUST NOT provide this service via a component decorator, component providers won't respect `providedIn: 'root'` property value.
 */
@Injectable({ providedIn: 'root' })
export class ThemingService {

    private currentPalettes$: BehaviorSubject<PaletteValuesType> = new BehaviorSubject<PaletteValuesType>(DEFAULT_THEME_PALETTES);
    private rootElementRef: ElementRef;

    constructor(
        private appRef: ApplicationRef,
        @Inject(DOCUMENT) private document: any,
    ) {
      /* this.appRef.isStable.pipe(filter(stable => stable))
        .subscribe(() => {
          if (this.appRef.components && this.appRef.components[0] && this.appRef.components[0].location) {
            this.rootElementRef = this.appRef.components[0].location;
            this.initThemingPalettes();
          }
        }); */
    }

    /**
     * Set the theming palette for a given scope/elementRef
     * @param elementRef
     * @param paletteValue
     * @param paletteName
     */
    public setThemingPalette(elementRef: ElementRef, paletteValue: PaletteValues | string, paletteName: Palettes,
        options?: ThemingExtraOptions): void {
        ThemingUtil.setPaletteCustomProperties(elementRef, paletteValue, paletteName, options);
    }

    /**
     * Set the theming palette application wide
     * @param paletteValue
     * @param paletteName
     */
    public setThemingPaletteForRoot(paletteValue: PaletteValues | string, paletteName: Palettes, options?: ThemingExtraOptions): void {
        ThemingUtil.setPaletteCustomProperties(this.rootElementRef, paletteValue, paletteName, options);
        ThemingUtil.setPaletteCustomProperties(this.rootElementRef, paletteValue, <any>`${ paletteName }-root`, options); // save for root
        const defaultPalettes: any = deepCopy(this.currentPalettes$.value);
        defaultPalettes[paletteName] = paletteValue;
        this.currentPalettes$.next(defaultPalettes);
    }

    /**
     * Observable that will push changes to the requested palette
     * @param palette name of the palette
     */
    public getPaletteObservable(palette: Palettes): Observable<PaletteValues | string | {}> {
        return this.currentPalettes$.pipe(
            pluck(palette),
            distinctUntilChanged()
        );
    }

    /**
     * Get palette values given a palette name and a ref (could be current component or app root)
     * @param paletteName name of the palette which we want to query about
     * @param ref element ref, helps mark context
     */
    public getDOMPaletteValues(paletteName: Palettes, ref: ElementRef = this.rootElementRef): PaletteValues {
        const paletteCustomProperties =
            ThemingUtil.getCustomProperties(ref, ThemingUtil.getPaletteCustomPropertiesNames(paletteName, false));
        const paletteCustomPropertiesContrast =
            ThemingUtil.getCustomProperties(ref, ThemingUtil.getPaletteCustomPropertiesNames(paletteName, true));
        return { ...paletteCustomProperties, ...{ contrast: paletteCustomPropertiesContrast }};
    }

    /**
     * Get current value of the palette
     * @param palette name of the palette
     */
    public getPalette(palette: Palettes): PaletteValues | string {
        return this.currentPalettes$.value[palette];
    }

    /**
     * Initialize application theming palettes
     */
    private initThemingPalettes(): void {
        Object.keys(this.currentPalettes$.value).forEach((palette: Palettes) => {
            ThemingUtil.setPaletteCustomProperties(this.rootElementRef, DEFAULT_THEME_PALETTES[palette], palette);
            ThemingUtil.setPaletteCustomProperties(this.rootElementRef, DEFAULT_THEME_PALETTES[palette], <any>`${ palette }-root`); // save for root
        });
    }

    /**
     * Temporary showcase method, initiates the change of the theme palettes to random color values
     */
    private initThemeDemo(): void {
        // TODO: maybe integrate with some music?
    }

}

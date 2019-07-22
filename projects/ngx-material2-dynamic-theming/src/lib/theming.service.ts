import { ApplicationRef, ElementRef, Inject, Injectable } from '@angular/core';
import { Palettes, PaletteValues, ThemingExtraOptions, ThemingOptions } from './definitions';
import { PaletteValuesType } from './definitions';
import { deepCopy } from './utils';
import { ThemingUtil } from './utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck, filter, first } from 'rxjs/operators';
import { ThemingModule, DYNAMIC_THEMING_OPTIONS } from './theming.module';

@Injectable({ providedIn: ThemingModule })
export class ThemingService {

    private currentPalettes$: BehaviorSubject<PaletteValuesType> = new BehaviorSubject<PaletteValuesType>(this.themingOptions.palettes as PaletteValuesType);
    private rootElementRef: ElementRef;

    constructor(
        private appRef: ApplicationRef,
        @Inject(DYNAMIC_THEMING_OPTIONS) private themingOptions: ThemingOptions,
    ) {
      this.appRef.isStable.pipe(
          filter(stable => stable),
          first(),
        )
        .subscribe(() => {
          if (this.appRef.components && this.appRef.components[0] && this.appRef.components[0].location) {
            this.rootElementRef = this.appRef.components[0].location;
            this.initThemingPalettes();
          }
        });
    }

    /**
     * Set a palette for a specific ElementRef
     * @param elementRef
     * @param paletteValue
     * @param paletteName
     */
    public setPalette(elementRef: ElementRef, paletteValue: PaletteValues | string, paletteName: Palettes,
        options?: ThemingExtraOptions): void {
        ThemingUtil.setPaletteCustomProperties(elementRef, paletteValue, paletteName, this.getExtraOptions(options));
    }

    /**
     * Set a palette in the application root
     * @param paletteValue
     * @param paletteName
     */
    public setPaletteForRoot(paletteValue: PaletteValues | string, paletteName: Palettes, options?: ThemingExtraOptions): void {
        ThemingUtil.setPaletteCustomProperties(this.rootElementRef, paletteValue, paletteName, this.getExtraOptions(options));
        ThemingUtil.setPaletteCustomProperties(this.rootElementRef, paletteValue, <any>`${ paletteName }-root`, this.getExtraOptions(options)); // save for root
        const defaultPalettes: any = deepCopy(this.currentPalettes$.value);
        defaultPalettes[paletteName] = paletteValue;
        this.currentPalettes$.next(defaultPalettes);
    }

    /**
     * Observable that emits changes for a selected palette
     * @param palette palette name
     */
    public getPaletteChanges(palette: Palettes): Observable<PaletteValues | string | {}> {
        return this.currentPalettes$.pipe(
            pluck(palette),
            distinctUntilChanged()
        );
    }

    /**
     * Retrieve palette values from the DOM checking the ElementRef custom properties
     * @param paletteName name of the desired palette
     * @param ref element ref to query
     */
    public getPaletteValuesFromDOM(paletteName: Palettes, ref: ElementRef = this.rootElementRef): PaletteValues {
        const paletteCustomProperties =
            ThemingUtil.getCustomProperties(ref, ThemingUtil.getPaletteCustomPropertiesNames(paletteName, false));
        const paletteCustomPropertiesContrast =
            ThemingUtil.getCustomProperties(ref, ThemingUtil.getPaletteCustomPropertiesNames(paletteName, true));
        return { ...paletteCustomProperties, ...{ contrast: paletteCustomPropertiesContrast }};
    }

    /**
     * Get application root value of a palette
     * @param palette name of the desired palette
     */
    public getPalette(palette: Palettes): PaletteValues | string {
        return this.currentPalettes$.value[palette];
    }

    /**
     * Extend provided options with the ones provided in the token via forRoot
     * @param options
     * @internal
     */
    private getExtraOptions(options: ThemingExtraOptions = {}) {
      return {...this.themingOptions.extra, ...options };
    }

    /**
     * Initialize application theming palettes
     */
    private initThemingPalettes(): void {
        Object.keys(this.currentPalettes$.value).forEach((palette: Palettes) => {
            ThemingUtil.setPaletteCustomProperties(this.rootElementRef, this.themingOptions.palettes[palette], palette, this.getExtraOptions());
            ThemingUtil.setPaletteCustomProperties(this.rootElementRef, this.themingOptions.palettes[palette], <any>`${ palette }-root`, this.getExtraOptions()); // save for root
        });
    }

}

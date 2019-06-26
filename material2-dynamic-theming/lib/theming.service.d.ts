import { ApplicationRef, ElementRef } from '@angular/core';
import { Palettes, PaletteValues, ThemingExtraOptions } from './definitions';
import { Observable } from 'rxjs';
/**
 *  Rationale: This provider is a singleton and should be injected only once, since it styles the application when constructor is executed
 *  Pitfall: YOU MUST NOT provide this service via a component decorator, component providers won't respect `providedIn: 'root'` property value.
 */
export declare class ThemingService {
    private appRef;
    private document;
    private currentPalettes$;
    private readonly rootElementRef;
    constructor(appRef: ApplicationRef, document: any);
    /**
     * Set the theming palette for a given scope/elementRef
     * @param elementRef
     * @param paletteValue
     * @param paletteName
     */
    setThemingPalette(elementRef: ElementRef, paletteValue: PaletteValues | string, paletteName: Palettes, options?: ThemingExtraOptions): void;
    /**
     * Set the theming palette application wide
     * @param paletteValue
     * @param paletteName
     */
    setThemingPaletteForRoot(paletteValue: PaletteValues | string, paletteName: Palettes, options?: ThemingExtraOptions): void;
    /**
     * Observable that will push changes to the requested palette
     * @param palette name of the palette
     */
    getPaletteObservable(palette: Palettes): Observable<PaletteValues | string | {}>;
    /**
     * Get palette values given a palette name and a ref (could be current component or app root)
     * @param paletteName name of the palette which we want to query about
     * @param ref element ref, helps mark context
     */
    getDOMPaletteValues(paletteName: Palettes, ref?: ElementRef): PaletteValues;
    /**
     * Get current value of the palette
     * @param palette name of the palette
     */
    getPalette(palette: Palettes): PaletteValues | string;
    /**
     * Initialize application theming palettes
     */
    private initThemingPalettes;
    /**
     * Temporary showcase method, initiates the change of the theme palettes to random color values
     */
    private initThemeDemo;
}

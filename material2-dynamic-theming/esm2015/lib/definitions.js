/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function PaletteValues() { }
if (false) {
    /** @type {?} */
    PaletteValues.prototype.default;
    /** @type {?|undefined} */
    PaletteValues.prototype.lighter;
    /** @type {?|undefined} */
    PaletteValues.prototype.darker;
    /** @type {?|undefined} */
    PaletteValues.prototype.hover;
    /** @type {?|undefined} */
    PaletteValues.prototype.contrast;
}
/**
 * @record
 */
export function ThemingExtraOptions() { }
if (false) {
    /** @type {?} */
    ThemingExtraOptions.prototype.autoAdjust;
    /** @type {?|undefined} */
    ThemingExtraOptions.prototype.brightnessFactor;
}
/** @enum {string} */
const Palettes = {
    primary: 'primary',
    secondary: 'secondary',
    warn: 'warn',
    dark: 'dark',
};
export { Palettes };
/** @enum {string} */
const CommonPaletteValues = {
    Default: 'default',
    Lighter: 'lighter',
    Darker: 'darker',
    Hover: 'hover',
};
export { CommonPaletteValues };
/** @type {?} */
export const OPACITY_FACTOR = .4;
/** @type {?} */
export const HOVER_OPACITY_FACTOR = .2;
/** @type {?} */
export const FOREGROUND_COLORS_BRIGHT_FACTOR = 200;
/** @type {?} */
export const BACKGROUND_COLORS_BRIGHT_FACTOR = 245;
/** @type {?} */
export const AUTO_GENERATE_FOREGROUNDS = true;
/** @type {?} */
export const DEFAULT_THEME_PALETTES = {
    primary: '#3F51B5',
    secondary: '#FFD31F',
    dark: '#616161',
    warn: '#F44336',
};
/** @type {?} */
export const DEFAULT_THEMING_EXTRA_OPTIONS = {
    autoAdjust: false,
    brightnessFactor: BACKGROUND_COLORS_BRIGHT_FACTOR
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXRlcmlhbDItZHluYW1pYy10aGVtaW5nLyIsInNvdXJjZXMiOlsibGliL2RlZmluaXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxtQ0FXQzs7O0lBVkMsZ0NBQWdCOztJQUNoQixnQ0FBaUI7O0lBQ2pCLCtCQUFnQjs7SUFDaEIsOEJBQWU7O0lBQ2YsaUNBS0U7Ozs7O0FBR0oseUNBR0M7OztJQUZDLHlDQUFvQjs7SUFDcEIsK0NBQTBCOzs7O0lBSTFCLFNBQVUsU0FBUztJQUNuQixXQUFZLFdBQVc7SUFDdkIsTUFBTyxNQUFNO0lBQ2IsTUFBTyxNQUFNOzs7OztJQUliLFNBQVUsU0FBUztJQUNuQixTQUFVLFNBQVM7SUFDbkIsUUFBUyxRQUFRO0lBQ2pCLE9BQVEsT0FBTzs7OztBQU9qQixNQUFNLE9BQU8sY0FBYyxHQUFHLEVBQUU7O0FBQ2hDLE1BQU0sT0FBTyxvQkFBb0IsR0FBRyxFQUFFOztBQUN0QyxNQUFNLE9BQU8sK0JBQStCLEdBQUcsR0FBRzs7QUFDbEQsTUFBTSxPQUFPLCtCQUErQixHQUFHLEdBQUc7O0FBQ2xELE1BQU0sT0FBTyx5QkFBeUIsR0FBRyxJQUFJOztBQUU3QyxNQUFNLE9BQU8sc0JBQXNCLEdBQXNCO0lBQ3JELE9BQU8sRUFBRSxTQUFTO0lBQ2xCLFNBQVMsRUFBRSxTQUFTO0lBQ3BCLElBQUksRUFBRSxTQUFTO0lBQ2YsSUFBSSxFQUFFLFNBQVM7Q0FDbEI7O0FBRUQsTUFBTSxPQUFPLDZCQUE2QixHQUF3QjtJQUM5RCxVQUFVLEVBQUUsS0FBSztJQUNqQixnQkFBZ0IsRUFBRSwrQkFBK0I7Q0FDcEQiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIFBhbGV0dGVWYWx1ZXMge1xuICBkZWZhdWx0OiBzdHJpbmc7XG4gIGxpZ2h0ZXI/OiBzdHJpbmc7XG4gIGRhcmtlcj86IHN0cmluZztcbiAgaG92ZXI/OiBzdHJpbmc7XG4gIGNvbnRyYXN0Pzoge1xuICAgICAgZGVmYXVsdD86IHN0cmluZztcbiAgICAgIGxpZ2h0ZXI/OiBzdHJpbmc7XG4gICAgICBkYXJrZXI/OiBzdHJpbmc7XG4gICAgICBob3Zlcj86IHN0cmluZztcbiAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUaGVtaW5nRXh0cmFPcHRpb25zIHtcbiAgYXV0b0FkanVzdDogYm9vbGVhbjsgLy8gSWYgdHJ1ZSwgY2hlY2sgaWYgdGhlIGRlcml2ZWQgY29sb3JzIGZyb20gdGhlIGRlZmF1bHQgb25lIG5lZWQgc29tZSBleHRyYSBhZGp1c3RpbmcgYmFzZWQgb24gJ2JyaWdodG5lc3NGYWN0b3InIHByb3BlcnR5LlxuICBicmlnaHRuZXNzRmFjdG9yPzogbnVtYmVyO1xufVxuXG5leHBvcnQgZW51bSBQYWxldHRlcyB7XG4gIHByaW1hcnkgPSAncHJpbWFyeScsXG4gIHNlY29uZGFyeSA9ICdzZWNvbmRhcnknLFxuICB3YXJuID0gJ3dhcm4nLFxuICBkYXJrID0gJ2RhcmsnLFxufVxuXG5leHBvcnQgZW51bSBDb21tb25QYWxldHRlVmFsdWVzIHtcbiAgRGVmYXVsdCA9ICdkZWZhdWx0JyxcbiAgTGlnaHRlciA9ICdsaWdodGVyJyxcbiAgRGFya2VyID0gJ2RhcmtlcicsXG4gIEhvdmVyID0gJ2hvdmVyJyxcbn1cblxuZXhwb3J0IHR5cGUgUGFsZXR0ZU1hcDxDIGV4dGVuZHMgb2JqZWN0LCBUPiA9IHsgW1AgaW4ga2V5b2YgQ106IFQgfTtcblxuZXhwb3J0IHR5cGUgUGFsZXR0ZVZhbHVlc1R5cGUgPSBQYWxldHRlTWFwPHR5cGVvZiBQYWxldHRlcywgUGFsZXR0ZVZhbHVlcyB8IHN0cmluZz47XG5cbmV4cG9ydCBjb25zdCBPUEFDSVRZX0ZBQ1RPUiA9IC40O1xuZXhwb3J0IGNvbnN0IEhPVkVSX09QQUNJVFlfRkFDVE9SID0gLjI7XG5leHBvcnQgY29uc3QgRk9SRUdST1VORF9DT0xPUlNfQlJJR0hUX0ZBQ1RPUiA9IDIwMDtcbmV4cG9ydCBjb25zdCBCQUNLR1JPVU5EX0NPTE9SU19CUklHSFRfRkFDVE9SID0gMjQ1O1xuZXhwb3J0IGNvbnN0IEFVVE9fR0VORVJBVEVfRk9SRUdST1VORFMgPSB0cnVlO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9USEVNRV9QQUxFVFRFUzogUGFsZXR0ZVZhbHVlc1R5cGUgPSB7XG4gICAgcHJpbWFyeTogJyMzRjUxQjUnLFxuICAgIHNlY29uZGFyeTogJyNGRkQzMUYnLFxuICAgIGRhcms6ICcjNjE2MTYxJyxcbiAgICB3YXJuOiAnI0Y0NDMzNicsXG59O1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9USEVNSU5HX0VYVFJBX09QVElPTlM6IFRoZW1pbmdFeHRyYU9wdGlvbnMgPSB7XG4gICAgYXV0b0FkanVzdDogZmFsc2UsXG4gICAgYnJpZ2h0bmVzc0ZhY3RvcjogQkFDS0dST1VORF9DT0xPUlNfQlJJR0hUX0ZBQ1RPUlxufTtcbiJdfQ==
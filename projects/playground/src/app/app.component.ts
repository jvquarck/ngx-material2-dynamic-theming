import { Component, Inject } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';
import { Palettes, ThemingService, deepCopy, GRADIENTS_K, generateRandomHexColor, DYNAMIC_THEMING_OPTIONS, ThemingOptions, PaletteValuesType } from 'projects/ngx-material2-dynamic-theming/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  colors: Partial<PaletteValuesType> = {};
  title = 'playground';
  palettes = Palettes;
  contrastRatio: number = this.themingOptions.extra.contrastRatio;

  private originalColors = this.themingOptions.palettes;

  constructor(
    private themingService: ThemingService,
    @Inject(DYNAMIC_THEMING_OPTIONS) private themingOptions: ThemingOptions,
  ) {
    this.colors = deepCopy(this.originalColors);
  }

  onContrastFactorChange(value: number): void {
    this.contrastRatio = value;
    Object.keys(this.colors).forEach(key => {
      this.onColorChange(this.colors[key], key as Palettes);
    });
  }

  onRandomGradientSettingChange(value: MatSlideToggleChange): void {
    if (value.checked) {
      Object.keys(this.colors).forEach((key) => {
        this.colors[key] = this.getRandomColorPalette(this.colors[key]);
        this.onColorChange(this.colors[key], key as Palettes);
      });
    } else {
      this.setOriginalColors();
      this.onContrastFactorChange(this.contrastRatio);
    }
  }

  onColorChange(color: string, palette: Palettes) {
    this.colors[`${palette}`] = color;
    this.themingService.setPaletteForRoot(color, palette, {
      contrastRatio: this.contrastRatio,
    });
  }

  private setOriginalColors(): void {
    this.colors = {
      primary: this.originalColors.primary,
      secondary: this.originalColors.secondary,
      warn: this.originalColors.warn,
    };
  }

  private getRandomColorPalette(color: string): any {
    let gradientIndex = Math.floor(Math.random() * Object.keys(GRADIENTS_K).length);
    if (gradientIndex === 5) gradientIndex++;
    const gradientKey = Object.keys(GRADIENTS_K)[gradientIndex]
    const randomPalette = {};
    randomPalette[500] = color;
    randomPalette[gradientKey] = generateRandomHexColor();
    randomPalette['contrast'] = {};
    randomPalette['contrast'][gradientKey] = generateRandomHexColor();
    return randomPalette;
  }
}

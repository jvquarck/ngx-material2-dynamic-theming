import { Component, ElementRef, OnInit } from '@angular/core';
import { ThemingService, Palettes, GRADIENTS_K, generateRandomHexColor } from '../../../ngx-material2-dynamic-theming/src/public-api';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  colors: { [key in Palettes]?: string } = {};
  title = 'playground';
  palettes = Palettes;
  contrastRatio: number = 4.5;

  private originalColors = {
    primary: '#00a0b2',
    secondary: '#9355b7',
    warn: '#f44336',
  };

  constructor(
    private themingService: ThemingService,
    private elementRef: ElementRef,
  ) {
  }

  ngOnInit(): void {
    this.onContrastFactorChange(this.contrastRatio);
  }

  onContrastFactorChange(value: number): void {
    this.contrastRatio = value;
    Object.keys(this.colors).forEach((key: Palettes) => {
      this.onColorChange(this.colors[key], key);
    });
  }

  onRandomGradientSettingChange(value: MatSlideToggleChange): void {
    if (value.checked) {
      Object.keys(this.colors).forEach((key: Palettes) => {
        this.colors[key] = this.getRandomColorPalette(this.colors[key]);
        this.onColorChange(this.colors[key], key);
      });
    } else {
      this.setOriginalColors();
      this.onContrastFactorChange(this.contrastRatio);
    }
  }

  onColorChange(color: string, palette: Palettes) {
    this.colors[palette] = color;
    this.themingService.setThemingPalette(this.elementRef, color, palette, {
      autoAdjust: true,
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
    return randomPalette;
  }
}

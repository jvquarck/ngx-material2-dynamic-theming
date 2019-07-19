import { Component, ElementRef, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ThemingService, Palettes, ThemingUtil } from '../../../ngx-material2-dynamic-theming/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  colors: { [key in Palettes]?: string } = {
    primary: '#00a0b2',
    secondary: '#9355b7',
    warn: '#f44336',
  };
  title = 'playground';
  palettes = Palettes;
  contrastRatio: number = 4.5;

  constructor(
    private themingService: ThemingService,
    private elementRef: ElementRef,
  ) {}

  ngAfterViewInit(): void {
    this.onContrastFactorChange(this.contrastRatio);
  }

  onContrastFactorChange(value: number): void {
    this.contrastRatio = value;
    Object.keys(this.colors).forEach((key: Palettes) => {
      this.onColorChange(this.colors[key], key);
    });
  }

  onColorChange(color: string, palette: Palettes) {
    this.colors[palette] = color;
    this.themingService.setThemingPalette(this.elementRef, color, palette, {
      autoAdjust: true,
      contrastRatio: this.contrastRatio,
    });
  }
}

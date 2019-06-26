import { Component, ElementRef, OnInit } from '@angular/core';
import { ThemingService, Palettes, PaletteValues } from '../../../ngx-material2-dynamic-theming/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  colorPrimary: any = '#000000';
  colorSecondary: any = '#000000';
  colorWarn: any = '#000000';
  title = 'playground';
  palettes = Palettes;
  contrastFactor: number = 4.5;

  constructor(
    private themingService: ThemingService,
    private elementRef: ElementRef,
  ) {}

  ngOnInit(): void {
    this.colorPrimary = this.themingService.getDOMPaletteValues(Palettes.primary, this.elementRef)[500];
    this.colorSecondary = this.themingService.getDOMPaletteValues(Palettes.secondary, this.elementRef)[500];
    this.colorWarn = this.themingService.getDOMPaletteValues(Palettes.warn, this.elementRef)[500];
  }

  onColorChange(color: string, palette: Palettes) {
    this.themingService.setThemingPalette(this.elementRef, color, palette, {
      autoAdjust: true,
      brightnessFactor: 0.1,
    });
  }
}

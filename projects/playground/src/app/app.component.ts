import { Component, ElementRef, OnInit } from '@angular/core';
import { ThemingService, Palettes, PaletteValues } from '../../../material2-dynamic-theming/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  colorPrimary: string = '#000000';
  colorSecondary: string = '#000000';
  colorWarn: string = '#000000';
  title = 'playground';
  palettes = Palettes;
  contrastFactor: number = 4.5;

  constructor(
    private themingService: ThemingService,
    private elementRef: ElementRef,
  ) {}

  ngOnInit(): void {
    this.colorPrimary = this.themingService.getPalette(Palettes.primary) as string;
    this.colorSecondary = this.themingService.getPalette(Palettes.secondary) as string;
    this.colorWarn = this.themingService.getPalette(Palettes.warn) as string;
  }

  onColorChange(color: string, palette: Palettes) {
    this.themingService.setThemingPalette(this.elementRef, color, palette, {
      autoAdjust: true,
      brightnessFactor: 0.1,
    });
  }
}

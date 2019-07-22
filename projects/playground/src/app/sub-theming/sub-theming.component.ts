import { Component, OnInit, ElementRef } from '@angular/core';
import { ThemingService, Palettes, ThemingUtil } from 'projects/ngx-material2-dynamic-theming/src/public-api';

@Component({
  selector: 'app-sub-theming',
  templateUrl: './sub-theming.component.html',
  styleUrls: ['./sub-theming.component.scss']
})
export class SubThemingComponent implements OnInit {

  colors: { [key in Palettes]?: string } = {
    primary: '#F65158',
    secondary: '#FBDE44',
    warn: '#b21011',
  };
  palettes = Palettes;
  contrastRatio = 2.8;

  constructor(
    private themingService: ThemingService,
    private elementRef: ElementRef
    ) { }

    ngOnInit(): void {
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
      this.themingService.setPalette(this.elementRef, color, palette, {
        contrastRatio: this.contrastRatio,
      });
    }

}

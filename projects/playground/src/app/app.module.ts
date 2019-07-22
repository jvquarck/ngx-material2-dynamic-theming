import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from './material.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatGridListModule, MatIconModule, MatSliderModule } from '@angular/material';
import { SubThemingComponent } from './sub-theming/sub-theming.component';
import { ThemingModule } from '../../../ngx-material2-dynamic-theming/src/public-api';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SubThemingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatGridListModule,
    MatIconModule,
    MatSliderModule,
    FlexLayoutModule,
    FormsModule,
    ColorPickerModule,
    ThemingModule.forRoot({
      extra: {
        contrastRatio: 1.3,
      },
      palettes: {
        primary: '#00a0b2',
        secondary: '#9355b7',
        warn: '#f44336',
      }
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from './material.module';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
import { ThemingService } from '../../../ngx-material2-dynamic-theming/src/lib/theming.service';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatGridListModule, MatIconModule, MatSliderModule } from '@angular/material';
import { SubThemingComponent } from './sub-theming/sub-theming.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PostDialogComponent,
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
  ],
  providers: [ThemingService],
  entryComponents: [PostDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

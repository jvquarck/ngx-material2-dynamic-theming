import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { ThemingOptions, DEFAULT_THEMING_OPTIONS } from './definitions';

@NgModule()
export class ThemingModule {
  static forRoot(options: ThemingOptions = {}): ModuleWithProviders {

    return ({
      ngModule: ThemingModule,
      providers: [
        {
          provide: DYNAMIC_THEMING_OPTIONS,
          useValue: options,
        },
      ]
    });

  }
}

export const DYNAMIC_THEMING_OPTIONS = new InjectionToken<ThemingOptions>("forRoot() Default theming configuration");

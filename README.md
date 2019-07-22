# ngx-material2-dynamic-theming
Helper library, allows dynamic theming using custom properties for @angular/material2: https://github.com/angular/material2

## Features:
* Generate palettes from a single color
* Autogeneration of foreground/contrast color (white/black) with AA/AAA compliance or custom contrast acceptance value.
* Angular service to manage dynamic modification of palettes
* Scoped palettes (allows setting palettes only for a specific component tree)
* Retrieve palette values (getters for color values)

## Future Features:
* Directive to control palette settings under a certain component tree.

## Important notices:
* This library is in beta stage, it is missing some specs and some functionality may be glitchy or unusable under some circumstances (wrong setup with older browsers)

* The subthemes feature won't be available as far as I know to be usable for browsers not compatible with custom properties. Such browsers will also need the [css-vars-ponyfill](https://www.npmjs.com/package/css-vars-ponyfill) in order to work with this library (this is untested yet, please feel free to provide any feedback).

## Table of contents
* [Installation](#installation)
* [Usage](#usage)
* [API](#api)
* [FAQ](#faq)
* [Demo](#additional-framework-support)

## Installation

First you need to install the npm module (coming soon):

```sh
npm install ... --save
```

## Usage

### Usage SCSS

The prime requirement for using this library is to properly @import and @include resources from [@angular/components](https://github.com/angular/components) and this library.

```scss
// Include angular material theming
@import '~@angular/material/theming';

// Include mat-core before dynamic theming so it is properly monkey patched
@include mat-core();

// Include dynamic theming utils and patches
@import "ngx-material2-dynamic-theming/theming";
```
After angular material `mat-color()` and other functions are properly patched you can generate and ready your own palettes like this:

```scss
$primaryColor: #00A0B2;
$secondaryColor: #9355B7;
$warnColor: #F44336;

// generate palettes maps
$primaryPalette: mat-palette(auto-generate-palettes($primaryColor, 'primary', 1.25), 500);
$secondaryPalette: mat-palette(auto-generate-palettes($secondaryColor, 'secondary', 1.25), 500);
$warnPalette: mat-palette(auto-generate-palettes($warnColor, 'warn', 1.25), 500);

// generate theme maps
$some-theme: mat-light-theme($primaryPalette, $secondaryPalette, $warnPalette);

// generate theme
@include angular-material-theme($some-theme);
```
This will get you going with the basics for theming with @angular/components. Feel free to use just this part of the library. If you don't use/include any of the dynamic theming libraries utils, they won't be included in your bundle.

Refer to [API](#api) section for further information in `auto-generate-palettes` function.

### Usage TS (dynamic theming)

#### Bootstrapping

Once you have correctly configured the palettes, you can start using the dynamic theming capabilities of the library. First of all you'll need to import the ThemingModule into your application.

The `ThemingModule` has to be imported with `forRoot`. Via the `forRoot` you can provide initial `ThemingOptions` that will be kept as default values for your theming.

```typescript
...
imports: [
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
]
...
```

#### Dynamic changes

To change the theme dynamically on runtime you can invoke the method `setPaletteForRoot`:

```typescript
this.themingService.setPaletteForRoot('#b21011', 'warn', {
  contrastRatio: 2.5,
});
```

#### Subthemes

If you want to have parts of your application with different theming you can use the method `setPalette` which works the same as `setPaletteForRoot` but requires an additional first parameter which is the `ElementRef` of the component where you want to add your custom properties values.

```typescript
this.themingService.setPalette(this.elementRef, '#b21011', 'warn', {
  contrastRatio: 2.5,
});
```

**Important**: This is not yet tested and will doubtfully work in browsers that don't support custom properties.

## API

Coming soon

## FAQ

Coming soon

## Demo

You can access the demo/playground in [here](https://jvquarck.github.io/ngx-material2-dynamic-theming/index.html)


git@github.com:jvquarck/ngx-material2-dynamic-theming.git

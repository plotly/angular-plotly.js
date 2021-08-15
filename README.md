# angular-plotly.js


![angular-plotly-logo](angular-plotly.png)

> A [plotly.js](https://github.com/plotly/plotly.js) Angular component from
> [Plotly](https://plot.ly/).

[![CircleCI](https://circleci.com/gh/plotly/angular-plotly.js.svg?style=svg)](https://circleci.com/gh/plotly/angular-plotly.js)
[![Coverage Status](https://coveralls.io/repos/github/plotly/angular-plotly.js/badge.svg?branch=master&i=1)](https://coveralls.io/github/plotly/angular-plotly.js?branch=master&i=1)

---

Supports Angular 9.x and up. If you want to use with Angular 8.x, please use version [`angular-plotly.js@1.x`](https://github.com/plotly/angular-plotly.js/tree/1.x).


## Content

* [Installation](#installation)
* [Quick start](#quick-start)
* [API](#api-reference)
  * [Basic props](#basic-props)
  * [Event handler props](#event-handler-props)
* [Customizing the `plotly.js` bundle](#customizing-the-plotlyjs-bundle)
  * [Plotly Via CDN Module](#plotly-via-cdn-module)
  * [Plotly Via Window Module](#plotly-via-window-module)
* [Development](#development)

## Installation

Using the [angular CLI](https://cli.angular.io/) to start a new project
```bash
$ ng new my-project
$ cd my-project
$ npm install angular-plotly.js plotly.js-dist-min --save
$ npm install @types/plotly.js-dist-min --save-dev
```

## Quick start

Add the `PlotlyModule` into the main app module of your project
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
    imports: [CommonModule, PlotlyModule],
    ...
})
export class AppModule { }
```

Then use the `<plotly-plot>` component to display the graph
```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'plotly-example',
    template: '<plotly-plot [data]="graph.data" [layout]="graph.layout"></plotly-plot>',
})
export class PlotlyExampleComponent {
    public graph = {
        data: [
            { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: {color: 'red'} },
            { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
        ],
        layout: {width: 320, height: 240, title: 'A Fancy Plot'}
    };
}
```

You should see a plot like this:

<p align="center">
    <img src="example.png" alt="Example plot" width="320" height="240">
</p>


For a full description of Plotly chart types and attributes see the following resources:

* [Plotly JavaScript API documentation](https://plot.ly/javascript/)
* [Full plotly.js attribute listing](https://plot.ly/javascript/reference/)

The `plotly.js` is bundled within the angular code. To avoid this, please read [how to customize the plotlyjs bundle](#customizing-the-plotlyjs-bundle) below.

## API Reference

### Basic Props

| Prop                       | Type                         | Default                                           | Description                                                                                                                                                           |
| -------------------------- | ---------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[data]`                   | `Array`                      | `[]`                                              | list of trace objects (see https://plot.ly/javascript/reference/)                                                                                                     |
| `[layout]`                 | `Object`                     | `undefined`                                       | layout object (see https://plot.ly/javascript/reference/#layout)                                                                                                      |
| `[frames]`                 | `Array`                      | `undefined`                                       | list of frame objects (see https://plot.ly/javascript/reference/)                                                                                                     |
| `[config]`                 | `Object`                     | `undefined`                                       | config object (see https://plot.ly/javascript/configuration-options/)                                                                                                 |
| `[revision]`               | `Number`                     | `undefined`                                       | When provided, causes the plot to update when the revision is incremented.                                                                                     |
| `[updateOnLayoutChange]`   | `Boolean`                    | `true`                                            | Flag which determines if this component should watch to changes on `layout` property and update the graph.                                                            |
| `[updateOnDataChange]`     | `Boolean`                    | `true`                                            | Flag which determines if this component should watch to changes on `data` property and update the graph.                                                              |
| `[updateOnlyWithRevision]` | `Boolean`                    | `false`                                           | If `true`, this component will update only when the property `revision` is increased.                                                                                 |
| `(initialized)`            | `Function(figure, graphDiv)` | `undefined`                                       | Callback executed after plot is initialized. See below for parameter information.                                                                                     |
| `(update)`                 | `Function(figure, graphDiv)` | `undefined`                                       | Callback executed when when a plot is updated due to new data or layout, or when user interacts with a plot. See below for parameter information.                     |
| `(purge)`                  | `Function(figure, graphDiv)` | `undefined`                                       | Callback executed when component unmounts, before `Plotly.purge` strips the `graphDiv` of all private attributes. See below for parameter information.                |
| `(error)`                  | `Function(err)`              | `undefined`                                       | Callback executed when a plotly.js API method rejects                                                                                                                 |
| `[divId]`                  | `string`                     | `undefined`                                       | id assigned to the `<div>` into which the plot is rendered.                                                                                                           |
| `[className]`              | `string`                     | `undefined`                                       | applied to the `<div>` into which the plot is rendered                                                                                                                |
| `[style]`                  | `Object`                     | `{position: 'relative', display: 'inline-block'}` | used to style the `<div>` into which the plot is rendered                                                                                                             |
| `[debug]`                  | `Boolean`                    | `false`                                           | Assign the graph div to `window.gd` for debugging                                                                                                                     |
| `[useResizeHandler]`       | `Boolean`                    | `false`                                           | When true, adds a call to `Plotly.Plot.resize()` as a `window.resize` event handler                                                                                   |

**Note**: To make a plot responsive, i.e. to fill its containing element and resize when the window is resized, use `style` or `className` to set the dimensions of the element (i.e. using `width: 100%; height: 100%` or some similar values) and set `useResizeHandler` to `true` while setting `layout.autosize` to `true` and leaving `layout.height` and `layout.width` undefined. This will implement the behaviour documented here: https://plot.ly/javascript/responsive-fluid-layout/

```typescript
@Component({
    selector: 'plotly-example',
    template: `
    <plotly-plot [data]="graph.data" [layout]="graph.layout"
       [useResizeHandler]="true" [style]="{position: 'relative', width: '100%', height: '100%'}">
    </plotly-plot>`,
})
export class PlotlyExampleComponent {
    public graph = {
        data: [{ x: [1, 2, 3], y: [2, 5, 3], type: 'bar' }],
        layout: {autosize: true, title: 'A Fancy Plot'},
    };
}
```

### Event handler props

Event handlers for specific [`plotly.js` events](https://plot.ly/javascript/plotlyjs-events/) may be attached through the following props:

| Prop                      | Type       | Plotly Event                   | Obs |
| ------------------------- | ---------- | ------------------------------ | --- |
| `(afterExport)`           | `Function` | `plotly_afterexport`           |     |
| `(afterPlot)`             | `Function` | `plotly_afterplot`             |     |
| `(animated)`              | `Function` | `plotly_animated`              |     |
| `(animatingFrame)`        | `Function` | `plotly_animatingframe`        |     |
| `(animationInterrupted)`  | `Function` | `plotly_animationinterrupted`  |     |
| `(autoSize)`              | `Function` | `plotly_autosize`              |     |
| `(beforeExport)`          | `Function` | `plotly_beforeexport`          |     |
| `(buttonClicked)`         | `Function` | `plotly_buttonclicked`         |     |
| `(plotlyClick)`           | `Function` | `plotly_click`                 | [why not (click)?](FAQ.md#why-using-plotlyclick-instead-of-click) |
| `(clickAnnotation)`       | `Function` | `plotly_clickannotation`       |     |
| `(deselect)`              | `Function` | `plotly_deselect`              |     |
| `(doubleClick)`           | `Function` | `plotly_doubleclick`           |     |
| `(framework)`             | `Function` | `plotly_framework`             |     |
| `(hover)`                 | `Function` | `plotly_hover`                 |     |
| `(legendClick)`           | `Function` | `plotly_legendclick`           |     |
| `(legendDoubleClick)`     | `Function` | `plotly_legenddoubleclick`     |     |
| `(react)`                 | `Function` | `plotly_react`                 |     |
| `(relayout)`              | `Function` | `plotly_relayout`              |     |
| `(restyle)`               | `Function` | `plotly_restyle`               |     |
| `(redraw)`                | `Function` | `plotly_redraw`                |     |
| `(selected)`              | `Function` | `plotly_selected`              |     |
| `(selecting)`             | `Function` | `plotly_selecting`             |     |
| `(sliderChange)`          | `Function` | `plotly_sliderchange`          |     |
| `(sliderEnd)`             | `Function` | `plotly_sliderend`             |     |
| `(sliderStart)`           | `Function` | `plotly_sliderstart`           |     |
| `(transitioning)`         | `Function` | `plotly_transitioning`         |     |
| `(transitionInterrupted)` | `Function` | `plotly_transitioninterrupted` |     |
| `(unhover)`               | `Function` | `plotly_unhover`               |     |
| `(relayouting)`           | `Function` | `plotly_relayouting`           |     |
| `(treemapclick)`          | `Function` | `plotly_treemapclick`          |     |
| `(sunburstclick)`         | `Function` | `plotly_sunburstclick`         |     |

### Customizing \<plotly-plot\> component

*\<plotly-plot\>* component supports injection of user-defined contents:
```html
<plotly-plot>
    user-defined Angular template
</plotly-plot>
```
will put the user template into the root *\<div\>* of the resulting *plotly.js* plot,
in front of any plotly-generated elements. This could be useful for implementing plot overlays.

## Customizing the `plotly.js` bundle

By default, this library bundles `plotly.js` from the peer dependency together within the output. This results on huge outputs, for `plotly.js` itself is ~3MB when bundled. It also makes the build (with `ng serve --prod`) really slow, for it minifies everything together.

If you wish to optimize loading `plotly.js` in a different way, please check both [`PlotlyViaCDNModule`](#plotly-via-cdn-module) and [`PlotlyViaWindowModule`](#plotly-via-window-module) modules below.


### Plotly Via CDN Module

If you want to load `plotly.js` [from a CDN](https://github.com/plotly/plotly.js#use-the-plotlyjs-cdn-hosted-by-fastly), use the `PlotlyViaCDNModule` and set on the `PlotlyViaCDNModule.plotlyVersion` property the plotly.js's version you want to use and, optionally, you can also set on the `PlotlyViaCDNModule.plotlyBundle` property the plotly.js's build you want to use:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlotlyViaCDNModule } from 'angular-plotly.js';


PlotlyViaCDNModule.setPlotlyVersion('1.55.2'); // can be `latest` or any version number (i.e.: '1.40.0')
PlotlyViaCDNModule.setPlotlyBundle('basic'); // optional: can be null (for full) or 'basic', 'cartesian', 'geo', 'gl3d', 'gl2d', 'mapbox' or 'finance'

@NgModule({
    imports: [
        CommonModule,
        PlotlyViaCDNModule,
    ],
    ...
})
export class AppModule { }
```

### Plotly Via Window Module

`plotly.js` can be added as a [global script on angular.json](https://github.com/angular/angular-cli/wiki/stories-global-scripts#global-scripts) to avoid it being bundled into the final project's code. To make this happen, you must first add `plotly.js` path into `angular.json` file as shown below:

```javascript
// angular.json
{
    ...
    "projects": {
        "project-name": { // This is your project's name
            ...
            "architect": {
                "build": {
                    ...
                    "options": {
                        "scripts": [
                            "node_modules/plotly.js/dist/plotly.min.js" // add this
                        ]
                    }
                }
            }
            ...
        }
    }
}
```

This will include `plotly.js` into the `vendor.js` file generated by angular CLI build process, and `plotly.js` library will be loaded before angular and your project's code. The `window.Plotly` will be available. Thus, you must use `PlotlyViaWindowModule` module to force `angular-plotly.js` to use `window.Plotly` object:


```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlotlyViaWindowModule } from 'angular-plotly.js';

@NgModule({
    imports: [CommonModule, PlotlyViaWindowModule],
    ...
})
export class AppModule { }
```

If you want to use a [different precompiled bundle](https://github.com/plotly/plotly.js/blob/master/dist/README.md#partial-bundles) or if you wish to [assemble you own customized bundle](https://github.com/plotly/plotly.js#modules), you can use `PlotlyViaWindowModule` to force the use of `window.Plotly` object as shown above.

## Development

To get started:

```bash
$ npm install
```

To see the demo app, run:

```bash
$ npm start
```

To run the tests:

```bash
$ npm run test
```

## FAQ

Please, check the [FAQ](FAQ.md)

## License

&copy; 2019 Plotly, Inc. MIT License.

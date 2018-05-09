# angular-plotly.js


![angular-plotly-logo](angular-plotly.png)

> A [plotly.js](https://github.com/plotly/plotly.js) Angular component from
> [Plotly](https://plot.ly/).

[![CircleCI](https://circleci.com/gh/plotly/angular-plotly.js.svg?style=svg)](https://circleci.com/gh/plotly/angular-plotly.js)
[![Coverage Status](https://coveralls.io/repos/github/plotly/angular-plotly.js/badge.svg?branch=master)](https://coveralls.io/github/plotly/angular-plotly.js?branch=master)

---

## Content

* [Installation](#installation)
* [Quick start](#quick-start)
* [API](#api-reference)
  * [Basic props](#basic-props)
  * [Event handler props](#event-handler-props)
* [Development](#development)

## Installation

```bash
$ npm install angular-plotly.js plotly.js
```

Using the [angular CLI](https://cli.angular.io/) to start a new project
```bash
$ ng new my-project
$ cd my-project
$ npm install angular-plotly.js plotly.js --save
```

## Quick start

Add the `PlotlyModule` into the main app module of your project
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlotlyModule } from 'angular-plotly.js';

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

## API Reference

### Basic Props

**Warning**: for the time being, this component may _mutate_ its `layout` and `data` props in response to user input, going against React rules. This behaviour will change in the near future once https://github.com/plotly/plotly.js/issues/2389 is completed.

| Prop                 | Type                         | Default                                           | Description                                                                                                                                                           |
| -------------------- | ---------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[data]`             | `Array`                      | `[]`                                              | list of trace objects (see https://plot.ly/javascript/reference/)                                                                                                     |
| `[layout]`           | `Object`                     | `undefined`                                       | layout object (see https://plot.ly/javascript/reference/#layout)                                                                                                      |
| `[frames]`           | `Array`                      | `undefined`                                       | list of frame objects (see https://plot.ly/javascript/reference/)                                                                                                     |
| `[config]`           | `Object`                     | `undefined`                                       | config object (see https://plot.ly/javascript/configuration-options/)                                                                                                 |
| `[revision]`         | `Number`                     | `undefined`                                       | When provided, causes the plot to update _only_ when the revision is incremented.                                                                                     |
| `(initialized)`      | `Function(figure, graphDiv)` | `undefined`                                       | Callback executed after plot is initialized. See below for parameter information.                                                                                     |
| `(update)`           | `Function(figure, graphDiv)` | `undefined`                                       | Callback executed when when a plot is updated due to new data or layout, or when user interacts with a plot. See below for parameter information.                     |
| `(purge)`            | `Function(figure, graphDiv)` | `undefined`                                       | Callback executed when component unmounts, before `Plotly.purge` strips the `graphDiv` of all private attributes. See below for parameter information.                |
| `(error)`            | `Function(err)`              | `undefined`                                       | Callback executed when a plotly.js API method rejects                                                                                                                 |
| `[divId]`            | `string`                     | `undefined`                                       | id assigned to the `<div>` into which the plot is rendered.                                                                                                           |
| `[className]`        | `string`                     | `undefined`                                       | applied to the `<div>` into which the plot is rendered                                                                                                                |
| `[style]`            | `Object`                     | `{position: 'relative', display: 'inline-block'}` | used to style the `<div>` into which the plot is rendered                                                                                                             |
| `[debug]`            | `Boolean`                    | `false`                                           | Assign the graph div to `window.gd` for debugging                                                                                                                     |
| `[useResizeHandler]` | `Boolean`                    | `false`                                           | When true, adds a call to `Plotly.Plot.resize()` as a `window.resize` event handler                                                                                   |

**Note**: To make a plot responsive, i.e. to fill its containing element and resize when the window is resized, use `style` or `className` to set the dimensions of the element (i.e. using `width: 100%; height: 100%` or some similar values) and set `useResizeHandler` to `true` while setting `layout.autosize` to `true` and leaving `layout.height` and `layout.width` undefined. This will implement the behaviour documented here: https://plot.ly/javascript/responsive-fluid-layout/

### Event handler props

Event handlers for specific [`plotly.js` events](https://plot.ly/javascript/plotlyjs-events/) may be attached through the following props:

| Prop                      | Type       | Plotly Event                   |
| ------------------------- | ---------- | ------------------------------ |
| `(afterExport)`           | `Function` | `plotly_afterexport`           |
| `(afterPlot)`             | `Function` | `plotly_afterplot`             |
| `(animated)`              | `Function` | `plotly_animated`              |
| `(animatingFrame)`        | `Function` | `plotly_animatingframe`        |
| `(animationInterrupted)`  | `Function` | `plotly_animationinterrupted`  |
| `(autoSize)`              | `Function` | `plotly_autosize`              |
| `(beforeExport)`          | `Function` | `plotly_beforeexport`          |
| `(buttonClicked)`         | `Function` | `plotly_buttonclicked`         |
| `(click)`                 | `Function` | `plotly_click`                 |
| `(clickAnnotation)`       | `Function` | `plotly_clickannotation`       |
| `(deselect)`              | `Function` | `plotly_deselect`              |
| `(doubleClick)`           | `Function` | `plotly_doubleclick`           |
| `(framework)`             | `Function` | `plotly_framework`             |
| `(hover)`                 | `Function` | `plotly_hover`                 |
| `(legendClick)`           | `Function` | `plotly_legendclick`           |
| `(legendDoubleClick)`     | `Function` | `plotly_legenddoubleclick`     |
| `(relayout)`              | `Function` | `plotly_relayout`              |
| `(restyle)`               | `Function` | `plotly_restyle`               |
| `(redraw)`                | `Function` | `plotly_redraw`                |
| `(selected)`              | `Function` | `plotly_selected`              |
| `(selecting)`             | `Function` | `plotly_selecting`             |
| `(sliderChange)`          | `Function` | `plotly_sliderchange`          |
| `(sliderEnd)`             | `Function` | `plotly_sliderend`             |
| `(sliderStart)`           | `Function` | `plotly_sliderstart`           |
| `(transitioning)`         | `Function` | `plotly_transitioning`         |
| `(transitionInterrupted)` | `Function` | `plotly_transitioninterrupted` |
| `(unhover)`               | `Function` | `plotly_unhover`               |


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

## License

&copy; 2018 Plotly, Inc. MIT License.
# Frequently Asked Questions


## How to disable plotly events?

It's possible disable some plotly events returning `false` in its event. Please see issue: https://github.com/plotly/angular-plotly.js/issues/52#issuecomment-476018478



## Why using `(plotlyClick)` instead of `(click)`?

Angular uses the `(click)` directive to itself. If we use the `click` name as event alias to `plotlyClick` we might get unexpected behaviour from both angular and plotly.js. We believe it is simpler to just avoid using the same name is better.
Please see issue: https://github.com/plotly/angular-plotly.js/issues/63


## How to access global Plotly object code

If you're using `PlotlyModule`, which includes `plotly.js` via commonjs modules, you can access the `Plotly` object via `PlotlyService`. See the example:

```typescript
import { PlotlyService } from 'angular-plotly.js';

@Component({
    selector: 'app-plotly',
    template: '...',
})
export class AppPlotlyComponent {
    constructor(public plotlyService: PlotlyService) {
        const Plotly = plotlyService.getPlotly();
    }
}
```


## The graph is too slow when interacting, what could I do?

Angular checks all the data everytime to see if there is a change to be applied, sometimes this brings unexpected slowness when treating a large data to be displayed. To avoid this check, set the property `updateOnlyWithRevision` to `true`. When you need the component to update, you can use the `revision` property (a number) to force it to update. Simply incrementing it (e.g.: `this.revision += 1`) will force the component to be updated.


## How to support Angular 7.x?

There was a breaking change from `Angular 7.x` to `8.x`. Please see this thread: https://github.com/plotly/angular-plotly.js/issues/79

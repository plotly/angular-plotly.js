# Frequently Asked Questions


## How to disable plotly events ?

It's possible disable some plotly events returning `false` in its event. Please see issue: https://github.com/plotly/angular-plotly.js/issues/52#issuecomment-476018478



## Why using `(plotly_click)` instead of `(click)` ?

Angular uses the `(click)` directive to itself. If we use the `click` name as event alias to `plotly_click` we might get unexpected behaviour from both angular and plotly.js. We believe it is simpler to just avoid using the same name is better.
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

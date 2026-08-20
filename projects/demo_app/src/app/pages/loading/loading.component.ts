import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class LoadingComponent {
  readonly staticCode = `import PlotlyJS from 'plotly.js-dist';
import { PlotlyModule } from 'angular-plotly.js';

@NgModule({
  imports: [PlotlyModule.forRoot(PlotlyJS)]
})
export class AppModule {}`;

  readonly cdnCode = `import { PlotlyViaCDNModule } from 'angular-plotly.js';

@NgModule({
  imports: [
    PlotlyViaCDNModule.forRoot({
      version: '2.35.3',
      bundleName: 'basic'
    })
  ]
})
export class AppModule {}`;

  readonly windowCode = `import { PlotlyViaWindowModule } from 'angular-plotly.js';

@NgModule({
  imports: [PlotlyViaWindowModule]
})
export class AppModule {}

// Load a compatible Plotly.js script before Angular bootstraps.
// The module reads Plotly from window.Plotly.`;
}

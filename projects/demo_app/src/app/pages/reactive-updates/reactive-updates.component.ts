import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Plotly } from 'angular-plotly.js';
import { chartLayout, plotConfig, plotStyle } from '../../shared/chart-options';

@Component({
  selector: 'app-reactive-updates',
  templateUrl: './reactive-updates.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ReactiveUpdatesComponent {
  private readonly initialValues = [34, 41, 38, 52, 57, 63];
  private readonly additionalValues = [71, 68, 79, 86];

  readonly plotStyle = plotStyle;
  readonly config = plotConfig;
  readonly layout = chartLayout({
    height: 400,
    showlegend: false,
    xaxis: { title: 'Reading', showgrid: false, fixedrange: true },
    yaxis: { title: 'Requests / minute', gridcolor: '#e8e9ed', zeroline: false, range: [0, 100], fixedrange: true },
  });

  data: Plotly.Data[] = [this.createTrace(this.initialValues)];
  revision = 0;
  updateCount = 0;

  readonly templateCode = `<plotly-plot
  [data]="data"
  [layout]="layout"
  [revision]="revision"
  [updateOnlyWithRevision]="true"
  (update)="handleUpdate()">
</plotly-plot>`;

  readonly componentCode = `addPoint(): void {
  const nextTrace = {
    ...this.data[0],
    y: [...this.data[0].y, nextValue]
  };

  this.data = [nextTrace];
  this.revision += 1;
}`;

  constructor(private readonly changeDetector: ChangeDetectorRef) { }

  addPoint(): void {
    const values = [...this.data[0].y];
    const nextValue = this.additionalValues[values.length - this.initialValues.length];
    if (nextValue === undefined) {
      return;
    }

    this.data = [this.createTrace([...values, nextValue])];
    this.revision += 1;
  }

  reset(): void {
    this.data = [this.createTrace(this.initialValues)];
    this.revision += 1;
    this.updateCount = 0;
  }

  handleUpdate(): void {
    this.updateCount += 1;
    this.changeDetector.markForCheck();
  }

  get canAddPoint(): boolean {
    return this.data[0].y.length < this.initialValues.length + this.additionalValues.length;
  }

  private createTrace(values: number[]): Plotly.Data {
    return {
      x: values.map((_, index) => index + 1),
      y: [...values],
      type: 'scatter',
      mode: 'lines+markers',
      fill: 'tozeroy',
      fillcolor: 'rgba(255, 44, 109, 0.12)',
      line: { color: '#ff2c6d', width: 4, shape: 'spline' },
      marker: { color: '#ffffff', line: { color: '#ff2c6d', width: 3 }, size: 8 },
      hovertemplate: 'Reading %{x}<br><b>%{y}</b> req/min<extra></extra>',
    };
  }
}

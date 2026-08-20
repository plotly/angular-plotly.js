import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Plotly } from 'angular-plotly.js';
import { chartLayout, plotConfig, plotStyle } from '../../shared/chart-options';

interface LifecycleEntry {
  event: string;
  detail: string;
}

@Component({
  selector: 'app-lifecycle',
  templateUrl: './lifecycle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class LifecycleComponent {
  readonly plotStyle = plotStyle;
  readonly config = plotConfig;
  readonly data: Plotly.Data[] = [
    {
      x: ['Queued', 'Running', 'Review', 'Complete'],
      y: [16, 28, 12, 44],
      type: 'bar',
      marker: { color: ['#7fe4ff', '#7a76ff', '#3479f3', '#00f2e4'] },
      hovertemplate: '%{x}<br><b>%{y} jobs</b><extra></extra>',
    },
  ];
  readonly layout = chartLayout({
    height: 360,
    showlegend: false,
    xaxis: { showgrid: false, fixedrange: true },
    yaxis: { gridcolor: '#e8e9ed', zeroline: false, fixedrange: true },
  });

  plotMounted = true;
  debugEnabled = false;
  entries: LifecycleEntry[] = [{ event: 'ready', detail: 'Waiting for Plotly initialization' }];

  readonly templateCode = `@if (plotMounted) {
  <plotly-plot
    [data]="data"
    [layout]="layout"
    [debug]="debugEnabled"
    (initialized)="record('initialized')"
    (purge)="record('purge')"
    (error)="recordError($event)">
  </plotly-plot>
}`;

  constructor(private readonly changeDetector: ChangeDetectorRef) { }

  togglePlot(): void {
    this.plotMounted = !this.plotMounted;
  }

  toggleDebug(): void {
    this.debugEnabled = !this.debugEnabled;
    this.record('debug', this.debugEnabled ? 'window.gd is enabled' : 'window.gd is cleared');
  }

  record(event: string, detail = 'Plotly figure emitted'): void {
    this.entries = [{ event, detail }, ...this.entries].slice(0, 5);
    this.changeDetector.markForCheck();
  }

  recordError(error: Error): void {
    this.record('error', error.message || 'Plotly rejected an operation');
  }
}

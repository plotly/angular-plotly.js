import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Plotly } from 'angular-plotly.js';
import { chartLayout, plotConfig, plotStyle } from '../../shared/chart-options';

interface PlotEventSummary {
  event: string;
  pointCount: number;
  x?: string | number;
  y?: string | number;
  label?: string;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class EventsComponent {
  readonly plotStyle = plotStyle;
  readonly config = {
    ...plotConfig,
    displayModeBar: true,
    modeBarButtonsToRemove: ['zoom2d', 'pan2d'],
  };
  readonly data: Plotly.Data[] = [
    {
      x: [18, 24, 31, 38, 45, 52, 59, 67, 76],
      y: [42, 57, 49, 72, 63, 86, 75, 94, 88],
      text: ['Atlas', 'Beacon', 'Comet', 'Delta', 'Echo', 'Flux', 'Glow', 'Halo', 'Ion'],
      customdata: ['North', 'West', 'North', 'South', 'East', 'West', 'South', 'East', 'North'],
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: [18, 24, 31, 38, 45, 52, 59, 67, 76],
        colorscale: [[0, '#7fe4ff'], [0.5, '#7a76ff'], [1, '#ff2c6d']],
        size: [18, 23, 20, 29, 25, 34, 28, 38, 32],
        opacity: 0.86,
        line: { color: '#ffffff', width: 2 },
      },
      hovertemplate: '<b>%{text}</b><br>Adoption: %{x}%<br>Satisfaction: %{y}<br>Region: %{customdata}<extra></extra>',
    },
  ];
  readonly layout = chartLayout({
    height: 430,
    dragmode: 'select',
    showlegend: false,
    xaxis: { title: 'Adoption (%)', gridcolor: '#e8e9ed', zeroline: false, range: [10, 85] },
    yaxis: { title: 'Satisfaction score', gridcolor: '#e8e9ed', zeroline: false, range: [35, 100] },
    selectdirection: 'any',
  });

  lastEvent: PlotEventSummary = { event: 'Waiting for an interaction', pointCount: 0 };

  readonly templateCode = `<plotly-plot
  [data]="data"
  [layout]="layout"
  (plotlyClick)="capture('plotlyClick', $event)"
  (hover)="capture('hover', $event)"
  (selected)="capture('selected', $event)">
</plotly-plot>`;

  constructor(private readonly changeDetector: ChangeDetectorRef) { }

  capture(event: string, payload: any): void {
    const points = Array.isArray(payload?.points) ? payload.points : [];
    const firstPoint = points[0];

    this.lastEvent = {
      event,
      pointCount: points.length,
      ...(firstPoint?.x !== undefined ? { x: firstPoint.x } : {}),
      ...(firstPoint?.y !== undefined ? { y: firstPoint.y } : {}),
      ...(firstPoint?.text !== undefined ? { label: firstPoint.text } : {}),
    };
    this.changeDetector.markForCheck();
  }

  get eventJson(): string {
    return JSON.stringify(this.lastEvent, null, 2);
  }
}

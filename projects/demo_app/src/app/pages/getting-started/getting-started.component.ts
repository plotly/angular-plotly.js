import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Plotly } from 'angular-plotly.js';
import { chartLayout, plotConfig, plotStyle } from '../../shared/chart-options';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class GettingStartedComponent {
  readonly plotStyle = plotStyle;
  readonly config = {
    ...plotConfig,
    displayModeBar: true,
  };
  readonly data: Plotly.Data[] = [
    {
      x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      y: [18, 25, 31, 46, 54, 68],
      type: 'bar',
      name: 'New users',
      marker: { color: '#7fe4ff', line: { color: '#3479f3', width: 1 } },
      hovertemplate: '%{x}<br><b>%{y}</b> new users<extra></extra>',
    },
    {
      x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      y: [12, 22, 29, 38, 51, 72],
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Completed reports',
      yaxis: 'y2',
      line: { color: '#ff2c6d', width: 3, shape: 'spline' },
      marker: { color: '#ff2c6d', size: 7 },
      hovertemplate: '%{x}<br><b>%{y}</b> reports<extra></extra>',
    },
  ];
  readonly layout = chartLayout({
    height: 430,
    barmode: 'group',
    legend: { orientation: 'h', x: 0, y: 1.12 },
    xaxis: { showgrid: false, fixedrange: true },
    yaxis: { title: 'New users', gridcolor: '#e8e9ed', zeroline: false, fixedrange: true },
    yaxis2: {
      title: 'Reports',
      overlaying: 'y',
      side: 'right',
      showgrid: false,
      zeroline: false,
      fixedrange: true,
    },
  });

  readonly templateCode = `<plotly-plot
  [data]="data"
  [layout]="layout"
  [config]="config"
  [style]="plotStyle"
  [useResizeHandler]="true">
</plotly-plot>`;

  readonly componentCode = `readonly plotStyle = {
  position: 'relative',
  width: '100%',
  height: '100%'
};

readonly layout = {
  autosize: true,
  // Leave width undefined for a fluid chart.
};`;
}

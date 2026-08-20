import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Plotly } from 'angular-plotly.js';
import { chartLayout, plotConfig, plotStyle } from '../../shared/chart-options';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class HomeComponent {
  readonly plotStyle = plotStyle;
  readonly config = plotConfig;
  readonly data: Plotly.Data[] = [
    {
      x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      y: [42, 58, 52, 74, 69, 91, 104],
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Active sessions',
      fill: 'tozeroy',
      fillcolor: 'rgba(122, 118, 255, 0.14)',
      line: { color: '#7a76ff', width: 4, shape: 'spline' },
      marker: { color: '#ffffff', line: { color: '#7a76ff', width: 3 }, size: 8 },
      hovertemplate: '<b>%{x}</b><br>%{y} sessions<extra></extra>',
    },
    {
      x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      y: [28, 36, 41, 47, 55, 62, 73],
      type: 'scatter',
      mode: 'lines',
      name: 'Previous week',
      line: { color: '#7fe4ff', width: 2, dash: 'dot', shape: 'spline' },
      hovertemplate: '<b>%{x}</b><br>%{y} sessions<extra></extra>',
    },
  ];
  readonly layout = chartLayout({
    height: 400,
    showlegend: true,
    legend: { orientation: 'h', x: 0, y: 1.16 },
    margin: { t: 64, r: 20, b: 42, l: 48 },
    xaxis: { showgrid: false, fixedrange: true },
    yaxis: { gridcolor: '#e8e9ed', zeroline: false, fixedrange: true },
  });
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Plotly } from 'angular-plotly.js';
import { chartLayout, plotConfig, plotStyle } from '../../shared/chart-options';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DashboardComponent {
  readonly plotStyle = plotStyle;
  readonly config = { ...plotConfig, displayModeBar: false };

  readonly revenueData: Plotly.Data[] = [
    {
      x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      y: [42, 48, 46, 57, 61, 67, 72, 81],
      type: 'scatter',
      mode: 'lines',
      fill: 'tozeroy',
      fillcolor: 'rgba(52, 121, 243, 0.12)',
      line: { color: '#3479f3', width: 4, shape: 'spline' },
      hovertemplate: '%{x}<br><b>$%{y}k</b><extra></extra>',
    },
  ];
  readonly revenueLayout = this.compactLayout({
    xaxis: { showgrid: false, fixedrange: true },
    yaxis: { gridcolor: '#edf0f4', zeroline: false, ticksuffix: 'k', fixedrange: true },
  });

  readonly channelData: Plotly.Data[] = [
    { x: ['Organic', 'Referral', 'Paid', 'Social'], y: [64, 48, 39, 27], type: 'bar', marker: { color: '#7a76ff' }, hovertemplate: '%{x}<br><b>%{y}k</b><extra></extra>' },
    { x: ['Organic', 'Referral', 'Paid', 'Social'], y: [51, 44, 34, 31], type: 'bar', marker: { color: '#7fe4ff' }, hovertemplate: '%{x}<br><b>%{y}k</b><extra></extra>' },
  ];
  readonly channelLayout = this.compactLayout({
    barmode: 'group',
    showlegend: false,
    xaxis: { showgrid: false, fixedrange: true },
    yaxis: { gridcolor: '#edf0f4', zeroline: false, fixedrange: true },
  });

  readonly segmentData: Plotly.Data[] = [
    {
      labels: ['Enterprise', 'Growth', 'Starter'],
      values: [46, 34, 20],
      type: 'pie',
      hole: 0.68,
      sort: false,
      marker: { colors: ['#ff2c6d', '#7a76ff', '#7fe4ff'], line: { color: '#ffffff', width: 3 } },
      textinfo: 'none',
      hovertemplate: '<b>%{label}</b><br>%{value}%<extra></extra>',
    },
  ];
  readonly segmentLayout = this.compactLayout({
    showlegend: true,
    legend: { orientation: 'h', x: 0.08, y: -0.08 },
    margin: { t: 16, r: 20, b: 50, l: 20 },
    annotations: [{ text: '<b>100%</b><br>customers', showarrow: false, font: { size: 14, color: '#282d33' } }],
  });

  readonly heatmapData: Plotly.Data[] = [
    {
      x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      y: ['Morning', 'Midday', 'Evening'],
      z: [[18, 25, 22, 31, 29], [32, 39, 45, 42, 51], [26, 30, 37, 44, 48]],
      type: 'heatmap',
      colorscale: [[0, '#eef2ff'], [0.45, '#7fe4ff'], [1, '#7a76ff']],
      showscale: false,
      hovertemplate: '%{y}, %{x}<br><b>%{z} sessions</b><extra></extra>',
    },
  ];
  readonly heatmapLayout = this.compactLayout({
    xaxis: { showgrid: false, fixedrange: true },
    yaxis: { showgrid: false, fixedrange: true },
    margin: { t: 16, r: 18, b: 42, l: 72 },
  });

  readonly templateCode = `<div class="dashboard-grid">
  <plotly-plot
    [data]="revenueData"
    [layout]="revenueLayout"
    [config]="config"
    [useResizeHandler]="true">
  </plotly-plot>
  <!-- Add more independently configured plots. -->
</div>`;

  private compactLayout(overrides: Partial<Plotly.Layout>): Partial<Plotly.Layout> {
    return chartLayout({
      height: 280,
      margin: { t: 16, r: 18, b: 42, l: 44 },
      ...overrides,
    });
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'plotly-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {
  numberOfCharts = 100;
  indexNumberOfCharts = this.numberOfCharts - 1;

  chartData = [];
  layout: any;
  style: any;
  config: any;

  public mainStartTime: number;
  public mainEndTime: number;
  public startTime: number[] = [];
  public endTime: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initChartSetup();
    this.initChartData();

    this.mainStartTime = (new Date()).getTime();
  }

  trackByIndex(i) {
    return i;
  }

  initChartSetup() {
    this.layout = {
      xaxis: { title: { text: "X" }, automargin: true },
      yaxis: { title: { text: "Y" }, automargin: true },
      margin: {
        t: 12,
        r: 12,
        b: 12,
        l: 12
      }
    };

    this.style = { position: "relative", width: "100%", height: '200px' };

    this.config = { staticPlot: true };
  }

  initChartData() {
    for (let i = 1; i <= this.numberOfCharts; i++) {
      const data = [
        { type: "bar", name: `Chart ${i}`, x: [1, 2, 3], y: [100, 300, 200] }
      ];
      this.chartData.push(data);
    }
  }

  onNgInited(i: number) {
    this.startTime[i] = (new Date()).getTime();
  }

  onInitialized(i: number) {
    this.endTime[i] = (new Date()).getTime();

    if (i === this.indexNumberOfCharts) {
      this.mainEndTime = (new Date()).getTime();
    }
  }

  getTime(i: number): number {
    if (i in this.endTime) return this.endTime[i] - this.startTime[i];
    return 0;
  }

  getTotalTime(): number {
    if (this.mainEndTime) return this.mainEndTime - this.mainStartTime;
    return 0;
  }

}

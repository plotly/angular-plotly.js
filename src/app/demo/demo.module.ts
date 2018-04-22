import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DemoComponent } from './demo.component';

import { PlotlyModule } from '../plotly/plotly.module';

// Examples
import { BoxPlotComponent } from './examples/box-plot.component';
import { LineChartsComponent } from './examples/line-charts.component';


const demoRoutes: Routes = [
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    { path: 'box-plots', component: BoxPlotComponent, data: { title: 'Box Plotly' } },
    { path: 'linear-charts', component: LineChartsComponent, data: { title: 'Line Charts' } },

    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [CommonModule, PlotlyModule, RouterModule.forRoot(demoRoutes, { enableTracing: true })],
    declarations: [HomeComponent, DemoComponent, BoxPlotComponent, LineChartsComponent],
    exports: [DemoComponent],
})
export class DemoModule { }

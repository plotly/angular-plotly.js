import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DemoComponent } from './demo.component';

import { PlotlyModule } from '../plotly/plotly.module';

// Examples
import { BoxPlotComponent } from './box-plots/box-plots.component';
import { LinearChartsComponent } from './linear-charts/linear-charts.component';
import { AjaxComponent } from './ajax/ajax.component';
import { FancyplotComponent } from './fancyplot/fancyplot.component';


const demoRoutes: Routes = [
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    { path: 'box-plots', component: BoxPlotComponent, data: { title: 'Box Plots' } },
    { path: 'linear-charts', component: LinearChartsComponent, data: { title: 'Linear Charts' } },
    { path: 'ajax', component: AjaxComponent, data: { title: 'Ajax' } },
    { path: 'fancy-plot', component: FancyplotComponent, data: { title: 'Fancy Plot' } },

    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [CommonModule, PlotlyModule, RouterModule.forRoot(demoRoutes, { enableTracing: true })],
    declarations: [HomeComponent, DemoComponent, BoxPlotComponent, LinearChartsComponent, AjaxComponent, FancyplotComponent],
    exports: [DemoComponent],
})
export class DemoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DemoComponent } from './demo.component';

import { PlotlyModule } from '../plotly/plotly.module';
import { BoxPlotComponent } from './box-plot/box-plot.component';


const demoRoutes: Routes = [
    { path: 'home', component: HomeComponent, data: {title: 'Linear and Scatter Plot'} },
    { path: 'box-plots', component: BoxPlotComponent, data: {title: 'Box Plotly'} },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [CommonModule, PlotlyModule, RouterModule.forRoot(demoRoutes, { enableTracing: true })],
    declarations: [HomeComponent, DemoComponent, BoxPlotComponent],
    exports: [DemoComponent],
})
export class DemoModule { }

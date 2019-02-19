import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DemoComponent } from './demo.component';

import { PlotlyModule } from '../plotly/plotly.module';
// import { PlotlyViaCDNModule } from '../plotly-via-cdn/plotly-via-cdn.module';
// import { PlotlyViaWindowModule } from '../plotly-via-window/plotly-via-window.module';

// Examples
import { BoxPlotComponent } from './box-plots/box-plots.component';
import { LinearChartsComponent } from './linear-charts/linear-charts.component';
import { AjaxComponent } from './ajax/ajax.component';
import { FancyplotComponent } from './fancyplot/fancyplot.component';
import { MemoryLeakComponent } from './memory-leak/memory-leak.component';
import { FramesComponent } from './frames/frames.component';


const demoRoutes: Routes = [
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    { path: 'box-plots', component: BoxPlotComponent, data: { title: 'Box Plots' } },
    { path: 'linear-charts', component: LinearChartsComponent, data: { title: 'Linear Charts' } },
    { path: 'ajax', component: AjaxComponent, data: { title: 'Ajax' } },
    { path: 'fancy-plot', component: FancyplotComponent, data: { title: 'Fancy Plot' } },
    { path: 'memory-leak', component: MemoryLeakComponent, data: { title: 'Memory leak' } },
    { path: 'frames', component: FramesComponent, data: { title: 'Frames' } },

    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        PlotlyModule,
        // PlotlyViaCDNModule.forRoot({version: 'latest'}),
        // PlotlyViaWindowModule,
        RouterModule.forRoot(demoRoutes, { enableTracing: true }),
    ],
    declarations: [
        HomeComponent,
        DemoComponent,
        BoxPlotComponent,
        LinearChartsComponent,
        AjaxComponent,
        FancyplotComponent,
        MemoryLeakComponent,
        FramesComponent
    ],
    exports: [DemoComponent],
})
export class DemoModule { }

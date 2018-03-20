import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DemoComponent } from './demo.component';

import { PlotlyModule } from '../plotly/plotly.module';


const demoRoutes: Routes = [
    { path: 'home', component: HomeComponent,  },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [CommonModule, PlotlyModule, RouterModule.forRoot(demoRoutes, { enableTracing: true })],
    declarations: [HomeComponent, DemoComponent],
    exports: [DemoComponent],
})
export class DemoModule { }

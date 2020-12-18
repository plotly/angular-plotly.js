import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PlotlyViaCDNModule } from 'plotly';
import { HomeComponent } from './home/home.component';


PlotlyViaCDNModule.setPlotlyVersion('1.58.2');
PlotlyViaCDNModule.setPlotlyBundle('basic');


const routes: Routes = [
    { path: 'home', component: HomeComponent, data: { title: "Home" } },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    PlotlyViaCDNModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

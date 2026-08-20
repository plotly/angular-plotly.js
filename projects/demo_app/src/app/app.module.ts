import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import PlotlyJS from 'plotly.js-dist';
import { PlotlyModule } from 'angular-plotly.js';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EventsComponent } from './pages/events/events.component';
import { ExamplesIndexComponent } from './pages/examples-index/examples-index.component';
import { GettingStartedComponent } from './pages/getting-started/getting-started.component';
import { HomeComponent } from './pages/home/home.component';
import { LifecycleComponent } from './pages/lifecycle/lifecycle.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { ReactiveUpdatesComponent } from './pages/reactive-updates/reactive-updates.component';
import { ChartCardComponent } from './shared/chart-card.component';
import { CodeBlockComponent } from './shared/code-block.component';
import { ExamplePageComponent } from './shared/example-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartCardComponent,
    CodeBlockComponent,
    DashboardComponent,
    EventsComponent,
    ExamplePageComponent,
    ExamplesIndexComponent,
    GettingStartedComponent,
    HomeComponent,
    LifecycleComponent,
    LoadingComponent,
    ReactiveUpdatesComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
    PlotlyModule.forRoot(PlotlyJS),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

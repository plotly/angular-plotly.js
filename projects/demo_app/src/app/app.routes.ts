import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EventsComponent } from './pages/events/events.component';
import { ExamplesIndexComponent } from './pages/examples-index/examples-index.component';
import { GettingStartedComponent } from './pages/getting-started/getting-started.component';
import { HomeComponent } from './pages/home/home.component';
import { LifecycleComponent } from './pages/lifecycle/lifecycle.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { ReactiveUpdatesComponent } from './pages/reactive-updates/reactive-updates.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'angular-plotly.js — Angular chart components' },
  { path: 'examples', component: ExamplesIndexComponent, title: 'Examples — angular-plotly.js' },
  { path: 'examples/getting-started', component: GettingStartedComponent, title: 'Getting started — angular-plotly.js' },
  { path: 'examples/reactive-updates', component: ReactiveUpdatesComponent, title: 'Reactive updates — angular-plotly.js' },
  { path: 'examples/events', component: EventsComponent, title: 'Events — angular-plotly.js' },
  { path: 'examples/dashboard', component: DashboardComponent, title: 'Dashboard — angular-plotly.js' },
  { path: 'examples/lifecycle', component: LifecycleComponent, title: 'Lifecycle — angular-plotly.js' },
  { path: 'loading', component: LoadingComponent, title: 'Loading Plotly.js — angular-plotly.js' },
  { path: '**', redirectTo: '' },
];

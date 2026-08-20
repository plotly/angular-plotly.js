import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent],
    imports: [RouterModule.forRoot([])],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  }));

  it('creates the routed demo shell', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.brand')?.textContent).toContain('angular-plotly.js');
    expect(element.querySelector('router-outlet')).not.toBeNull();
    expect(element.querySelectorAll('.primary-navigation a').length).toBe(4);
  });

  it('opens and closes the mobile navigation', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.toggleNavigation();
    expect(component.navigationOpen).toBeTrue();

    component.closeNavigation();
    expect(component.navigationOpen).toBeFalse();
  });

  it('defines every public demo route and a wildcard fallback', () => {
    expect(routes.map(route => route.path)).toEqual([
      '', 'examples', 'examples/getting-started', 'examples/reactive-updates',
      'examples/events', 'examples/dashboard', 'examples/lifecycle', 'loading', '**',
    ]);
    expect(routes.at(-1)?.redirectTo).toBe('');
  });
});

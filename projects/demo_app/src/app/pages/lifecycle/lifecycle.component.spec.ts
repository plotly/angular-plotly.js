import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LifecycleComponent } from './lifecycle.component';

describe('LifecycleComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [LifecycleComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  }));

  it('toggles plot mounting and records lifecycle outputs', () => {
    const component = TestBed.createComponent(LifecycleComponent).componentInstance;

    component.togglePlot();
    component.record('purge');

    expect(component.plotMounted).toBeFalse();
    expect(component.entries[0].event).toBe('purge');
  });

  it('records debug state and errors', () => {
    const component = TestBed.createComponent(LifecycleComponent).componentInstance;

    component.toggleDebug();
    component.recordError(new Error('Plot failed'));

    expect(component.debugEnabled).toBeTrue();
    expect(component.entries[0]).toEqual({ event: 'error', detail: 'Plot failed' });
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ReactiveUpdatesComponent } from './reactive-updates.component';

describe('ReactiveUpdatesComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [ReactiveUpdatesComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  }));

  it('adds immutable data and advances the revision', () => {
    const component = TestBed.createComponent(ReactiveUpdatesComponent).componentInstance;
    const originalTrace = component.data[0];

    component.addPoint();

    expect(component.data[0]).not.toBe(originalTrace);
    expect(component.data[0].y.length).toBe(7);
    expect(component.revision).toBe(1);
  });

  it('counts update outputs and resets the example', () => {
    const component = TestBed.createComponent(ReactiveUpdatesComponent).componentInstance;

    component.handleUpdate();
    component.addPoint();
    component.reset();

    expect(component.updateCount).toBe(0);
    expect(component.data[0].y.length).toBe(6);
    expect(component.revision).toBe(2);
  });
});

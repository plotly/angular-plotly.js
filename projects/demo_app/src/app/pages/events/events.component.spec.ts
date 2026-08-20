import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EventsComponent } from './events.component';

describe('EventsComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [EventsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  }));

  it('normalizes Plotly payloads into a serializable summary', () => {
    const component = TestBed.createComponent(EventsComponent).componentInstance;

    component.capture('plotlyClick', {
      points: [{ x: 31, y: 49, text: 'Comet', fullData: { circular: 'not copied' } }],
    });

    expect(JSON.parse(component.eventJson)).toEqual({
      event: 'plotlyClick', pointCount: 1, x: 31, y: 49, label: 'Comet',
    });
  });

  it('handles empty selection events', () => {
    const component = TestBed.createComponent(EventsComponent).componentInstance;

    component.capture('selected', undefined);

    expect(component.lastEvent).toEqual({ event: 'selected', pointCount: 0 });
  });
});

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-chart-card',
  template: `
    <article class="chart-card">
      <header class="chart-card-header">
        <div>
          <p class="card-kicker">{{ kicker() }}</p>
          <h2>{{ title() }}</h2>
        </div>
        <ng-content select="[card-actions]"></ng-content>
      </header>
      <p class="chart-card-description">{{ description() }}</p>
      <ng-content></ng-content>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ChartCardComponent {
  kicker = input('Live example');
  title = input.required<string>();
  description = input.required<string>();
}

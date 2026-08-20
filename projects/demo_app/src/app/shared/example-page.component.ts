import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-example-page',
  template: `
    <section class="page-heading shell">
      <a class="back-link" routerLink="/examples"><span aria-hidden="true">←</span> All examples</a>
      <p class="eyebrow">{{ eyebrow() }}</p>
      <h1>{{ title() }}</h1>
      <p class="page-summary">{{ description() }}</p>
    </section>
    <div class="shell example-content">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ExamplePageComponent {
  eyebrow = input('Angular integration example');
  title = input.required<string>();
  description = input.required<string>();
}

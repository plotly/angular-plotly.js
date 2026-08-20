import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-code-block',
  template: `
    <figure class="code-block">
      <figcaption>{{ label() }}</figcaption>
      <pre><code>{{ code() }}</code></pre>
    </figure>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CodeBlockComponent {
  label = input('Angular template');
  code = input.required<string>();
}

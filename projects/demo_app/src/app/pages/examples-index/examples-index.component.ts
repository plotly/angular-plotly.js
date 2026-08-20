import { ChangeDetectionStrategy, Component } from '@angular/core';

interface DemoExample {
  route: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  accent: string;
}

@Component({
  selector: 'app-examples-index',
  templateUrl: './examples-index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ExamplesIndexComponent {
  readonly examples: DemoExample[] = [
    {
      route: '/examples/getting-started',
      number: '01',
      title: 'Getting started',
      description: 'Create a responsive mixed chart and learn the essential component inputs.',
      tags: ['data', 'layout', 'config'],
      accent: 'purple',
    },
    {
      route: '/examples/reactive-updates',
      number: '02',
      title: 'Reactive updates',
      description: 'Drive deterministic plot updates from Angular state with explicit revisions.',
      tags: ['revision', 'update'],
      accent: 'pink',
    },
    {
      route: '/examples/events',
      number: '03',
      title: 'Events and selection',
      description: 'Turn Plotly clicks, hovers, and selections into Angular event handlers.',
      tags: ['plotlyClick', 'hover', 'selected'],
      accent: 'cyan',
    },
    {
      route: '/examples/dashboard',
      number: '04',
      title: 'Responsive dashboard',
      description: 'Compose multiple chart types into a responsive analytics view.',
      tags: ['responsive', 'composition'],
      accent: 'blue',
    },
    {
      route: '/examples/lifecycle',
      number: '05',
      title: 'Lifecycle and debugging',
      description: 'Observe initialization, cleanup, errors, and the optional debug handle.',
      tags: ['initialized', 'purge', 'debug'],
      accent: 'green',
    },
  ];
}

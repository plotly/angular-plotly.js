import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AppComponent {
  navigationOpen = false;

  toggleNavigation(): void {
    this.navigationOpen = !this.navigationOpen;
  }

  closeNavigation(): void {
    this.navigationOpen = false;
  }
}

import { Component } from '@angular/core';

@Component({
    // tslint:disable-next-line component-selector
    selector: 'app-root',
    template: '<div><plotly-demo></plotly-demo></div>',
})
export class AppComponent {
    title = 'Angular Plotly';
}

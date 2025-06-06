import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo_app';

   public graph = {
        data: [
            { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: {color: 'red'} },
            { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
        ],
        layout: {width: 320, height: 240, title: 'A Fancy Plot'}
    };
}

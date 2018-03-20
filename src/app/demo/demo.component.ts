import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'plotly-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('sim');
  }

}

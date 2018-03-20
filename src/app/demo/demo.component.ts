import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'plotly-demo',
    templateUrl: './demo.component.html',
    styleUrls: []
})
export class DemoComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
        this.router.events.subscribe(event => {
            console.log(event);
        });
    }

}

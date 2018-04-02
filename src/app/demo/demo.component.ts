import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
    selector: 'plotly-demo',
    templateUrl: './demo.component.html',
    styleUrls: []
})
export class DemoComponent implements OnInit {
    public data: any;
    public title: string;

    constructor(private router: Router, protected route: ActivatedRoute) {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => {
                let child = this.route.firstChild;
                while (child) {
                    if (child.firstChild) {
                        child = child.firstChild;
                    } else if (child.snapshot.data && child.snapshot.data.title) {
                        return child.snapshot.data.title;
                    } else {
                        return null;
                    }
                }
            }).subscribe((title: string) => {
                this.title = title;
            });
    }

    ngOnInit() {}

}

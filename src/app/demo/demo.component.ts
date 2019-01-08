import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { filter, map } from 'rxjs/operators';


@Component({
    selector: 'plotly-demo',
    templateUrl: './demo.component.html',
    styleUrls: []
})
export class DemoComponent implements OnInit {
    public data: any;
    public title: string;

    constructor(private router: Router, protected route: ActivatedRoute) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => {
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
            })
        ).subscribe((title: string) => {
            this.title = title;
        });
    }

    ngOnInit() {}
}

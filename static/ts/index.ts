import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers, Response} from 'angular2/http';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import  'rxjs/Rx';
declare var jQuery:any;

@Component({
    selector: 'angular2',
    template: `<h1>Pages Router</h1>
    <nav>
      <a [routerLink]="['Login']">Login</a>
      <a [routerLink]="['Terminal']">Terminal</a>
    </nav> `,
    directives: [ROUTER_DIRECTIVES]
})

export class IndexComponent {
    constructor(private http:Http,
                private _router:Router) {
    }

    ngOnInit() {
        var csrftoken = jQuery('meta[name=csrf-token]').attr('content');
        var authHeader:Headers = new Headers();
        authHeader.append('Content-Type', 'application/x-www-form-urlencoded');
        if (csrftoken) {
            authHeader.append('X-CSRFToken', csrftoken);
        }

        this.http.get('/checklogin')
            .map(res => res.json())
            .subscribe(
                data => {
                    this.data = data
                },
                err => this.logError(err),
                () => {
                    if (this.data.logined) {
                        this._router.parent.navigate(['Terminal']);
                    }
                }
            );
    }
}



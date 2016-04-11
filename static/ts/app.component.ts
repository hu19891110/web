/**
 * Created by liuzheng on 4/7/16.
 */

import {Component}         from 'angular2/core';
import {Http} from 'angular2/http';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import  'rxjs/Rx';
declare var jQuery:any;

import {IndexComponent} from './index';
import {LoginComponent} from './login';
import {TermComponent} from './terminal';

@Component({
    selector: 'angular2',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {path: '/', name: 'Index', component: IndexComponent, useAsDefault: true},
    {path: '/login', name: 'Login', component: LoginComponent},
    {path: '/terminal', name: 'Terminal', component: TermComponent},
])
export class AppComponent {
    constructor(private http:Http,
                private _router:Router) {
    }

    ngOnInit() {
        this.http.get('/checklogin')
            .map(res => res.json())
            .subscribe(
                data => this.data = data,
                err => this.logError(err),
                () => {
                    if (this.data.logined) {
                        jQuery('body').addClass('logined');
                        this._router.navigate(['Index']);
                    } else {
                        this._router.navigate(['Login']);
                    }
                    jQuery('angular2').show();
                }
            );
    }
}

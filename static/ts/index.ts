/**
 * Created by liuzheng on 4/7/16.
 */

import {bootstrap}        from 'angular2/platform/browser';
import {Http, HTTP_PROVIDERS}   from 'angular2/http';
import {Component}         from 'angular2/core';
import {ROUTER_PROVIDERS, RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import  'rxjs/Rx';
declare var jQuery:any;

import {LoginComponent} from './login';
import {TermComponent} from './terminal';
import {DashboardComponent} from './dashboard';
import {HeaderComponent} from './header';
import {LeftbarComponent} from './leftbar';
import {NgbodyComponent} from './ngbody';
import {NgfootComponent} from './ngfoot';


@Component({
    selector: 'div',
    template: `<header class="main-header"></header><aside class="main-sidebar"></aside><ng-body></ng-body><footer class="main-footer"></footer>`,
    directives: [HeaderComponent, LeftbarComponent, NgbodyComponent, NgfootComponent]
})

export class IndexComponent {

}

@Component({
    selector: 'angular2',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {path: '/', name: 'Index', component: IndexComponent, useAsDefault: true},
    {path: '/login', name: 'Login', component: LoginComponent},
    {path: '/terminal', name: 'Terminal', component: TermComponent},
    {path: '/dashboard', name: 'Dashboard', component: DashboardComponent},
])


export class AppComponent {
    constructor(private http:Http,
                private _router:Router) {
    }

    ngOnInit() {
        // this.http.get('/checklogin')
        //     .map(res => res.json())
        //     .subscribe(
        //         data => this.data = data,
        //         err => this.logError(err),
        //         () => {
        //             if (this.data.logined) {
        //                 // jQuery('body').addClass('logined');
        //                 // this._router.navigate(['Index']);
        //             } else {
        //                 this._router.navigate(['Login']);
        //             }
                    jQuery('angular2').show();
        //         }
        //     );
    }
}

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS
]);

/**
 * Created by liuzheng on 4/7/16.
 */

import {bootstrap}        from 'angular2/platform/browser';
import {Http, HTTP_PROVIDERS}   from 'angular2/http';
import {Component}         from 'angular2/core';
import {ROUTER_PROVIDERS, RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import  'rxjs/Rx';
declare var jQuery:any;
import {DynamicRouteConfigurator} from './dynamicRouteConfigurator'
import {LoginComponent} from './login';
import {TermComponent} from './terminal';
import {DashboardComponent, Dashboard} from './dashboard';
import {NavComponent} from './ngnav';
import {LeftbarComponent} from './leftbar';
// import {NgbodyComponent} from './ngbody';
import {FOFComponent} from './404';
import {ForgotComponent} from './forgot';
import {NavcatbarComponent} from './nav_cat_bar';

@Component({
    selector: 'div',
    template: `<ng-left></ng-left><div id="page-wrapper" class="gray-bg">
        <div class="row border-bottom">
            <ng-nav-bar></ng-nav-bar>
        </div>
        <ng-nav-cat-bar ></ng-nav-cat-bar>
        <ng-body></ng-body>
        <div class="footer fixed">
            <div class="pull-right">
                Version <strong>0.3.1</strong> GPL.
            </div>
            <div>
                <strong>Copyright</strong> Jumpserver.org Team &copy; 2014-2015
            </div>
        </div>
    </div>`,
    directives: [LeftbarComponent, NavComponent,NavcatbarComponent, Dashboard]
})

export class IndexComponent {

}

@Component({
    viewProviders: [DynamicRouteConfigurator],
    selector: 'angular2',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {path: '', name: 'Index', component: IndexComponent, useAsDefault: true},
    {path: '/login', name: 'Login', component: LoginComponent},
    {path: '/terminal', name: 'Terminal', component: TermComponent},
    {path: '/dashboard', name: 'Dashboard', component: DashboardComponent},
    {path: '/404', name: 'FOF', component: FOFComponent},
    {path: '/forgot', name: 'Forgot', component: ForgotComponent},
])


export class AppComponent {
    appRoutes:string[][];
    appRouteslist:string[];

    constructor(private http:Http,
                private _router:Router,
                private dynamicRouteConfigurator:DynamicRouteConfigurator) {
        this.appRouteslist = this.dynamicRouteConfigurator.getRoutes(this.constructor).configs
            .map(route => {
                return route['path']
            });
        this.appRoutes = this.dynamicRouteConfigurator.getRoutes(this.constructor).configs
    }


    ngOnInit() {
        if (jQuery.inArray(this._router.lastNavigationAttempt, this.appRouteslist) == -1) {
            this._router.navigate(['FOF']);
            jQuery('angular2').show();
        } else if(this._router.lastNavigationAttempt=='/forgot'){
            jQuery('angular2').show();
        }else {
            this.http.get('/api/checklogin')
                .map(res => res.json())
                .subscribe(
                    data => this.data = data,
                    err => this.logError(err),
                    () => {
                        if (this.data.logined) {
                            // jQuery('body').addClass('logined');
                            if (this._router.lastNavigationAttempt == '/login') {
                                this._router.navigate(['Index']);
                            } else {
                                for (var i in this.appRoutes) {
                                    if (this.appRoutes[i]['path'] == this._router.lastNavigationAttempt)
                                        this._router.navigate([this.appRoutes[i]['name']]);
                                }

                            }
                        } else {
                            this._router.navigate(['Login']);
                        }
                        jQuery('angular2').show();

                    })
        }
    }

}

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS
]);

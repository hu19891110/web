/**
 * Created by liuzheng on 4/7/16.
 */

import {bootstrap}        from 'angular2/platform/browser';
import {Http, HTTP_PROVIDERS}   from 'angular2/http';
import {Component, Injectable}         from 'angular2/core';
import {ROUTER_PROVIDERS, RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import  'rxjs/Rx';
declare var jQuery:any;
import {DynamicRouteConfigurator} from './dynamicRouteConfigurator';
import {LoginComponent} from './login';
import {TermComponent} from './terminal';
import {DashboardComponent, Dashboard} from './dashboard';
import {NavComponent} from './ngnav';
import {LeftbarComponent} from './leftbar';
// import {NgbodyComponent} from './ngbody';
import {FOFComponent} from './404';
import {ForgotComponent} from './forgot';
import {NavcatbarComponent} from './nav_cat_bar';
import {Logger} from "angular2-logger/core";
import {AppService, User, DataStore} from './service';
import {UserProfileComponent} from './juser/userprofile';
import {ChangeInfoComponent} from './juser/changinfo';
import {GrouplistComponent} from './juser/grouplist';
import {UserlistComponent} from './juser/userlist';
import {UsereditComponent} from './juser/useredit';
import {UserdetailComponent} from './juser/userdetail';
import {SomethingComponent} from './copy-model';

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
    directives: [LeftbarComponent, NavComponent, NavcatbarComponent, Dashboard]
})

export class IndexComponent {
    appRoutes:string[][];
    appRouteslist:string[];
    data:{};
    user:User;

    constructor(private http:Http,
                private _router:Router,
                private _appService:AppService,
                private dynamicRouteConfigurator:DynamicRouteConfigurator,
                private _logger:Logger) {
        DataStore.activenav = {'name': '仪表盘', 'path': [{'href': 'Index', 'name': ''},{'name':'仪表盘','href':'Index'}]}

    }
}

@Component({
    viewProviders: [DynamicRouteConfigurator],
    selector: 'angular2',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [AppService]
})

@RouteConfig([
    {path: '/', name: 'Index', component: IndexComponent, useAsDefault: true},
    {path: '/login', name: 'Login', component: LoginComponent},
    {path: '/terminal', name: 'Terminal', component: TermComponent},
    {path: '/dashboard', name: 'Dashboard', component: DashboardComponent},
    {path: '/404', name: 'FOF', component: FOFComponent},
    {path: '/forgot', name: 'Forgot', component: ForgotComponent},
    {path: '/Assetlist', name: 'Assetlist', component: IndexComponent},
    {path: '/Log', name: 'Log', component: IndexComponent},
    {path: '/userprofile/:id', name: 'UserProfile', component: UserProfileComponent},
    {path: '/juser/changeinfo', name: 'ChangeInfo', component: ChangeInfoComponent},
    {path: '/juser/group/list', name: 'UserGrouplist', component: GrouplistComponent},
    {path: '/juser/user/list', name: 'UserList', component: UserlistComponent},
    {path: '/juser/user/edit/:id', name: 'UserEdit', component: UsereditComponent},
    {path: '/juser/user/group/:id', name: 'UserGroup', component: UserlistComponent},
    {path: '/juser/detail/:id', name: 'UserDetail', component: UserdetailComponent},
    {path: '/examplepage', name: 'Something', component: SomethingComponent},
])


export class AppComponent {
    appRoutes:string[];
    data:{};
    user:User;

    constructor(private http:Http,
                private _router:Router,
                private _appService:AppService,
                private dynamicRouteConfigurator:DynamicRouteConfigurator,
                private _logger:Logger) {
        this.appRoutes = this.dynamicRouteConfigurator.getRoutes(this.constructor).configs
            .map(route => {
                return {
                    'path': route['path'],
                    'name': route['name'],
                    'regex': route['path'].replace(/(:[^\/]*)/g, '[:]?([^\/]*)'),
                    'res': {}
                }
            });
        DataStore.route = this.appRoutes;
    }


    ngOnInit() {
        this._logger.log('index.tx:AppComponent,ngOnInit');
        this._appService.checklogin(this._router.lastNavigationAttempt);
        this._appService.getMyinfo();

    }

}

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    Logger,
    AppService
]);




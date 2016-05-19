/**
 * Created by liuzheng on 4/7/16.
 */


import {Http, HTTP_PROVIDERS}   from 'angular2/http';
import {Component}         from 'angular2/core';
import {ROUTER_PROVIDERS, RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import  'rxjs/Rx';
declare var jQuery:any;
import {DynamicRouteConfigurator} from '../dynamicRouteConfigurator'
import {LoginComponent} from '../login';
import {TermComponent} from '../terminal';
import {DashboardComponent, Dashboard} from '../dashboard';
import {NavComponent} from '../ngnav';
import {LeftbarComponent} from '../leftbar';
// import {NgbodyComponent} from './ngbody';
import {FOFComponent} from '../404';
import {ForgotComponent} from '../forgot';
import {NavcatbarComponent} from '../nav_cat_bar';

@Component({
    selector: 'ng-body',
    template: `<body-dash></body-dash>`,
    directives: [DashboardComponent]
})

export class Userlist {
}

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
    directives: [LeftbarComponent, NavComponent,NavcatbarComponent, Userlist]
})
export class UserlistComponent {

}
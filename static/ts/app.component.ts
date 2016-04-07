/**
 * Created by liuzheng on 4/7/16.
 */

import {Component}         from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {IndexComponent} from './index';
import {LoginComponent} from './login';
import {TermComponent} from './terminal';

@Component({
    selector: 'angular2',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {path: '/', name: 'Index', component: IndexComponent, useAsDefault:true},
    {path: '/login', name: 'Login', component: LoginComponent},
    {path: '/terminal', name: 'Terminal', component: TermComponent},
])
export class AppComponent {
}

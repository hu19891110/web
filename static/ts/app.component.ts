import {Component}         from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {LoginComponent} from './login';
import {TermComponent} from './terminal';

@Component({
    selector: 'angular2',
    template: `<h1>Component Router</h1>
    <nav>
      <a [routerLink]="['Login']">Login</a>
      <a [routerLink]="['Terminal']">Terminal</a>
    </nav>
    <router-outlet></router-outlet>
`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {path: '/login', name: 'Login', component: LoginComponent},
    {path: '/terminal', name: 'Terminal', component: TermComponent},
])
export class AppComponent {
}

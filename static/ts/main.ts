import {AppComponent}     from './app.component';
import {bootstrap}        from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_BINDINGS} from 'angular2/http';

bootstrap(AppComponent, [
    HTTP_BINDINGS,
    ROUTER_PROVIDERS
]);

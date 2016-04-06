import {bootstrap}    from 'angular2/platform/browser';
import { HTTP_PROVIDERS } from 'angular2/http';
import {LoginComponent} from './login';
bootstrap(LoginComponent, [ HTTP_PROVIDERS ]);

/**
 * Created by liuzheng on 4/7/16.
 */

import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import {Http, HTTP_PROVIDERS, Headers, Response} from 'angular2/http';
import {RouteParams, Router} from 'angular2/router';
import  'rxjs/Rx';
declare var jQuery:any;
import {TermComponent} from 'terminal'


@Component({
    selector: 'ng-body',
    template: `<ng-terminal></ng-terminal>`
    directives:[TermComponent]
})

export class NgbodyComponent {
}
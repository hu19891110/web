/**
 * Created by liuzheng on 4/12/16.
 */

import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers, Response} from 'angular2/http';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import  'rxjs/Rx';
declare var jQuery:any;
declare var echarts:any;

import {DataStore} from './service'

@Component({
    selector: 'ng-nav-cat-bar',
    template: `
<div class="row wrapper border-bottom white-bg page-heading"><div class="col-sm-10">
        <h2 [innerHTML]="DataStore.activenav.name"></h2>
        <ol class="breadcrumb">
            <li *ngFor="#v of DataStore.activenav.path">
                <a [routerLink]="[v.href]" [innerHTML]="v.name"></a>
            </li>
        </ol>
    </div>
    <div class="col-sm-2">
    </div></div>`,
    directives: [ROUTER_DIRECTIVES]
})

export class NavcatbarComponent {
    DataStore=DataStore;
    constructor() {
    }

    ngOnInit() {

    }

}

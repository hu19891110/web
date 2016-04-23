/**
 * Created by liuzheng on 4/12/16.
 */

import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers, Response} from 'angular2/http';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import  'rxjs/Rx';
declare var jQuery:any;
declare var echarts:any;


@Component({
    selector: 'ng-nav-cat-bar',
    template: `
<div class="row wrapper border-bottom white-bg page-heading"><div class="col-sm-10">
        <h2>header_title </h2>
        <ol class="breadcrumb">
            <li>
                <a href="/">仪表盘</a>
            </li>
            <li>
             if path1 
                <a> path1 </a>
             endif  
            </li>
             if path2
            <li class="active">
                <strong> path2  </strong>
            </li>
           endif
        </ol>
    </div>
    <div class="col-sm-2">
    </div></div>`,
    directives: [ROUTER_DIRECTIVES]
})

export class NavcatbarComponent {
    constructor(private http:Http,
                private _router:Router) {
    }

    ngOnInit() {

    }

}

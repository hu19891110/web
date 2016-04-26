/**
 * Created by liuzheng on 4/26/16.
 */

import {Component} from 'angular2/core';
import {Logger} from "angular2-logger/core";
import {ROUTER_DIRECTIVES} from 'angular2/router';
declare var jQuery:any;
declare var layer:any;

import {NavComponent} from './ngnav';
import {LeftbarComponent} from './leftbar';
import {NavcatbarComponent} from './nav_cat_bar';
import {AppService, User, Join} from './service';

@Component({
    selector: 'ng-body',
    template: `
{{user.id}}
<!--<p [(ngModel)]="users.id"></p>-->
<!--<p [(ngModel)]="users.name"></p>-->
<!--<p [(ngModel)]="users.username"></p>-->
<!--<p [(ngModel)]="users.password"></p>-->
<!--<p [(ngModel)]="users.avatar"></p>-->
<!--<p [(ngModel)]="users.role"></p>-->
<!--<p [(ngModel)]="users.role"></p>-->
<!--<p [(ngModel)]="users.email"></p>-->
<!--<p [(ngModel)]="users.is_active"></p>-->
<!--<p [(ngModel)]="users.date_joined"></p>-->
<!--<p [(ngModel)]="users.last_login"></p>-->
<!--<p [innerHTML]="users.groups|join:', '"></p>-->
<!--<p [(ngModel)]="user.id"></p>-->
<!--<p [(ngModel)]="user.name"></p>-->
<!--<p [(ngModel)]="user.username"></p>-->
<!--<p [(ngModel)]="user.password"></p>-->
<!--<p [(ngModel)]="user.avatar"></p>-->
<!--<p [(ngModel)]="user.role"></p>-->
<!--<p [(ngModel)]="user.role"></p>-->
<!--<p [(ngModel)]="user.email"></p>-->
<!--<p [(ngModel)]="user.is_active"></p>-->
<!--<p [(ngModel)]="user.date_joined"></p>-->
<!--<p [(ngModel)]="user.last_login"></p>-->
<!--<p [innerHTML]="user.groups|join:', '"></p>-->
    `,
    directives: [ROUTER_DIRECTIVES],
    pipes: [Join]
})

export class Something {
    user:User;
    users:User;

    constructor(private _logger:Logger,
                private _appService:AppService) {
        this._logger.log('copy-model.ts:Something,constructor');

    }

    ngOnInit() {
        this._logger.log('copy-model.ts:Something,ngOnInit');
        // this.user = this._appService.getMyinfo();
        //
        // this._appService.getMyinfoFromServer().subscribe(response => {
        //     this.users = response;
        //     this._logger.debug(response)
        // });
    }

    ngAfterViewInit() {
        this._logger.log('copy-model.ts:Something,ngAfterViewInit');
        // this._appService.getMyinfoFromServer().subscribe(response => {
        //     this.user = response;
        //     this._appService.setMyinfo(this.user);
        // });
        // this.user = this._appService.getMyinfo()
        // this._logger.log(this._appService.getMyinfo())

    }


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
    directives: [LeftbarComponent, NavComponent, NavcatbarComponent, Something]
})
export class SomethingComponent {

}
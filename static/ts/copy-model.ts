/**
 * Created by liuzheng on 4/26/16.
 */

import {Component} from 'angular2/core';
import {Logger} from "angular2-logger/core";
import {ROUTER_DIRECTIVES} from 'angular2/router';
declare var jQuery:any;
declare var layer:any;
import {Http, HTTP_PROVIDERS}   from 'angular2/http';

import {NavComponent} from './ngnav';
import {LeftbarComponent} from './leftbar';
import {NavcatbarComponent} from './nav_cat_bar';
import {AppService, User, Join, DataStore} from './service';

@Component({
    selector: 'ng-body',
    template: `
<p [innerHTML]="DataStore.user.id"></p>
<p [innerHTML]="DataStore.user.name"></p>
<p [innerHTML]="DataStore.user.username"></p>
<p [innerHTML]="DataStore.user.password"></p>
<p [innerHTML]="DataStore.user.avatar"></p>
<p [innerHTML]="DataStore.user.role"></p>
<p [innerHTML]="DataStore.user.email"></p>
<p [innerHTML]="DataStore.user.is_active"></p>
<p [innerHTML]="DataStore.user.date_joined"></p>
<p [innerHTML]="DataStore.user.last_login"></p>
<p [innerHTML]="DataStore.user.groups|join:', '"></p>
<button (click)="show()">Change User avatar,you will find the left bar's user avatar will change</button>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [AppService],
    pipes: [Join]
})

export class Something {
    DataStore = DataStore;

    constructor(private http:Http,
                private _logger:Logger,
                private _appService:AppService) {
        this._logger.log('copy-model.ts:Something,constructor');
        this._appService.getMyinfo();
        // this._logger.debug(DataStore.user);
        // this.user=user
    }

    ngOnInit() {

        this._logger.log('copy-model.ts:Something,ngOnInit');

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
// this._logger.error(user)
    }

    show() {
        DataStore.user.id = 5001;
        DataStore.user.name = '美女';
        DataStore.user.avatar = 'user3-128x128.jpg';
        DataStore.user.role = '普通用户';
        this.http.get('/api/nav_user')
            .map(res => res.json())
            .subscribe(response => {
                DataStore.nav = response;
            });
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
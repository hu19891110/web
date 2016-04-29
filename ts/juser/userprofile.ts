/**
 * Created by liuzheng on 4/7/16.
 */


import {Http, HTTP_PROVIDERS}   from 'angular2/http';
import {Component}         from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Logger} from "angular2-logger/core";

import  'rxjs/Rx';
declare var jQuery:any;

import {AppService, User, Join} from '../service';

@Component({
    selector: 'angular2',
    template: `<div class="row">
            <div class="contact-box">
                <h2 class="text-center" [innerHTML]="user.name"></h2>
                <div class="ibox-content">

                    <table class="table table-striped table-bordered table-hover " id="editable" >
                        <thead>
                            <tr>
                                <td class="text-center" width="120">ID</td>
                                <td class="text-center">用户名</td>
                                <td class="text-center">姓名</td>
                                <td class="text-center">关联用户</td>
                                <td class="text-center">Email</td>
                                <td class="text-center">激活</td>
                            </tr>
                        </thead>
                        <tbody>
                        
                        <tr class="gradeX">
                            <td class="text-center" [innerHTML]="user.id"></td>
                            <td class="text-center" [innerHTML]="user.username"></td>
                            <td class="text-center" [innerHTML]="user.name"></td>
                            <td class="text-center" [innerHTML]="user.role"></td>
                            <td class="text-center" [innerHTML]="user.email"></td>
                            <td class="text-center" [innerHTML]="user.is_active"></td>
                        </tr>
                        <tr>
                            <td class="text-center">添加日期： </td>
                            <td colspan="2" class="text-center" [innerHTML]="user.date_joined"></td>
                            <td class="text-center">最后登录： </td>
                            <td colspan="3" class="text-center" [innerHTML]="user.last_login"></td>
                        </tr>
                        <tr>
                            <td colspan="1" class="text-center">用户组：</td>
                            <td colspan="6" class="text-center">
                                    <b [innerHTML]="user.groups|join:', '"></b>
                            </td>
                        </tr>
                        
                    </table>
            </div>
        </div>`,
    providers: [AppService],
    pipes: [Join]
})
export class UserProfileComponent {
    user:User = new User;

    constructor(private _routeParams:RouteParams,
                private _appService:AppService,
                private _logger:Logger) {
    };

    ngOnInit() {
        let id = this._routeParams.get('id');
        this._appService.getUser(1)
            .subscribe(response => {
                this.user = response
            });
        this._logger.log('appService.getUser');
        this._logger.debug(this.user)

    }
}
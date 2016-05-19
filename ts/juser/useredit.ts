/**
 * Created by liuzheng on 4/7/16.
 */


import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers, Response} from 'angular2/http';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import  'rxjs/Rx';
declare var jQuery:any;
declare var layer:any;

import {NavComponent} from '../ngnav';
import {LeftbarComponent} from '../leftbar';
import {NavcatbarComponent} from '../nav_cat_bar';
import {User, Join, Group, AppService, DataStore} from '../service';
import {Logger} from "angular2-logger/core";

@Component({
    selector: 'ng-body',
    template: `<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
        <div class="col-sm-10">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>编辑用户信息</h5>
                    <div class="ibox-tools">
                        <a class="collapse-link">
                            <i class="fa fa-chevron-up"></i>
                        </a>
                        <a class="dropdown-toggle" data-toggle="dropdown">
                            <i class="fa fa-wrench"></i>
                        </a>
                        <a class="close-link">
                            <i class="fa fa-times"></i>
                        </a>
                    </div>
                </div>
                <div class="ibox-content">
                    <form method="post" id="userForm" class="form-horizontal"
                          >
                        <div class="alert alert-warning text-center" *ngIf="DataStore.error.useredit"
                             [innerHTML]="DataStore.error.useredit"></div>
                        <div class="alert alert-success text-center" *ngIf="DataStore.msg.useredit"
                             [innerHTML]="DataStore.msg.useredit"></div>
                        <div class="form-group">
                            <label for="username" class="col-sm-2 control-label">用户名<span
                                    class="red-fonts">*</span></label>
                            <div class="col-sm-8">
                                <input id="username" name="username" placeholder="Username" type="text"
                                       class="form-control" [(ngModel)]="user.username" readonly>
                            </div>
                        </div>
                        <div class="hr-line-dashed"></div>
                        <div class="form-group">
                            <label for="password" class="col-sm-2 control-label">密码</label>
                            <div class="col-sm-8">
                                <input id="password" name="password" placeholder="Password" type="password"
                                       class="form-control" [(ngModel)]="user.password">
                                    <span class="help-block m-b-none">
                                        登陆web的密码（如不修改请留空）
                                    </span>
                            </div>
                        </div>
                        <div class="hr-line-dashed"></div>
                        <div class="form-group">
                            <label for="name" class="col-sm-2 control-label">姓名<span class="red-fonts">*</span></label>
                            <div class="col-sm-8">
                                <input id="name" name="name" placeholder="Name" type="text" class="form-control"
                                       [(ngModel)]="user.name">
                            </div>
                        </div>
                        <div class="hr-line-dashed"></div>
                        <div class="form-group">
                            <label for="groups" class="col-sm-2 control-label">小组</label>
                            <div class="col-sm-8">
                                <select id="groups" name="groups" class="form-control m-b" multiple size="12">
                                    <option [value]="group.id" *ngFor="#group of groups"
                                            [innerHTML]="group.name"></option>
                                    <!--TODO: select the option-->
                                </select>
                            </div>
                        </div>
                        <div class="hr-line-dashed"></div>
                        <div class="form-group">
                            <label for="role" class="col-sm-2 control-label">权限<span class="red-fonts">*</span></label>
                            <div class="col-sm-8">
                                <div class="col-sm-3" *ngFor="#rolename of roles;#r = index">
                                    <div class="radio i-checks">
                                        <label><input type="radio" [value]="r" class="role" name="role">
                                                      <p [innerHTML]="rolename"></p>
                                            <!--TODO: input check-->
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--<div class="form-group" id="admin_groups" *ngIf="user.role =='超级管理员'">-->
                            <!--<label for="role" class="col-sm-2 control-label">管理用户组</label>-->
                            <!--<div class="col-sm-8">-->
                                <!--<div class="col-sm-3" *ngFor="#usergroup of groupall">-->
                                    <!--<div class="checkbox i-checks">-->
                                        <!--<label>-->
                                            <!-- TODO: if usergroup.id|int2str in admin_groups_str checked input -->
                                            <!--<input type="checkbox" [value]="usergroup.id"-->
                                                   <!--name="admin_groups" checked>-->
                                            <!--<span [innerHTML]="usergroup.name"></span>-->
                                        <!--</label>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                        <div class="hr-line-dashed"></div>
                        <div class="form-group">
                            <label for="email" class="col-sm-2 control-label">Email<span
                                    class="red-fonts">*</span></label>
                            <div class="col-sm-8">
                                <input id="email" name="email" type="email" placeholder="Email" class="form-control"
                                       [(ngModel)]="user.email">
                            </div>
                        </div>
                        <div class="hr-line-dashed"></div>
                        <div class="form-group"><label class="col-sm-2 control-label">额外</label>
                            <div class="col-sm-2">
                                <div class="checkbox i-checks">
                                    <label><input type="checkbox" [value]="user.is_active" name="extra">启用 </label>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <div class="checkbox i-checks">
                                    <label><input type="checkbox" value="1" name="extra">发送邮件 </label>
                                </div>
                            </div>
                        </div>
                        <div class="hr-line-dashed"></div>
                        <div class="form-group">
                            <div class="col-sm-4 col-sm-offset-2">
                                <button class="btn btn-white" type="submit">取消</button>
                                <button id="submit_button" class="btn btn-primary" type="submit">确认保存</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [AppService],
    pipes: [Join]
})

export class Useredit {
    user:User=new User();
    DataStore = DataStore;
    roles:Array<string>;
    groups:Array<string>;

    constructor(
                private _routeParams:RouteParams,
                private _logger:Logger,
                private _appService:AppService) {
        this._logger.log('useredit.ts:Useredit,constructor');
        DataStore.activenav = {
            'name': '编辑用户',
            'path': [{'href': 'Index', 'name': '仪表盘'}, {'href': 'UserList', 'name': '用户管理'}, {
                'href': 'Index',
                'name': '编辑用户'
            }]
        }

    }

    ngOnInit() {
        let id = this._routeParams.get('id');
        this._appService.getUser(id).subscribe(response =>this.user = response);
        this.groups = ['a','b'];
        this.roles = ['a','b']
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
    directives: [LeftbarComponent, NavComponent, NavcatbarComponent, Useredit]
})
export class UsereditComponent {

}
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
import {User, Join, Group, AppService} from '../service';
import {Logger} from "angular2-logger/core";

@Component({
    selector: 'ng-body',
    template: `<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
        <div class="col-sm-12">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5> 查看用户 </h5>
                    <div class="ibox-tools">
                        <a class="collapise-link">
                            <i class="fa fa-chevron-up"></i>
                        </a>
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i class="fa fa-wrench"></i>
                        </a>
                        <a class="close-link">
                            <i class="fa fa-times"></i>
                        </a>
                    </div>
                </div>

                <div class="ibox-content">
                    <div class="">
                        <a href="{% url 'user_add' %}" class="btn btn-sm btn-primary "> 添加用户 </a>
                        <a id="del_btn" class="btn btn-sm btn-danger "> 删除所选 </a>
                        <form id="search_form" method="get" action="" class="pull-right mail-search">
                            <div class="input-group">
                                <input type="text" class="form-control input-sm" id="search_input" name="keyword" placeholder="Search">
                                <div class="input-group-btn">
                                    <button id='search_btn' type="submit" class="btn btn-sm btn-primary">
                                        -搜索-
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <table class="table table-striped table-bordered table-hover " id="editable" >
                        <thead>
                            <tr>
                                <th class="text-center">
                                    <input type="checkbox" id="check_all" onclick="checkAll('check_all', 'checked')">
                                </th>
                                <th class="text-center">用户名</th>
                                <th class="text-center">姓名</th>
                                <th class="text-center">小组</th>
                                <th class="text-center">权限</th>
                                <th class="text-center">主机数量</th>
                                <th class="text-center">激活</th>
                                <th class="text-center">下载密钥</th>
                                <th class="text-center">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="gradeX" *ngFor="#user of users">
                                <td class="text-center">
                                    <input type="checkbox" name="checked" [(ngModel)]="user.checked">
                                </td>
                                <td class="text-center">
                                <a [routerLink]="['UserDetail',{'id':user.id}]" [innerHTML]="user.username"></a></td>
                                <td class="text-center" [innerHTML]="user.name"></td>
                                <td class="text-center" [innerHTML]="user.group|join:', '" ></td>
                                <td class="text-center" [innerHTML]="user.role"></td>
                                <th class="text-center" [innerHTML]="user.machines"></th>
                                <td class="text-center" [innerHTML]="user.is_active"></td>
                                <td class="text-center">
                                        <a *ngIf="user.key" (click)="downloadkey(user.uuid)">下载</a>
                                        <a (click)="genSSH()" *ngIf="!user.key">NoKey GenOne?</a>
                                </td>
                                <td class="text-center">
                                    <a class="btn btn-xs btn-info" (click)="edituser(user.id)">编辑</a>
                                    <a class="btn btn-xs btn-warning email" (click)="sendEmail(user.uuid)">Email</a>
                                    <a  class="btn btn-xs btn-danger" (click)="deluser(user.id)" *ngIf="user.username=='admin'">删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="row">
                        <!--<div class="col-sm-6">-->
                            <!--<div class="dataTables_info" id="editable_info" role="status" aria-live="polite">-->
                                <!--Showing {{ users.start_index }} to {{ users.end_index }} of {{ p.count }} entries-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--TODO: page split-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [AppService],
    pipes: [Join]
})

export class Userlist {
    users:Array<User>;

    constructor(private http:Http,
                private _router:Router,
                private _logger:Logger,
                private _appService:AppService) {

    }

    ngOnInit() {
        this._appService.getUserlist().subscribe(response =>this.users = response);
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
    directives: [LeftbarComponent, NavComponent, NavcatbarComponent, Userlist]
})
export class UserlistComponent {

}
/**
 * Created by liuzheng on 4/12/16.
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
import {User, Group, AppService, DataStore} from '../service';
import {Logger} from "angular2-logger/core";

@Component({
    selector: 'ng-body',
    template: `<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
        <div class="col-sm-10">
            <div class="ibox float-e-margins">

                <div class="ibox-title">
                    <h5> 查看用户组</h5>
                    <div class="ibox-tools">
                        <a class="collapse-link">
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
                    <a (click)="groupadd()" class="btn btn-sm btn-primary "> 添加用户组 </a>
                    <a  (click)="deleteselect()" class="btn btn-sm btn-danger "> 删除所选 </a>
                    <form id="search_form" method="get" action="" class="pull-right mail-search">
                        <div class="input-group">
                            <input type="text" class="form-control input-sm" id="search_input" name="search" placeholder="Search">
                            <div class="input-group-btn">
                                <button id='search_btn' type="submit" class="btn btn-sm btn-primary">
                                    -搜索-
                                </button>
                            </div>
                        </div>
                    </form>
                    </div>

                    <table id="editable" class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th class="text-center">
                                    <input type="checkbox" id="select_all" name="select_all">
                                </th>
                                <th class="text-center">组名</th>
                                <th class="text-center">成员数目</th>
                                <th class="text-center">备注</th>
                                <th class="text-center">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="gradeX" *ngFor="#group of DataStore.grouplist; #i = index">
                                <td class="text-center">
                                    <input class="shiftCheckbox" type="checkbox" name="selected" 
                                    [(ngModel)]="group.select">
                                </td>
                                <td class="text-center" [innerHTML]="group.name"></td>
                                <td class="text-center">
                                    <a [routerLink]="['UserGroup',{'id': group.id}]" [innerHTML]="group.membercount"></a>
                                </td>
                                <td class="text-center" [innerHTML]="group.comment"></td>
                                <td class="text-center">
                                    <a class="btn btn-xs btn-info" (click)="groupEdit(group.id)">编辑</a>
                                    <a class="btn btn-xs btn-danger del" (click)="groupDelete(group.id)">删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="row">
                        <!--div class="col-sm-6">
                            <div class="dataTables_info" id="editable_info" role="status" aria-live="polite">
                                Showing {{ user_groups.start_index }} to {{ user_groups.end_index }} of {{ p.count }} entries
                            </div>
                        </div-->
                       <!-- TODO: paginator-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`,
    providers: [AppService],
    directives: [ROUTER_DIRECTIVES]
})

export class Grouplist {
    data:{};
    // groups:Array<Group>;
    DataStore=DataStore;

    constructor(private http:Http,
                private _router:Router,
                private _logger:Logger,
                private _appService:AppService) {
        DataStore.activenav = {'name': '查看用户组', 'path': [{'href': 'Index', 'name': '仪表盘'},{'href': 'UserGrouplist', 'name': '用户管理'},{'href': 'UserGrouplist', 'name': '查看用户组'}]}

    }

    ngOnInit() {
        this._appService.getGrouplist() //.subscribe(response =>this.groups = response);
        // this._appService.getMyinfoFromServer().subscribe(response => {
        //     this.user = response;
        //     this._logger.log('dashboard.ts:Dashboard,ngOnInit')
        //     this._logger.debug(response)
        //     this._appService.setMyinfo(this.user);
        // });

    }

    ngAfterViewInit() {

        // this.user = this._appService.getMyinfo()
        // this._logger.log('dashboard.ts:Dashboard,ngAfterViewInit');
        // this._logger.log(this._appService.getMyinfo())

    }

    groupEdit(id:number) {
        // TODO: router
    }

    groupDelete(id:number) {

        if (confirm("确定删除")) {
            this._appService.delGroup(id).subscribe(response=> {
                // this.groups. TODO: remove this id from groups
                alert(response)
            })
        }
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
    directives: [LeftbarComponent, NavComponent, NavcatbarComponent, Grouplist]
})
export class GrouplistComponent {

}
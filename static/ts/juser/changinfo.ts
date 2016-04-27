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
import {User, AppService} from '../service';
import {Logger} from "angular2-logger/core";

@Component({
    selector: 'ng-body',
    template: `
<div class="wrapper wrapper-content animated fadeInRight">
        <div class="row">
            <div class="col-sm-10">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>编辑用户信息</h5>
                        <div class="ibox-tools">
                            <a class="collapse-link">
                                <i class="fa fa-chevron-up"></i>
                            </a>

                            <a class="close-link">
                                <i class="fa fa-times"></i>
                            </a>
                        </div>
                    </div>
                    <div class="ibox-content">
                        <form method="post" id="userForm" class="form-horizontal" action="">
                                <div class="alert alert-warning text-center" *ngIf="error" [innerHTML]="error"></div>
                                <div class="alert alert-success text-center" *ngIf="msg" [innerHTML]="msg"></div>
                            <div class="form-group">
                                <div class="col-sm-8">
                                    <input id="user_id" name="user_id" type="text"  [(ngModel)]="user.id" style="display: none">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="name" class="col-sm-2 control-label">姓名<span class="red-fonts">*</span></label>
                                <div class="col-sm-8">
                                    <input id="name" name="name" placeholder="Name" type="text" class="form-control" 
                                    [(ngModel)]="user.name">
                                </div>
                            </div>
                            <div class="hr-line-dashed"></div>
                            <div class="form-group">
                                <label for="password" class="col-sm-2 control-label">密码</label>
                                <div class="col-sm-8">
                                    <input id="password" name="password" placeholder="Password" type="password" class="form-control">
                                    <span class="help-block m-b-none">
                                        登陆web的密码, 不修改请留空
                                    </span>
                                </div>
                            </div>
                            <div class="hr-line-dashed"></div>
                            <div class="form-group">
                                <label for="ssh_key_pwd" class="col-sm-2 control-label">SSH密钥</label>
                                <div class="col-sm-8" style="border: none">
                                    <a id="regen_ssh_key" class="form-control" (click)="keygen(user.id)"> 重新生成</a>
                                    <span class="help-block m-b-none">
                                        重新生成密钥，需要重新下载并导入
                                    </span>
                                </div>
                            </div>
                            <div class="hr-line-dashed"></div>

                            <div class="form-group">
                                <label for="email" class="col-sm-2 control-label">Email<span class="red-fonts">*</span></label>
                                <div class="col-sm-8">
                                    <input id="email" name="email" type="email" placeholder="Email" 
                                    class="form-control" [(ngModel)]="user.email" >
                                </div>
                            </div>

                            <div class="hr-line-dashed"></div>
                            <div class="form-group">
                                <div class="col-sm-4 col-sm-offset-2">
                                    <button class="btn btn-white" type="submit">取消</button>
                                    <button id="submit_button" class="btn btn-primary" type="submit">确认修改</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})

export class ChangeInfo {
    data:{};
    user:User;

    constructor(private http:Http,
                private _router:Router,
                private _logger:Logger,
                private _appService:AppService) {

        this._appService.getMyinfo();
        
    }

    ngOnInit() {
        this.data = {'users': 10, 'hosts': 10, 'online': 19, 'hostonline': 9};

        this.user = this._appService.getMyinfo();
        this._logger.log('dashboard.ts:Dashboard,ngOnInit');
        this._logger.log(this._appService.getMyinfo());

        // this._appService.getMyinfoFromServer().subscribe(response => {
        //     this.user = response;
        //     this._logger.log('dashboard.ts:Dashboard,ngOnInit')
        //     this._logger.debug(response)
        //     this._appService.setMyinfo(this.user);
        // });

    }

    static ngAfterViewInit() {
        jQuery('#userForm').validator({
            timely: 2,
            theme: "yellow_right_effect",
            rules: {
                check_pass: [/^\w+$/, '数字和字符']
            },

            fields: {
                "name": {
                    rule: "required",
                    tip: "姓名",
                    ok: "",
                    msg: {required: "必须填写"}
                },
                "email": {
                    rule: "required",
                    tip: "Email",
                    ok: "",
                    msg: {required: "必须填写"}
                }
            },
            valid: function (form) {
                form.submit();
            }
        });


        // this.user = this._appService.getMyinfo()
        // this._logger.log('dashboard.ts:Dashboard,ngAfterViewInit');
        // this._logger.log(this._appService.getMyinfo())

    }

    keygen(id:number) {
        // jQuery("#regen_ssh_key").click(function () {
        //     layer.alert('申请已提交，请等待，请勿重复提交');
        //     jQuery.get(
        //         jQuery(this).attr('value'),
        //         {},
        //         function (data) {
        //             layer.alert(data)
        //         }
        //     )
        // })
        this._logger.debug(id)
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
    directives: [LeftbarComponent, NavComponent, NavcatbarComponent, ChangeInfo]
})
export class ChangeInfoComponent {

}
/**
 * Created by liuzheng on 4/7/16.
 */

import {Component, ElementRef} from 'angular2/core';
import {NgForm, NgClass}    from 'angular2/common';
import {Http, HTTP_PROVIDERS, Headers, Response} from 'angular2/http';
import {RouteParams, Router} from 'angular2/router';
import  'rxjs/Rx';
declare var jQuery:any;
declare var layer:any;


export class User {
    constructor(public name:string,
                public avatar:string,
                public role:string) {
    }
}
@Component({
    selector: 'ng-left',
    styles: [`.navbar-default.navbar-static-side{overflow: scroll;position: fixed;height: 100%;background-color: #2f4050;} #side-menu{height: 100%;}`],
    template: `<nav class="navbar-default navbar-static-side" role="navigation">
    <div class="sidebar-collapse">
        <ul class="nav" id="side-menu">
            <li class="nav-header">
    <div class="dropdown profile-element">
        <span>
            <img alt="image" class="img-circle" width="48" height="48" src="/imgs/{{user.avatar}}" />
        </span>
        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
            <span class="clear">
                <span class="block m-t-xs">
                    <strong class="font-bold">{{user.name}}
                     <span style="color: #8095a8"></span></strong>
                </span>
                <span class="text-muted text-xs block">
                    {{user.role}} <b class="caret"></b>
                </span>
            </span>
        </a>
        <ul class="dropdown-menu animated fadeInRight m-t-xs">
            <li><a class="iframe_user" (click)="iframeuser()">个人信息</a></li>
            <li><a href="{% url 'user_update' %}">修改信息</a></li>
            <li class="divider"></li>
            <li><a (click)="Logout()">注销</a></li>
        </ul>
    </div>

    <div class="logo-element">
        JS+
    </div>
</li>
            <li id="index">
               <a href="{% url 'index' %}"><i class="fa fa-dashboard"></i> <span class="nav-label">仪表盘</span><span class="label label-info pull-right"></span></a>
            </li>
            <li id="juser" *ngIf="admin">
                <a href="#"><i class="fa fa-group"></i> <span class="nav-label">用户管理</span><span class="fa arrow"></span></a>
                <ul class="nav nav-second-level">
                    <li class="group"><a href="{% url 'user_group_list' %}">查看用户组</a></li>
                    <li class="user"><a href="{% url 'user_list' %}">查看用户<span class="label pull-right 
                    {{ user_active_num==user_total_num ? 'label-warning' : 'label-primary'}}">
                    {{ user_active_num }}/{{ user_total_num }}</span></a></li>
                </ul>
            </li>
            <li id="jasset" [style.display]="admin?'':'none'">
                <a><i class="fa fa-inbox"></i> <span class="nav-label">资产管理</span><span class="fa arrow"></span></a>
                <ul class="nav nav-second-level">
                    <li class="group"><a href="{% url 'asset_group_list' %}">查看资产组</a></li>
                    <li class="asset"> <a href="{% url 'asset_list' %}">查看资产<span class="label label-info pull-right">{{ host_active_num }}/{{ host_total_num}}</span></a></li>
                    <li class="idc"> <a href="{% url 'idc_list' %}">查看机房</a></li>
                </ul>
            </li>
        <li id="uasset" [style.display]="admin?'':'none'">
               <a href="{% url 'asset_list' %}"><i class="fa fa-inbox"></i> <span class="nav-label">查看主机</span><span class="label label-info pull-right"></span></a>
            </li>
            <li id="jperm" [style.display]="admin?'':'none'">
                <a href="#"><i class="fa fa-edit"></i> <span class="nav-label">授权管理</span><span class="fa arrow"></span></a>
                <ul class="nav nav-second-level">
                    <li class="sudo">
                        <a class="sudo" href="{% url 'sudo_list' %}">Sudo</a>
                    </li>
                    <li class="role">
                        <a href="{% url 'role_list' %}">系统用户</a>
                    </li>
                    <li class="rule">
                        <a href="{% url 'rule_list' %}">授权规则</a>
                    </li>
                </ul>
            </li>
            <li id="jlog" [style.display]="admin?'':'none'">
               <a href="{% url 'log_list' 'online' %}"><i class="fa fa-files-o"></i> <span class="nav-label">日志审计</span><span class="label label-info pull-right"></span></a>
            </li>
            <li id="file">
                <a href="#"><i class="fa fa-download"></i> <span class="nav-label">上传下载</span><span class="fa arrow"></span></a>
                <ul class="nav nav-second-level">
                    <li class="upload"><a href="{% url 'file_upload' %}">文件上传</a></li>
                    <li class="download"><a href="{% url 'file_download' %}">文件下载</a></li>
                </ul>
            </li>
            <li id="setting" [style.display]="admin?'':'none'">
                   <a href="{% url 'setting' %}"><i class="fa fa-gears"></i> <span class="nav-label">设置</span><span class="label label-info pull-right"></span></a>
            </li>
            <li class="special_link">
                <a href="http://www.jumpserver.org" target="_blank"><i class="fa fa-database"></i> <span class="nav-label">访问官网</span></a>
            </li>
        </ul>

    </div>
</nav><script type="text/javascript" src="js/foot.min.js"></script>`,
    directives: [NgClass]
})


export class LeftbarComponent {
    user:User;

    constructor(private elementRef:ElementRef) {
    };

    ngOnInit() {
        this.admin = true;
        this.user_active_num = 1;
        this.user_total_num = 3;
        this.host_active_num = 1;
        this.host_total_num = 9;
        this.user = new User('admin', 'root.png', '超级管理员');
    }

    ngAfterViewInit() {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "js/plugins/metisMenu/jquery.metisMenu.js";
        this.elementRef.nativeElement.appendChild(s);
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "js/inspinia.js";
        this.elementRef.nativeElement.appendChild(s);
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "js/base.js";
        this.elementRef.nativeElement.appendChild(s);
    }

    iframeuser() {
        var url = jQuery(".iframe_user").attr("value");
        layer.open({
            type: 2,
            title: '个人信息',
            maxmin: true,
            shift: 'top',
            border: [2, 0.3, '#1AB394'],
            shade: [0.5, '#000000'],
            shadeClose: true,
            area: ['800px', '600px'],
            content: url
        });
    }

    Logout() {
        console.log('user logout')
    }
}
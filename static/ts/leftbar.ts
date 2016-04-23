/**
 * Created by liuzheng on 4/7/16.
 */

import {Component, ElementRef} from 'angular2/core';
import {NgForm, NgClass}    from 'angular2/common';
import {Http, HTTP_PROVIDERS, Headers, Response} from 'angular2/http';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';

import  'rxjs/Rx';
declare var jQuery:any;
declare var layer:any;

import {AppService, User} from './service';


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
            <li id="{{item.id}}"*ngFor="#item of navlist; #i = index">
               <a [routerLink]="[item.href]"><i class="{{item.fa}}"></i> <span class="nav-label" 
               [innerHTML]="item.name"></span><span class="label label-info pull-right"></span>
               <span class="fa arrow" *ngIf="item.children"></span></a>
                <ul class="nav nav-second-level">
                    <li [id]="child.id" class="" *ngFor="#child of item.children; #ii = index"><a [routerLink]="[child.href]" [innerHTML]="child.name"></a></li>
                </ul>
            </li>
 <li class="special_link">
                <a href="http://www.jumpserver.org" target="_blank"><i class="fa fa-database"></i> <span class="nav-label">访问官网</span></a>
            </li>
           
        </ul>
    </div>
</nav>
`,
    directives: [NgClass, ROUTER_DIRECTIVES],
    providers: [AppService]
})


export class LeftbarComponent {
    user:User;

    constructor(
                private _appService:AppService) {
    };

    ngOnInit() {
        this.admin = true;
        this.user_active_num = 1;
        this.user_total_num = 3;
        this.host_active_num = 1;
        this.host_total_num = 9;
        this.navlist = this._appService.getnav();
        this.user  = this._appService.getUser(1);
        this._appService.setUser(this.user)
    }

    ngAfterViewInit() {
        jQuery('#side-menu').metisMenu();
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
            content: '/userprofile/'+this.user.id
        });
    }

    Logout() {
        console.log('user logout')
    }
}
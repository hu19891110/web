/**
 * Created by liuzheng on 4/7/16.
 */

import {Component, ElementRef} from 'angular2/core';
import {NgForm, NgClass}    from 'angular2/common';
import {Http, HTTP_PROVIDERS, Headers, Response} from 'angular2/http';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {Logger} from "angular2-logger/core";
import  'rxjs/Rx';
declare var jQuery:any;
declare var layer:any;

import {AppService, User, Join, DataStore} from './service';


@Component({
    selector: 'ng-left',
    styles: [`.navbar-default.navbar-static-side{overflow: scroll;position: fixed;height: 100%;background-color: #2f4050;} #side-menu{height: 100%;}`],
    template: `<nav class="navbar-default navbar-static-side" role="navigation">
    <div class="sidebar-collapse">
        <ul class="nav" id="side-menu">
            <li class="nav-header">
    <div class="dropdown profile-element">
        <span>
            <img alt="image" class="img-circle" width="48" height="48" [src]="'/imgs/'+DataStore.user.avatar" />
        </span>
        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
            <span class="clear">
                <span class="block m-t-xs">
                    <strong class="font-bold" 
                    [innerHTML]="DataStore.user.name"><span style="color: #8095a8"></span></strong>
                </span>
                <span class="text-muted text-xs block"><span [innerHTML]="DataStore.user.role"></span><b 
                class="caret"></b>
                </span>
            </span>
        </a>
        <ul class="dropdown-menu animated fadeInRight m-t-xs">
            <li><a class="iframe_user" (click)="iframeuser()">个人信息</a></li>
            <li><a href="{{DataStore.user.id}}">修改信息</a></li>
            <li class="divider"></li>
            <li><a (click)="Logout()">注销</a></li>
        </ul>
    </div>

    <div class="logo-element">
        JS+
    </div>
</li>
            <li [id]="item.id" *ngFor="#item of DataStore.nav; #i = index" (click)="active(item.id)">
                <a *ngIf="item.children">
                    <i [class]="item.fa"></i> 
                    <span class="nav-label" [innerHTML]="item.name"></span>
                    <span class="label label-info pull-right"></span>
                    <span class="fa arrow" *ngIf="item.children"></span>
                </a>
                <a [routerLink]="[item.href]" *ngIf="!item.children">
                    <i [class]="item.fa"></i> 
                    <span class="nav-label" [innerHTML]="item.name"></span>
                    <span class="label label-info pull-right"></span>
                </a>
                <ul class="nav nav-second-level collapse">
                    <li [id]="child.id" class="" *ngFor="#child of item.children; #ii = index">
                        <a [routerLink]="[child.href]" [innerHTML]="child.name"></a>
                    </li>
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
    providers: [AppService],
    pipes: [Join]
})


export class LeftbarComponent {
    // user:User = new User;
    DataStore = DataStore;

    constructor(private _logger:Logger,
                private _appService:AppService) {
        // this._appService.getMyinfo();
        this._appService.getnav();
        // this._appService.getMyinfo().subscribe(response => {
        //     this.user = response;
        // });
    };

    ngOnInit() {
        // this.admin = true;
        // this.user_active_num = 1;
        // this.user_total_num = 3;
        // this.host_active_num = 1;
        // this.host_total_num = 9;
        // this.navlist = this._appService.getnav()
        // this._appService.getMyinfoFromServer().subscribe(response => {
        //     this.user = response;
        //     this._logger.log('leftbar.ts:LeftbarComponent,ngOnInit')
        //     this._logger.debug(response)
        //     this._appService.setMyinfo(this.user);
        // });
    }

    active(t:string) {
        jQuery(`#${t}`).siblings().removeClass('active');
        jQuery(`#${t}`).siblings().find('ul').removeClass('in');
        jQuery(`#${t}`).addClass('active');
        jQuery(`#${t} ul`).addClass('in');
    }

    ngAfterViewInit() {
        // jQuery('#side-menu').metisMenu();
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
            content: '/userprofile/' + DataStore.user.id
        });
    }

    Logout() {
        console.log('user logout')
    }
}
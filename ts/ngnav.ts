/**
 * Created by liuzheng on 4/7/16.
 */

import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import {Http, HTTP_PROVIDERS, Headers, Response} from 'angular2/http';
import {RouteParams, Router} from 'angular2/router';
import  'rxjs/Rx';
declare var jQuery:any;



@Component({
    selector: 'ng-nav-bar',
    template: `<nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
    <div class="navbar-header">
        <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
        <form role="search" class="navbar-form-custom" method="get" action="">
            <div class="form-group">
                <input type="text" placeholder="输入搜索..." class="form-control" name="search" id="top-search">
            </div>
        </form>
    </div>
    <ul class="nav navbar-top-links navbar-right">
        <li>
            <span class="m-r-sm text-muted welcome-message">欢迎使用Jumpserver开源跳板机系统</span>
        </li>
        <li class="dropdown">
            <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                 <span class="m-r-sm text-muted welcome-message">帮助</span>
            </a>
        </li>
        <li>
            <a href="{% url 'logout' %}">
                <i class="fa fa-sign-out"></i> Log out
            </a>
        </li>
    </ul>
</nav>`
})


export class NavComponent {

}
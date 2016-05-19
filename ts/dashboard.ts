/**
 * Created by liuzheng on 4/12/16.
 */

import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers, Response} from 'angular2/http';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import  'rxjs/Rx';
declare var jQuery:any;
declare var echarts:any;

import {NavComponent} from './ngnav';
import {LeftbarComponent} from './leftbar';
import {NavcatbarComponent} from './nav_cat_bar';
import {User, AppService} from './service';
import {Logger} from "angular2-logger/core";

@Component({
    selector: 'ng-body',
    template: `
<div class="wrapper wrapper-content">
    <div class="row">
        <div class="col-sm-3">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <span class="label label-success pull-right">Users</span>
                    <h5>用户总数</h5>
                </div>
                <div class="ibox-content">
                    <h1 
                    class="no-margins"><a [routerLink]="['UserList']" [innerHTML]="data.users"></a></h1>
                    <small>All user</small>
                </div>
            </div>
        </div>
        <div class="col-sm-3">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <span class="label label-info pull-right">Hosts</span>
                    <h5>主机总数</h5>
                </div>
                <div class="ibox-content">
                    <h1 
                    class="no-margins"><a [routerLink]="['Assetlist']" [innerHTML]="data.hosts"></a></h1>
                    <small>All host</small>
                </div>
            </div>
        </div>

        <div class="col-sm-3">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <span class="label label-primary pull-right">Online</span>
                    <h5>在线用户</h5>
                </div>
                <div class="ibox-content">
                    <h1 
                    class="no-margins"><a [routerLink]="['Log']"> 
                    <span id="online_users" [innerHTML]="data.online"></span></a></h1>
                    <small>Online user</small>
                </div>
            </div>
        </div>

        <div class="col-sm-3">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <span class="label label-danger pull-right">Connected</span>
                    <h5>已连接服务器</h5>
                </div>
                <div class="ibox-content">
                        <h1 class="no-margins">
                        <a [routerLink]="['Log']"> <span id="online_hosts" [innerHTML]="data.hostonline"></span></a></h1>
                    <small>Connected host</small>
                </div>
            </div>
        </div>
    </div>
    <!--div class="row">
        <div class="col-sm-2 border-bottom white-bg dashboard-header" style="margin-left:15px;height: 346px">
            <h2>活跃用户TOP5</h2>
            <small>过去一周共有<span class="text-info">{{ week_users }}</span>位用户登录<span class="text-success">{{ week_hosts }}</span>次服务器.</small>
            <ul class="list-group clear-list m-t">
                {% for data in user_top_five %}
                    <li class="list-group-item fist-item">
                        <span class="pull-right">
                            {{ data.times }}次/周
                        </span>
                        <span class="label {{ color|random }}">{{ forloop.counter }}</span> {{ data.user }}
                    </li>
                {% endfor %}
            </ul>
        </div>
        <div class="col-sm-7" id="top10" style="margin-left: -15px;height: 346px;padding: 15px 0 15px 0;"></div>
        <div class="col-sm-3 white-bg" id="top1" style="margin-left: -15px;height: 346px">
            <div class="statistic-box">
                <h4>
                    活跃用户资产占比
                </h4>
                <p>
                    以下图形分别描述一个月活跃用户和资产占所有用户主机的百分比
                </p>
                <div class="row text-center">
                    <div class="col-sm-6">
                        <div id="activeUser"  style="width: 140px; height: 140px;">

                        </div>
                        <h5>用户</h5>
                    </div>
                    <div class="col-sm-6">
                        <div id="activeAsset" style="width: 140px; height: 140px;"></div>
                        <h5>主机</h5>
                    </div>
                </div>
                <div class="m-t">
                    <small></small>
                </div>
            </div>
        </div>
    </div>
    <br/>

    <div class="row">
        <div class="col-sm-4">


            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>一周Top10资产</h5>
                    <div class="ibox-tools">
                        <a class="collapse-link">
                            <i class="fa fa-chevron-up"></i>
                        </a>
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i class="fa fa-wrench"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-user"></ul>
                        <a class="close-link">
                            <i class="fa fa-times"></i>
                        </a>
                    </div>
                </div>
                <div class="ibox-content ibox-heading">
                    <h3><i class="fa fa-inbox"></i> 一周Top10资产 </h3>
                    <small><i class="fa fa-map-marker"></i> 登录次数及最近一次登录记录. </small>
                </div>
                <div class="ibox-content inspinia-timeline">
                    {% if host_top_ten %}
                        {% for data in host_top_ten %}
                            <div class="timeline-item">
                                <div class="row">
                                    <div class="col-xs-5 date">
                                        <i class="fa fa-info-circle"></i>
                                        <strong>{{ data.host }}</strong>
                                        <br/>
                                        <small class="text-navy">{{ data.times }}次</small>
                                    </div>
                                    <div class="col-xs-7 content no-top-border">
                                        <p class="m-b-xs">最近一次登录用户</p>
                                        <p>{{ data.last.user }}</p>
                                        <p>于{{ data.last.start_time |date:"Y-m-d H:i:s" }}</p>
                                    </div>
                                </div>
                            </div>
                        {% endfor %}
                    {% else %}
                        <p class="text-center">(暂无)</p>
                    {% endif %}
                </div>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>最近十次登录</h5>
                    <div class="ibox-tools">
                        <span class="label label-info-light">10 Messages</span>
                       </div>
                </div>
                <div class="ibox-content ibox-heading">
                    <h3><i class="fa fa-paper-plane-o"></i> 登录记录 </h3>
                    <small><i class="fa fa-map-marker"></i> 最近十次登录记录. </small>
                </div>
                <div class="ibox-content">
                    <div>
                        <div class="feed-activity-list">
                            {% if login_10 %}
                                {% for login in login_10 %}
                                    <div class="feed-element">
                                        <a href="#" class="pull-left">
                                            <img alt="image" class="img-circle" src="/static/img/root.png">
                                        </a>
                                        <div class="media-body ">
                                            {% ifequal login.is_finished 0 %}
                                                <small class="pull-right text-navy">{{ login.start_time|naturaltime }}</small>
                                            {% else %}
                                                <small class="pull-right">{{ login.start_time|naturaltime }}</small>
                                            {% endifequal %}
                                            <strong>{{ login.user }}</strong> 登录了{{ login.host }} <br>
                                            <small class="text-muted">{{ login.start_time }}</small>

                                        </div>
                                    </div>
                                {% endfor %}

                                <button id="show" class="btn btn-primary btn-block m-t"><i class="fa fa-arrow-down"></i> 更多 </button>
                                <div id='more' style="display: none">
                                    <br/>
                                    <div class="feed-activity-list">
                                        {% for login in login_more_10 %}
                                            <div class="feed-element">
                                                <a href="#" class="pull-left">
                                                    <img alt="image" class="img-circle" src="/static/img/root.png">
                                                </a>
                                                <div class="media-body ">
                                                    {% ifequal login.is_finished 0 %}
                                                        <small class="pull-right text-navy">{{ login.start_time|naturaltime }}</small>
                                                    {% else %}
                                                        <small class="pull-right">{{ login.start_time|naturaltime }}</small>
                                                    {% endifequal %}
                                                    <strong>{{ login.user }}</strong> 登录了{{ login.host }} <br>
                                                    <small class="text-muted">{{ login.start_time }}</small>

                                                </div>
                                            </div>
                                        {% endfor %}
                                    </div>
                                </div>
                            {% else %}
                                <p class="text-center">(暂无)</p>
                            {% endif %}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-4">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>一周Top10用户</h5>
                    <div class="ibox-tools">
                        <a class="collapse-link">
                            <i class="fa fa-chevron-up"></i>
                        </a>
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i class="fa fa-wrench"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-user"></ul>
                        <a class="close-link">
                            <i class="fa fa-times"></i>
                        </a>
                    </div>
                </div>
                <div class="ibox-content ibox-heading">
                    <h3><i class="fa fa-user"></i> 一周Top10用户 </h3>
                    <small><i class="fa fa-map-marker"></i> 用户登录次数及最近一次登录记录. </small>
                </div>
                <div class="ibox-content inspinia-timeline">
                    {% if user_top_ten %}
                        {% for data in user_top_ten %}
                            <div class="timeline-item">
                                <div class="row">
                                    <div class="col-xs-5 date">
                                        <i class="fa fa-info-circle"></i>
                                        <strong>{{ data.user }}</strong>
                                        <br/>
                                        <small class="text-navy">{{ data.times }}次</small>
                                    </div>
                                    <div class="col-xs-7 content no-top-border">
                                        <p class="m-b-xs">最近一次登录主机</p>
                                        <p>{{ data.last.host }}</p>
                                        <p>于{{ data.last.start_time |date:"Y-m-d H:i:s" }}</p>
                                    </div>
                                </div>
                            </div>
                        {% endfor %}
                    {% else %}
                        <p class="text-center">(暂无)</p>
                    {% endif %}
                </div>
            </div>
        </div>
</div-->`,
    directives: [ROUTER_DIRECTIVES]
})

export class Dashboard {
    data:{};
    user:User;

    constructor(private http:Http,
                private _router:Router,
                private _logger:Logger,
                private _appService:AppService) {
        // this._appService.getMyinfoFromServer().subscribe(response => {
        //     this.user = response;
        //     this._logger.log('dashboard.ts:Dashboard,constructor')
        //     this._logger.debug(response)
        //     this._appService.setMyinfo(this.user);
        // });
    }

    ngOnInit() {
        this._logger.log('dashboard.ts:Dashboard,ngOnInit');
        this._appService.getMyinfo();
        this.data = {'users': 10, 'hosts': 10, 'online': 19, 'hostonline': 9};

        // this._appService.getMyinfoFromServer().subscribe(response => {
        //     this.user = response;
        //     this._logger.log('dashboard.ts:Dashboard,ngOnInit')
        //     this._logger.debug(response)
        //     this._appService.setMyinfo(this.user);
        // });

        // this.top10Chart = echarts.init(document.getElementById('top10'));
        // var option = {
        //     title: {
        //         text: '月数据总览',
        //         subtext: '一个月内历史汇总',
        //         x: 'center'
        //     },
        //     tooltip: {
        //         trigger: 'axis'
        //     },
        //     backgroundColor: '#fff',
        //     legend: {
        //         data: ['登陆次数', '活跃用户', '活跃资产'],
        //         y: 'bottom'
        //     },
        //     toolbox: {
        //         show: false,
        //         feature: {
        //
        //
        //             magicType: {show: true, type: ['line', 'bar']}
        //         }
        //     },
        //     calculable: true,
        //     xAxis: [
        //         {
        //             type: 'category',
        //             boundaryGap: false,
        //             data: ['03-08', '03-09', '03-10', '03-11', '03-12', '03-13', '03-14', '03-15', '03-16', '03-17', '03-18', '03-19', '03-20', '03-21', '03-22', '03-23', '03-24', '03-25', '03-26', '03-27', '03-28', '03-29', '03-30', '03-31', '04-01', '04-02', '04-03', '04-04', '04-05', '04-06']
        //         }
        //     ],
        //     yAxis: [
        //         {
        //             type: 'value'
        //         }
        //     ],
        //     series: [
        //         {
        //             name: '登陆次数',
        //             type: 'line',
        //             smooth: true,
        //             itemStyle: {normal: {areaStyle: {type: 'default'}}},
        //             data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2, 13, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
        //         },
        //         {
        //             name: '活跃用户',
        //             type: 'line',
        //             smooth: true,
        //             itemStyle: {normal: {areaStyle: {type: 'default'}}},
        //             data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
        //         },
        //         {
        //             name: '活跃资产',
        //             type: 'line',
        //             smooth: true,
        //             itemStyle: {normal: {areaStyle: {type: 'default'}}},
        //             data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
        //         }
        //
        //     ]
        // };
        // this.top10Chart.setOption(option, true);
        // while(jQuery('#top10').width()==0)
        // this.top10Chart.setOption(option,true);
    }

    ngAfterViewInit() {
        // this.user = this._appService.getMyinfo()
        // this._logger.log('dashboard.ts:Dashboard,ngAfterViewInit');
        // this._logger.log(this._appService.getMyinfo())

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
    directives: [LeftbarComponent, NavComponent, NavcatbarComponent, Dashboard]
})
export class DashboardComponent {

}
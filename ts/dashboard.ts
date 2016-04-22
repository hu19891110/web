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

@Component({
    selector: 'ng-body',
    template: `<div class="" id="top10" style="width:800px;height: 346px;"></div><div 
id="liuzheng"><h1>sadfasdca</h1><p>asdcas</p></div>`,
    directives: [ROUTER_DIRECTIVES]
})

export class Dashboard {
    constructor(private http:Http,
                private _router:Router) {
    }

    ngOnInit() {
        this.top10Chart = echarts.init(document.getElementById('top10'));
        var option = {
            title: {
                text: '月数据总览',
                subtext: '一个月内历史汇总',
                x: 'center'
            },
            tooltip: {
                trigger: 'axis'
            },
            backgroundColor: '#fff',
            legend: {
                data: ['登陆次数', '活跃用户', '活跃资产'],
                y: 'bottom'
            },
            toolbox: {
                show: false,
                feature: {


                    magicType: {show: true, type: ['line', 'bar']}
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['03-08', '03-09', '03-10', '03-11', '03-12', '03-13', '03-14', '03-15', '03-16', '03-17', '03-18', '03-19', '03-20', '03-21', '03-22', '03-23', '03-24', '03-25', '03-26', '03-27', '03-28', '03-29', '03-30', '03-31', '04-01', '04-02', '04-03', '04-04', '04-05', '04-06']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '登陆次数',
                    type: 'line',
                    smooth: true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2, 13, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
                },
                {
                    name: '活跃用户',
                    type: 'line',
                    smooth: true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
                },
                {
                    name: '活跃资产',
                    type: 'line',
                    smooth: true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
                }

            ]
        };
        this.top10Chart.setOption(option, true);
        // while(jQuery('#top10').width()==0)
        // this.top10Chart.setOption(option,true);
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
    directives: [LeftbarComponent, NavComponent,NavcatbarComponent, Dashboard]
})
export class DashboardComponent {
    
}
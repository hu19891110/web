/**
 * Created by liuzheng on 4/24/16.
 */
import {Injectable}         from 'angular2/core';
import {Pipe} from 'angular2/core';
import {Http, HTTP_PROVIDERS}   from 'angular2/http';
import {ROUTER_PROVIDERS, RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import  'rxjs/Rx';
import {Logger} from "angular2-logger/core";

import {DynamicRouteConfigurator} from './dynamicRouteConfigurator'

export class User {
    id:number = 0;
    name:string = '';
    username:string = '';
    password:string = '';
    avatar:string = 'root.png';
    role:string = '';
    email:string = '';
    is_active:boolean = false;
    date_joined:string = '';
    last_login:string = '';
    groups:Array<string> = [''];
}


@Injectable()
export class AppService {
    nav:Array;
    user:User;
    private _dataObserver:Observer<User>;
    private _dataStore:{
        user:User
    };

    constructor(private http:Http,
                private _router:Router,
                private _logger:Logger) {
        this._dataStore = {user: new User};
        // 0.- Level.OFF
        // 1.- Level.ERROR
        // 2.- Level.WARN
        // 3.- Level.INFO
        // 4.- Level.DEBUG
        // 5.- Level.LOG
        this._logger.level = 5;
        // this._logger.debug('Your debug stuff');
        // this._logger.info('An info');
        // this._logger.warn('Take care ');
        // this._logger.error('Too late !');
        // this._logger.log('log !');
    }

    // loglevel() {
    //     return this._logger.level
    // }

    getnav() {
        this.nav = [
            {'id': 'index', 'href': 'Index', 'name': '仪表盘', 'fa': 'fa fa-dashboard', 'children': null},
            {
                'id': 'juser', 'href': 'Index', 'name': '用户管理', 'fa': 'fa fa-group', 'children': [
                {'id': 'usergroup', 'href': 'Index', 'name': '查看用户组'},
                {'id': 'useruser', 'href': 'Index', 'name': '查看用户'},
            ]
            },
            {
                'id': 'jasset', 'href': 'Index', 'name': '资产管理', 'fa': 'fa fa-inbox', 'children': [
                {'id': 'jassetgroup', 'href': 'Index', 'name': '查看资产组'},
                {'id': 'jassetjasset', 'href': 'Index', 'name': '查看资产'},
                {'id': 'jassetcenter', 'href': 'Index', 'name': '查看机房'},
            ]
            },
            {
                'id': 'jperm', 'href': 'Index', 'name': '授权管理', 'fa': 'fa fa-edit', 'children': [
                {'id': 'sudo', 'href': 'Index', 'name': 'Sudo'},
                {'id': 'sysusers', 'href': 'Index', 'name': '系统用户'},
                {'id': 'rules', 'href': 'Index', 'name': '授权规则'},
            ]
            },
            {'id': 'jlog', 'href': 'Index', 'name': '日志审计', 'fa': 'fa fa-files-o', 'children': null},
            {
                'id': 'file', 'href': 'Index', 'name': '上传下载', 'fa': 'fa fa-download', 'children': [
                {'id': 'upload', 'href': 'Index', 'name': '文件上传'},
                {'id': 'download', 'href': 'Index', 'name': '文件下载'},
                {'id': 'setting', 'href': 'Index', 'name': '设置', 'fa': 'fa fa-gears', 'children': []},
            ]
            },
        ];
        return this.nav
    }

    setMyinfo(user:User) {
        // Update data store
        this._dataStore.user = user;
        this._logger.log("service.ts:AppService,setMyinfo");
        this._logger.debug(user)
// Push the new list of todos into the Observable stream
//         this._dataObserver.next(user);
        // this.myinfo$ = new Observable(observer => this._dataObserver = observer).share()
    }

    getMyinfo() {
        return this._dataStore.user
    }

    getMyinfoFromServer() {
        return this.http.get('/api/userprofile')
            .map(res => res.json())
    }

    getUser(id:number) {
        return this.http.get('/api/userprofile')
            .map(res => res.json())
    }

    getGrouplist() {
        return this.http.get('/api/grouplist')
            .map(res => res.json())
    }

    delGroup(id) {

    }
}


@Pipe({
    name: 'join'
})
export class Join {
    transform(value, args?) {
        if (typeof value === 'undefined')
            return 'undefined';
        return value.join(args)
    }
}



/**
 * Created by liuzheng on 4/24/16.
 */
import {Injectable}         from 'angular2/core';
import {Pipe} from 'angular2/core';
import {Http, HTTP_PROVIDERS}   from 'angular2/http';
import {ROUTER_PROVIDERS, RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
// import {Observable} from 'rxjs/Observable';
// import {Observer} from 'rxjs/Observer';
import {Cookie} from 'ng2-cookies/ng2-cookies';
// import {CookieService} from 'angular2-cookie/core'
import {Logger} from "angular2-logger/core";
// import {DynamicRouteConfigurator} from './dynamicRouteConfigurator'
import 'rxjs/add/operator/share';
import  'rxjs/Rx';
declare var jQuery:any;

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
export class Group {
    id:number;
    name:string;
    membercount:number;
    comment:string
}

export var DataStore:{
    user:User,
    nav:Array<any>,
    logined:boolean,
    lastNavigationAttempt:string,
    route:Array<{}>,
    activenav:{},
    Path:{},
    error:{},
    msg:{},
    grouplist:Array<any>
} = {
    user: new User,
    nav: [],
    logined: false,
    lastNavigationAttempt: '',
    route: [{}],
    activenav: {},
    Path: {},
    error: {},
    msg: {},
    grouplist:[]
};

@Injectable()
export class AppService {
    // user:User = user  ;

    constructor(private http:Http,
                private _router:Router,
                private _logger:Logger) {
        if (Cookie.getCookie('loglevel')) {

            // 0.- Level.OFF
            // 1.- Level.ERROR
            // 2.- Level.WARN
            // 3.- Level.INFO
            // 4.- Level.DEBUG
            // 5.- Level.LOG
            this._logger.level = parseInt(Cookie.getCookie('loglevel'));
            // this._logger.debug('Your debug stuff');
            // this._logger.info('An info');
            // this._logger.warn('Take care ');
            // this._logger.error('Too late !');
            // this._logger.log('log !');
        } else {
            Cookie.setCookie('loglevel', '0', 99, '/');
            // this._logger.level = parseInt(Cookie.getCookie('loglevel'));
            this._logger.level = 0
        }
    }


    genPath(path:string) {
        this._logger.log('service.ts:AppService,genPath');

        DataStore.lastNavigationAttempt = path;
        if (DataStore.lastNavigationAttempt === '' || DataStore.lastNavigationAttempt === '/login')
            DataStore.lastNavigationAttempt = '/';
        DataStore.route.forEach(function (value) {
                if (DataStore.lastNavigationAttempt.match(RegExp(value['regex']))) {
                    DataStore.Path = value;
                    var route = DataStore.lastNavigationAttempt.match(RegExp(DataStore.Path['regex']));
                    var key = DataStore.Path['path'].match(RegExp(DataStore.Path['regex']));
                    DataStore.Path['res'] = {};
                    key.map((v, k) => {
                        if (typeof k === 'number' && k > 0)
                            DataStore.Path['res'][v] = route[k]
                    });
                }
            }
        );
    }

    checklogin(path:string) {
        this._logger.log('service.ts:AppService,checklogin');

        this.genPath(path);
        if (DataStore.Path)
            if (DataStore.Path['name'] == 'FOF' || DataStore.Path['name'] == 'Forgot')
                jQuery('angular2').show();
            else {
                if (DataStore.logined) {
                    this._router.navigate([DataStore.Path['name']]);
                    jQuery('angular2').show();
                } else {
                    this.http.get('/api/checklogin')
                        .map(res => res.json())
                        .subscribe(
                            data => {
                                DataStore.logined = data.logined;
                            },
                            err => {
                                this._logger.error(err);
                                DataStore.logined = false;
                                this._router.navigate(['Login'])
                            },
                            ()=> {
                                if (DataStore.logined) {
                                    this._logger.info(DataStore.Path);
                                    this._router.navigate([DataStore.Path['name'], DataStore.Path['res']]);
                                }
                                else
                                    this._router.navigate(['Login']);
                                jQuery('angular2').show();
                            }
                        )
                }
            }
        else {
            this._router.navigate(['FOF']);
            jQuery('angular2').show();
        }
    }

    login(user:User) {
        this._logger.log('service.ts:AppService,login');
        DataStore.error['login'] = '';
        if (user.username.length > 0 && user.password.length > 6 && user.password.length < 100)
            this.http.post('/api/checklogin', JSON.stringify(user)).map(res=>res.json())
                .subscribe(
                    data => {
                        DataStore.logined = data.logined;
                    },
                    err => {
                        this._logger.error(err);
                        DataStore.logined = false;
                        this._router.navigate(['Login']);
                        DataStore.error['login'] = '后端错误,请重试';
                    },
                    ()=> {
                        if (DataStore.logined)
                            this._router.navigate([DataStore.Path['name'], DataStore.Path['res']]);
                        else {
                            DataStore.error['login'] = '请检查用户名和密码';
                            this._router.navigate(['Login']);
                        }
                        jQuery('angular2').show();

                    });
        else
            DataStore.error['login'] = '请检查用户名和密码';

    }

    getnav() {
        this._logger.log('service.ts:AppService,getnav');
        return this.http.get('/api/nav')
            .map(res => res.json())
            .subscribe(response => {
                DataStore.nav = response;
            });
    }

//     setMyinfo(user:User) {
//         // Update data store
//         this._dataStore.user = user;
//         this._logger.log("service.ts:AppService,setMyinfo");
//         this._logger.debug(user);
// // Push the new list of todos into the Observable stream
// //         this._dataObserver.next(user);
//         // this.myinfo$ = new Observable(observer => this._dataObserver = observer).share()
//     }

    getMyinfo() {
        this._logger.log('service.ts:AppService,getMyinfo');
        return this.http.get('/api/userprofile')
            .map(res => res.json())
            .subscribe(response => {
                DataStore.user = response;
                // this._logger.warn(this._dataStore.user);
                // this._logger.warn(DataStore.user)
            });
    }

    getUser(id:string) {
        this._logger.log('service.ts:AppService,getUser');
        return this.http.get('/api/userprofile')
            .map(res => res.json())
    }

    gettest() {
        this._logger.log('service.ts:AppService,gettest');
        this.http.get('/api/userprofile')
            .map(res => res.json())
            .subscribe(res=> {
                return res
            })
    }

    getGrouplist() {
        this._logger.log('service.ts:AppService,getGrouplist');
        return this.http.get('/api/grouplist')
            .map(res => res.json())
            .subscribe(response =>{
                DataStore.grouplist = response
            })
    }

    getUserlist(id:string) {
        this._logger.log('service.ts:AppService,getUserlist');
        if (id)
            return this.http.get('/api/userlist/' + id)
                .map(res => res.json());
        else
            return this.http.get('/api/userlist')
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


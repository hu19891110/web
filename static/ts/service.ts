/**
 * Created by liuzheng on 4/24/16.
 */
import {Injectable}         from 'angular2/core';
import {Pipe} from 'angular2/core';
import {Http, HTTP_PROVIDERS}   from 'angular2/http';
import {ROUTER_PROVIDERS, RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
// import {Observable} from 'rxjs/Observable';
// import {Observer} from 'rxjs/Observer';
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

export var DataStore:{
    user:User,
    nav:Array<any>,
    logined:boolean,
    lastNavigationAttempt:string,
    route:Array<{}>,
    activenav:{}
} = {
    user: new User,
    nav: [],
    logined: false,
    lastNavigationAttempt: '',
    route: [{}],
    activenav:{}
};


@Injectable()
export class AppService {
    // user:User = user  ;

    constructor(private http:Http,
                private _router:Router,
                private _logger:Logger) {
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


    checklogin(path:string) {
        var Path;
        if (path === '')path = '/';
        DataStore.route.forEach(function (value) {
                if (path.match(RegExp(value['regex'])))
                    Path = value
            }
        );
        if (Path)
            if (Path['name'] == 'FOF' || Path['name'] == 'Forgot')
                jQuery('angular2').show();
            else {
                if (DataStore.logined) {
                    this._router.navigate([Path['name']]);
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
                                this._logger.error('login failed')
                            },
                            ()=> {
                                if (DataStore.logined) {
                                    // jQuery('body').addClass('logined');
                                    if (Path['name'] == 'Login')
                                        this._router.navigate(['Index']);
                                    else
                                        this._router.navigate([Path['name']]);

                                } else
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

    getnav() {
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
        return this.http.get('/api/userprofile')
            .map(res => res.json())
            .subscribe(response => {
                DataStore.user = response;
                // this._logger.warn(this._dataStore.user);
                // this._logger.warn(DataStore.user)
            });
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


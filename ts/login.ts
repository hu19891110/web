/**
 * Created by liuzheng on 4/7/16.
 */

import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import {Http, HTTP_PROVIDERS, Headers, Response} from 'angular2/http';
import {RouteParams, Router,ROUTER_DIRECTIVES} from 'angular2/router';
import  'rxjs/Rx';
declare var jQuery:any;
import {User} from './service'


@Component({
    selector: 'div',
    template: `
<div class="middle-box text-center loginscreen  animated fadeInDown">
            <div>
                <h1 class="logo-name"><img src="/imgs/logo.png"></h1>
            </div>
                <div class="alert alert-danger text-center" *ngIf="error">{{ error }}</div>
            <h2>Welcome to JumpServer</h2>
            <form class="m-t" role="form" method="post" action="">
                <div class="form-group">
                    <input type="text" name="username" class="form-control" placeholder="Username" 
                    required="length[6~50]" [(ngModel)]="username">
                </div>
                <div class="form-group">
                    <input type="password" name="password" class="form-control" placeholder="Password" required=""
                     [(ngModel)]="password">
                </div>
                <button type="submit" class="btn btn-primary block full-width m-b" (click)="clickeLogin()">Login
                </button>

                <a [routerLink]="['Forgot']"><small>Forgot password? </small></a>
            </form>
            <p class="m-t"> <small><b>Copyright</b> Jumpserver.org Organization © 2014-2015</small> </p>
    </div>`,
    directives: [ROUTER_DIRECTIVES]
})


export class LoginComponent {
    // constructor(http:Http) {
    //     this.http = http;
    // }
    username:string;
    password:string;
    error:string;
    model:User;
    
    constructor(private http:Http,
                private _router:Router) {
    }

    ngOnInit() {
        // this.model = new User();
    }

    clickeLogin() {
        this.error = 'ss';
        console.log(this.username)
        console.log(this.password)
    }
    // onSubmit() {
    //     var csrftoken = jQuery('meta[name=csrf-token]').attr('content');
    //     var authHeader:Headers = new Headers();
    //     authHeader.append('Content-Type', 'application/x-www-form-urlencoded');
    //     if (csrftoken) {
    //         authHeader.append('X-CSRFToken', csrftoken);
    //     }
    //
    //     this.http.post('/a', JSON.stringify(this.model), {
    //             headers: authHeader
    //         })
    //         .map(res => res.json())
    //         .subscribe(
    //             data => this.data = data,
    //             err => this.logError(err),
    //             () => {
    //                 if(this.data.logined){
    //                     jQuery('body').addClass('logined');
    //                     this._router.parent.navigate(['Terminal']);
    //                 }else{
    //                     // this.error = this.data.errormsg
    //                     this.error = 'got hello';
    //                 }
    //             }
    //         );
    // }
}


//bootstrap(LoginComponent, [ HTTP_PROVIDERS ]);
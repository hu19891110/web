/**
 * Created by liuzheng on 4/7/16.
 */

import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import {Http, HTTP_PROVIDERS, Headers, Response} from 'angular2/http';
import {RouteParams, Router} from 'angular2/router';
import  'rxjs/Rx';
declare var jQuery:any;


export class User {
    constructor(public name:string,
                public pwd:string) {
    }
}

@Component({
    selector: 'div',
    template: `<div class="lock-word animated fadeInDown">
        <span class="first-word">Jumpserver</span>
    </div>
    <div class="middle-box text-center lockscreen animated fadeInDown">
        <div>
            <div class="m-b-md">
                <div class="alert alert-warning text-center"  *ngIf="error">{{ error }}</div>
                <div class="alert alert-success text-center" *ngIf="msg">{{ msg }}</div>
            </div>
            <h3>忘记密码</h3>
            <p>请输入您原来的信息</p>
            <form class="m-t" role="form" action="" method="post">
                <div class="form-group">
                    <input type="text" name='username' class="form-control" placeholder="Username" required="" [(ngModel)]="username">
                </div>
                <div class="form-group">
                    <input type="text" name='name' class="form-control" placeholder="Name" required="" 
                     [(ngModel)]="name">
                </div>
                <div class="form-group">
                    <input type="text" name='email' class="form-control" placeholder="Email" required="" [(ngModel)]="email">
                </div>
                <button type="submit" class="btn btn-primary block full-width" (click)="submit()">确定</button>
            </form>
        </div>
    </div>`,
})


export class ForgotComponent {
    // constructor(http:Http) {
    //     this.http = http;
    // }
    username:string;
    password:string;
    error:string;

    constructor(private http:Http,
                private _router:Router) {
    }

    ngOnInit() {
        this.model = new User('', '');
    }

    submit() {
        this.error = 'ss';
        console.log(this.username)
        console.log(this.name)
        console.log(this.email)
    }
}


//bootstrap(LoginComponent, [ HTTP_PROVIDERS ]);
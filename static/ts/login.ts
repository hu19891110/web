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
    template: `<div class="ui middle aligned center aligned grid" style="height:100%;">
    <div class="column" style="max-width: 450px;">
        <h2 class="ui teal image header">
            <img src="/static/imgs/logo.png" class="image">

            <div class="content">
                Welcome to JumpServer
            </div>
        </h2>
        <div class="ui icon error message" style="padding:0" [style.display]="error?'flex':'none'">
            <i class="attention icon" style="margin: 3px 12px 3px 12px;"></i>

            <div>
                {{ error }}
            </div>
        </div>
        <form class="ui large form" role="form" (ngSubmit)="onSubmit()">
            <div class="ui stacked segment">
                <div class="field">
                    <div class="ui left icon input">
                        <i class="user icon"></i>
                        <input type="text" name="name" placeholder="Username" required="length[6~50]"
                               [(ngModel)]="model.name" #name="ngForm">
                    </div>
                </div>
                <div class="field">
                    <div class="ui left icon input">
                        <i class="lock icon"></i>
                        <input type="password" name="password" placeholder="Password" required=""
                               [(ngModel)]="model.pwd" #pwd="ngForm">
                    </div>
                </div>
                <button type="submit" class="ui fluid large teal submit button">Login</button>
            </div>

            <div class="ui error message"></div>

        </form>

        <div class="ui message">
            <a href="/juser/password/forget/">
                Forgot password?
            </a>
        </div>
    </div>
</div>`,
})


export class LoginComponent {
    // constructor(http:Http) {
    //     this.http = http;
    // }
    constructor(private http:Http,
                private _router:Router) {
    }

    ngOnInit() {
        this.model = new User('', '');
    }

    onSubmit() {
        var csrftoken = jQuery('meta[name=csrf-token]').attr('content');
        var authHeader:Headers = new Headers();
        authHeader.append('Content-Type', 'application/x-www-form-urlencoded');
        if (csrftoken) {
            authHeader.append('X-CSRFToken', csrftoken);
        }

        this.http.post('/a', JSON.stringify(this.model), {
                headers: authHeader
            })
            .map(res => res.json())
            .subscribe(
                data => this.data = data,
                err => this.logError(err),
                () => {
                    if(this.data.logined){
                        jQuery('body').addClass('logined');
                        this._router.parent.navigate(['Terminal']);
                    }else{
                        // this.error = this.data.errormsg
                        this.error = 'got hello';
                    }
                }
            );
    }
}


//bootstrap(LoginComponent, [ HTTP_PROVIDERS ]);
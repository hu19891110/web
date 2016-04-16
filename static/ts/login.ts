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
    template: `
<div class="login-box">
  <div class="login-logo">
    <a href="../../index2.html"><b>Admin</b>LTE</a>
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
    <p class="login-box-msg">Sign in to start your session</p>

    <form action="../../index2.html" method="post">
      <div class="form-group has-feedback">
        <input type="email" class="form-control" placeholder="Email">
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password" class="form-control" placeholder="Password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
        <div class="col-xs-8">
          <div class="checkbox icheck">
            <label>
              <input type="checkbox"> Remember Me
            </label>
          </div>
        </div>
        <!-- /.col -->
        <div class="col-xs-4">
          <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
        </div>
        <!-- /.col -->
      </div>
    </form>

    <div class="social-auth-links text-center">
      <p>- OR -</p>
      <a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign in using
        Facebook</a>
      <a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign in using
        Google+</a>
    </div>
    <!-- /.social-auth-links -->

    <a href="#">I forgot my password</a><br>
    <a href="register.html" class="text-center">Register a new membership</a>

  </div>
  <!-- /.login-box-body -->
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
        jQuery('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%' // optional
        });
        this.model = new User('', '');
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
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
    template: `<div class="error-page">
    <h2 class="headline text-yellow"> 404</h2>

    <div class="error-content">
        <h3><i class="fa fa-warning text-yellow"></i> Oops! Page not found.</h3>
        <p>
            We could not find the page you were looking for.
            Meanwhile, you may <a href="../../index.html">return to dashboard</a> or try using the search form.
        </p>
        <form class="search-form">
            <div class="input-group">
                <input type="text" name="search" class="form-control" placeholder="Search">

                <div class="input-group-btn">
                    <button type="submit" name="submit" class="btn btn-warning btn-flat"><i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
            <!-- /.input-group -->
        </form>
    </div>
    <!-- /.error-content -->
</div>`
})


export class FOFComponent {
}
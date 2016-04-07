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
    templateUrl: "/static/login.html",
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
                data => this.secretQuote = data,
                err => this.logError(err),
                () => console.log('POST:')
            );
        this.error = 'got hello';
        this._router.parent.navigate(['Terminal']);

    }
}


//bootstrap(LoginComponent, [ HTTP_PROVIDERS ]);
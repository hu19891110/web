import {bootstrap}    from 'angular2/platform/browser';
import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import {Http, HTTP_PROVIDERS, Headers,Response} from 'angular2/http';
import  'rxjs/Rx';
declare var jQuery:any;


export class User {
    constructor(public name:string,
                public pwd:string) {
    }
}

@Component({
    selector: 'angular2',
    templateUrl: "/static/login.html",
})


export class LoginComponent {
    constructor(http:Http) {
        this.http = http;
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
    }
}


bootstrap(LoginComponent, [ HTTP_PROVIDERS ]);
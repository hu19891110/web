import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import {Http, Headers,Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import { Hero }    from './hero';
declare var jQuery:any;
@Component({
    selector: 'hero-form',
    templateUrl: 'static/hero-form.component.html'
})
export class HeroFormComponent {
    constructor(http:Http) {
        this.http = http;
    }

    powers = ['Really Smart', 'Super Flexible',
        'Super Hot', 'Weather Changer'];
    model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
    submitted = false;

    onSubmit() {
        this.submitted = true;
    }

    ngOnInit() {
        this.getStart();
    }

    getStart() {
        var csrftoken = jQuery('meta[name=csrf-token]').attr('content');
        var authHeader:Headers = new Headers();
        authHeader.append('Content-Type', 'application/x-www-form-urlencoded');
        if (csrftoken) {
            console.log(csrftoken);
            authHeader.append('X-CSRFToken', csrftoken);
        }

        //this.http.get('/a')
        //    .map((res:Response) => res.json())
        //    .subscribe(
        //        data => {
        //        this.foods = data
        //    },
        //        err => console.error(err),
        //    () => console.log('done')
        //);
        Observable.forkJoin(
            this.http.get('/a',{headers:authHeader}).map((res:Response) => res.json()),
            this.http.get('/a',{headers:authHeader}).map((res:Response) => res.json())
        ).subscribe(
                data => {
                this.books = data[0];
                this.movies = data[1];
            },
                err => console.error(err)
        );
        //this.http.get('/a', {
        //    headers: authHeader
        //})
        //    .map((res:Response) => res.json())
        //    .subscribe(
        //        data => this.secretQuote = data,
        //        err => this.logError(err),
        //    () => console.log('Secret Quote Complete')
        //);
    }

    // Reset the form with a new hero AND restore 'pristine' class state
    // by toggling 'active' flag which causes the form
    // to be removed/re-added in a tick via NgIf
    // TODO: Workaround until NgForm has a reset method (#6822)
    active = true;

    newHero() {
        this.model = new Hero(42, '', '');
        this.active = false;
        setTimeout(()=> this.active = true, 0);


        var csrftoken = jQuery('meta[name=csrf-token]').attr('content');
        var authHeader:Headers = new Headers();
        authHeader.append('Content-Type', 'application/x-www-form-urlencoded');
        if (csrftoken) {
            console.log(csrftoken);
            authHeader.append('X-CSRFToken', csrftoken);
        }


        this.http.get('/a', {
            headers: authHeader
        })
            .map((res:Response) => res.json())
            .subscribe(
                data => this.secretQuote = data,
                err => this.logError(err),
            () => console.log('Secret Quote Complete')
        );

        //this.http.post('/a', JSON.stringify({"id": 1}), {
        //    headers: authHeader
        //})
        //    .map(res => res.json())
        //    .subscribe(
        //        data => this.secretQuote = data,
        //        err => this.logError(err),
        //    () => console.log('POST:')
        //);
    }
}

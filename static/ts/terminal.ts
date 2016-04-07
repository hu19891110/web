import {bootstrap}    from 'angular2/platform/browser';
import {Component} from 'angular2/core';
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {Http, HTTP_PROVIDERS, Headers,Response} from 'angular2/http';
import  'rxjs/Rx';
declare var jQuery:any;

//https://github.com/afrad/angular2-websocket.git
@Component({
    templateUrl: "/static/webterminal.html",
})


export class TermComponent {
    constructor(http:Http) {
        this.http = http;
    }

    ngOnInit() {
        if (window.location.protocol == 'https:') {
            var protocol = 'wss://';
        } else {
            var protocol = 'ws://';
        }
        var endpoint = protocol + document.URL.match(RegExp('//(.*?)/'))[1] + '/ws/terminal' + document.URL.match(/(\?.*)/);
        //this.ws = new $WebSocket(endpoint);
        var ws = new $WebSocket('ws://localhost:5000/ws');
        var rowHeight, colWidth;
        try {
            rowHeight = localStorage.getItem('term-row');
            colWidth = localStorage.getItem('term-col');
        } catch (err) {
            rowHeight = 35;
            colWidth = 100
        }
        if (rowHeight) {
        } else {
            rowHeight = 35
        }
        if (colWidth) {
        } else {
            colWidth = 100
        }
        var term = new Terminal({
            rows: rowHeight,
            cols: colWidth,
            useStyle: true,
            screenKeys: true
        });
        jQuery('#term').innerHTML='';
        term.open(document.getElementById('term'));
        term.on('data', function (data) {
            ws.send('R'+data)
        });
        ws.onMessage(function (e) {
            term.write(e.data)
        })

    }
}


//bootstrap(TermComponent, [HTTP_PROVIDERS]);
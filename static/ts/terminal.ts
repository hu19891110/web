/**
 * Created by liuzheng on 4/7/16.
 */

import {bootstrap}    from 'angular2/platform/browser';
import {Component} from 'angular2/core';
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {Http, HTTP_PROVIDERS, Headers,Response} from 'angular2/http';
import  'rxjs/Rx';
declare var jQuery:any;

//https://github.com/afrad/angular2-websocket.git
@Component({
    template: `<style>
        body {
            padding-bottom: 40px;
        }

        .terminal {
            border: #000 solid 5px;
            font-family: "Monaco", "Microsoft Yahei", "DejaVu Sans Mono", "Liberation Mono", monospace;
            font-size: 11px;
            color: #f0f0f0;
            background: #000;
            box-shadow: rgba(0, 0, 0, 0.8) 2px 2px 20px;
            white-space: nowrap;
            display: inline-block;
        }

        .reverse-video {
            color: #000;
            background: #f0f0f0;
        }

        .termChangBar {
            line-height: 1;
            margin: 0 auto;
            border: 1px solid #ffffff;
            color: #fff;
            background-color: #ffffff;
            position: fixed;
            right: 0;
            top: 0;
        }
    </style>
<div class="container">
    <div id="term">
    </div>
</div>
`,
})


export class TermComponent {
    constructor(private http:Http) {
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
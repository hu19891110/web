#!/usr/bin/env python3
#  coding: utf-8
# Copyright (c) 2016
# Gmail:liuzheng712

import os
import configparser as ConfigParser
from flask import Flask, abort, redirect, make_response, render_template, request, jsonify
from flask_assets import Bundle, Environment
from flask_wtf.csrf import CsrfProtect
from flask.ext.uwsgi_websocket import GeventWebSocket

bundles = {
    'base_js': Bundle(
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/systemjs/dist/system-polyfills.js',
        'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
        'node_modules/angular2/bundles/angular2-polyfills.min.js',

        'node_modules/systemjs/dist/system.js',
        'node_modules/typescript/lib/typescript.js',
        'node_modules/rxjs/bundles/Rx.min.js',
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/router.dev.js',
        'node_modules/angular2/bundles/http.dev.js',
        # 'node_modules/angular2-websocket/angular2-websocket.js',

        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/admin-lte/plugins/jQueryUI/jquery-ui.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/raphael/raphael.min.js',
        'node_modules/admin-lte/plugins/morris/morris.min.js',
        'node_modules/admin-lte/plugins/sparkline/jquery.sparkline.min.js',
        'node_modules/admin-lte/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js',
        'node_modules/admin-lte/plugins/jvectormap/jquery-jvectormap-world-mill-en.js',
        'node_modules/admin-lte/plugins/knob/jquery.knob.js',
        'node_modules/moment/min/moment.min.js',
        'node_modules/admin-lte/plugins/daterangepicker/daterangepicker.js',
        'node_modules/admin-lte/plugins/datepicker/bootstrap-datepicker.js',
        'node_modules/admin-lte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js',
        'node_modules/admin-lte/plugins/slimScroll/jquery.slimscroll.min.js',
        'node_modules/admin-lte/dist/js/app.min.js',
        'node_modules/admin-lte/dist/js/pages/dashboard.js',
        'node_modules/admin-lte/plugins/iCheck/icheck.min.js',
        # 'node_modules/semantic-ui/dist/semantic.min.js',
        'js/term.js',
        'node_modules/echarts/dist/echarts.min.js',
        output='js/base.min.js',
        filters='jsmin'
    ),
    'bash_css': Bundle(
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        # 'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
        'node_modules/font-awesome/css/font-awesome.min.css',
        'node_modules/ionicons/dist/css/ionicons.min.css',
        # 'node_modules/semantic-ui/dist/semantic.min.css',
        'node_modules/admin-lte/dist/css/AdminLTE.css',
        'node_modules/admin-lte/dist/css/skins/_all-skins.min.css',
        'node_modules/admin-lte/plugins/iCheck/flat/blue.css',
        'node_modules/admin-lte/plugins/morris/morris.css',
        'node_modules/admin-lte/plugins/jvectormap/jquery-jvectormap-1.2.2.css',
        'node_modules/admin-lte/plugins/datepicker/datepicker3.css',
        'node_modules/admin-lte/plugins/daterangepicker/daterangepicker-bs3.css',
        'node_modules/admin-lte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.css',
        # 'css/styles.css',
        output='css/base.min.css',
        filters='cssmin'
    ),
}
# config = ConfigParser.ConfigParser()
#
# BASE_DIR = os.path.abspath(os.path.dirname(__file__))
# config.read(os.path.join(BASE_DIR, 'jumpserver.conf'))
# KEY_DIR = os.path.join(BASE_DIR, 'keys')
# HOST = config.get('base', 'host')

app = Flask(__name__)
CsrfProtect(app)
assets = Environment(app)
assets.register(bundles)

app.secret_key = 'sdfaschuiejgyhujgyuhhtyuhgt8uhg67uhr678uhg'
websocket = GeventWebSocket(app)


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


# def staticfile(filename):
#     return '/static/css/' + filename


@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500


@websocket.route('/ws')
def WebSocketHandle(ws):
    while True:
        msg = ws.receive()
        ws.send(msg)


@app.route('/<hello>')
def hello_world(hello=None):
    return render_template('index.html')
    # return 'Hello World!', 400


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/a', methods=['GET', 'POST'])
def a():
    if request.method == 'POST':
        print('post')
    else:
        print('get')
    return jsonify({'a': 'a'})


@app.route('/checklogin', methods=['GET'])
def checklogin():
    return jsonify({'logined': True})


@app.route('/aaa', methods=['GET'])
def aaa():
    return '123'


if __name__ == '__main__':
    # app.run(debug=True)
    app.run(gevent=100)

import os
import configparser as ConfigParser
from flask import Flask, abort, redirect, make_response, render_template, request, jsonify
from flask_assets import Bundle, Environment
from flask_wtf.csrf import CsrfProtect

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
        # 'node_modules/bootstrap/dist/js/bootstrap.min.js',

        'node_modules/semantic-ui/dist/semantic.min.js',
        'js/term.js',
        output='js/base.min.js',
        filters='jsmin'
    ),
    'bash_css': Bundle(
        # 'node_modules/bootstrap/dist/css/bootstrap.min.css',
        # 'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
        'node_modules/font-awesome/css/font-awesome.min.css',
        'node_modules/semantic-ui/dist/semantic.css',

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


# @app.errorhandler(404)
# def page_not_found(e):
#     return render_template('404.html'), 404
#
#
# def staticfile(filename):
#     return '/static/css/' + filename
#
#
# @app.errorhandler(500)
# def internal_server_error(e):
#     return render_template('500.html'), 500
#
@app.route('/')
def hello_world():
    return render_template('index.html')
    # return 'Hello World!', 400


@app.route('/a', methods=['GET', 'POST'])
def a():
    if request.method == 'POST':
        print('post')
    else:
        print('get')
    return jsonify({'a': 'a'})


if __name__ == '__main__':
    app.run(debug=True)

/**
 * Created by liuzheng on 4/7/16.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
require('rxjs/Rx');
var dashboard_1 = require('../dashboard');
var ngnav_1 = require('../ngnav');
var leftbar_1 = require('../leftbar');
var nav_cat_bar_1 = require('../nav_cat_bar');
var Userlist = (function () {
    function Userlist() {
    }
    Userlist = __decorate([
        core_1.Component({
            selector: 'ng-body',
            template: "<body-dash></body-dash>",
            directives: [dashboard_1.DashboardComponent]
        })
    ], Userlist);
    return Userlist;
}());
exports.Userlist = Userlist;
var UserlistComponent = (function () {
    function UserlistComponent() {
    }
    UserlistComponent = __decorate([
        core_1.Component({
            selector: 'div',
            template: "<ng-left></ng-left><div id=\"page-wrapper\" class=\"gray-bg\">\n        <div class=\"row border-bottom\">\n            <ng-nav-bar></ng-nav-bar>\n        </div>\n        <ng-nav-cat-bar ></ng-nav-cat-bar>\n        <ng-body></ng-body>\n        <div class=\"footer fixed\">\n            <div class=\"pull-right\">\n                Version <strong>0.3.1</strong> GPL.\n            </div>\n            <div>\n                <strong>Copyright</strong> Jumpserver.org Team &copy; 2014-2015\n            </div>\n        </div>\n    </div>",
            directives: [leftbar_1.LeftbarComponent, ngnav_1.NavComponent, nav_cat_bar_1.NavcatbarComponent, Userlist]
        })
    ], UserlistComponent);
    return UserlistComponent;
}());
exports.UserlistComponent = UserlistComponent;
//# sourceMappingURL=userlist.js.map
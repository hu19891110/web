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
var service_1 = require('../service');
var UserProfileComponent = (function () {
    function UserProfileComponent(_routeParams, _appService, _logger) {
        this._routeParams = _routeParams;
        this._appService = _appService;
        this._logger = _logger;
        this.user = new service_1.User;
    }
    ;
    UserProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('id');
        this._appService.getUser(1)
            .subscribe(function (response) {
            _this.user = response;
        });
        this._logger.log('appService.getUser');
        this._logger.debug(this.user);
    };
    UserProfileComponent = __decorate([
        core_1.Component({
            selector: 'angular2',
            template: "<div class=\"row\">\n            <div class=\"contact-box\">\n                <h2 class=\"text-center\" [innerHTML]=\"user.name\"></h2>\n                <div class=\"ibox-content\">\n\n                    <table class=\"table table-striped table-bordered table-hover \" id=\"editable\" >\n                        <thead>\n                            <tr>\n                                <td class=\"text-center\" width=\"120\">ID</td>\n                                <td class=\"text-center\">\u7528\u6237\u540D</td>\n                                <td class=\"text-center\">\u59D3\u540D</td>\n                                <td class=\"text-center\">\u5173\u8054\u7528\u6237</td>\n                                <td class=\"text-center\">Email</td>\n                                <td class=\"text-center\">\u6FC0\u6D3B</td>\n                            </tr>\n                        </thead>\n                        <tbody>\n                        \n                        <tr class=\"gradeX\">\n                            <td class=\"text-center\" [innerHTML]=\"user.id\"></td>\n                            <td class=\"text-center\" [innerHTML]=\"user.username\"></td>\n                            <td class=\"text-center\" [innerHTML]=\"user.name\"></td>\n                            <td class=\"text-center\" [innerHTML]=\"user.role\"></td>\n                            <td class=\"text-center\" [innerHTML]=\"user.email\"></td>\n                            <td class=\"text-center\" [innerHTML]=\"user.is_active\"></td>\n                        </tr>\n                        <tr>\n                            <td class=\"text-center\">\u6DFB\u52A0\u65E5\u671F\uFF1A </td>\n                            <td colspan=\"2\" class=\"text-center\" [innerHTML]=\"user.date_joined\"></td>\n                            <td class=\"text-center\">\u6700\u540E\u767B\u5F55\uFF1A </td>\n                            <td colspan=\"3\" class=\"text-center\" [innerHTML]=\"user.last_login\"></td>\n                        </tr>\n                        <tr>\n                            <td colspan=\"1\" class=\"text-center\">\u7528\u6237\u7EC4\uFF1A</td>\n                            <td colspan=\"6\" class=\"text-center\">\n                                    <b [innerHTML]=\"user.groups|join:', '\"></b>\n                            </td>\n                        </tr>\n                        \n                    </table>\n            </div>\n        </div>",
            providers: [service_1.AppService],
            pipes: [service_1.Join]
        })
    ], UserProfileComponent);
    return UserProfileComponent;
}());
exports.UserProfileComponent = UserProfileComponent;
//# sourceMappingURL=userprofile.js.map
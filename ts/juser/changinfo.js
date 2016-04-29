/**
 * Created by liuzheng on 4/12/16.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
require('rxjs/Rx');
var ngnav_1 = require('../ngnav');
var leftbar_1 = require('../leftbar');
var nav_cat_bar_1 = require('../nav_cat_bar');
var ChangeInfo = (function () {
    function ChangeInfo(http, _router, _logger, _appService) {
        this.http = http;
        this._router = _router;
        this._logger = _logger;
        this._appService = _appService;
        this._appService.getMyinfo();
    }
    ChangeInfo.prototype.ngOnInit = function () {
        this.data = { 'users': 10, 'hosts': 10, 'online': 19, 'hostonline': 9 };
        this.user = this._appService.getMyinfo();
        this._logger.log('dashboard.ts:Dashboard,ngOnInit');
        this._logger.log(this._appService.getMyinfo());
        // this._appService.getMyinfoFromServer().subscribe(response => {
        //     this.user = response;
        //     this._logger.log('dashboard.ts:Dashboard,ngOnInit')
        //     this._logger.debug(response)
        //     this._appService.setMyinfo(this.user);
        // });
    };
    ChangeInfo.ngAfterViewInit = function () {
        jQuery('#userForm').validator({
            timely: 2,
            theme: "yellow_right_effect",
            rules: {
                check_pass: [/^\w+$/, '数字和字符']
            },
            fields: {
                "name": {
                    rule: "required",
                    tip: "姓名",
                    ok: "",
                    msg: { required: "必须填写" }
                },
                "email": {
                    rule: "required",
                    tip: "Email",
                    ok: "",
                    msg: { required: "必须填写" }
                }
            },
            valid: function (form) {
                form.submit();
            }
        });
        // this.user = this._appService.getMyinfo()
        // this._logger.log('dashboard.ts:Dashboard,ngAfterViewInit');
        // this._logger.log(this._appService.getMyinfo())
    };
    ChangeInfo.prototype.keygen = function (id) {
        // jQuery("#regen_ssh_key").click(function () {
        //     layer.alert('申请已提交，请等待，请勿重复提交');
        //     jQuery.get(
        //         jQuery(this).attr('value'),
        //         {},
        //         function (data) {
        //             layer.alert(data)
        //         }
        //     )
        // })
        this._logger.debug(id);
    };
    ChangeInfo = __decorate([
        core_1.Component({
            selector: 'ng-body',
            template: "\n<div class=\"wrapper wrapper-content animated fadeInRight\">\n        <div class=\"row\">\n            <div class=\"col-sm-10\">\n                <div class=\"ibox float-e-margins\">\n                    <div class=\"ibox-title\">\n                        <h5>\u7F16\u8F91\u7528\u6237\u4FE1\u606F</h5>\n                        <div class=\"ibox-tools\">\n                            <a class=\"collapse-link\">\n                                <i class=\"fa fa-chevron-up\"></i>\n                            </a>\n\n                            <a class=\"close-link\">\n                                <i class=\"fa fa-times\"></i>\n                            </a>\n                        </div>\n                    </div>\n                    <div class=\"ibox-content\">\n                        <form method=\"post\" id=\"userForm\" class=\"form-horizontal\" action=\"\">\n                                <div class=\"alert alert-warning text-center\" *ngIf=\"error\" [innerHTML]=\"error\"></div>\n                                <div class=\"alert alert-success text-center\" *ngIf=\"msg\" [innerHTML]=\"msg\"></div>\n                            <div class=\"form-group\">\n                                <div class=\"col-sm-8\">\n                                    <input id=\"user_id\" name=\"user_id\" type=\"text\"  [(ngModel)]=\"user.id\" style=\"display: none\">\n                                </div>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"name\" class=\"col-sm-2 control-label\">\u59D3\u540D<span class=\"red-fonts\">*</span></label>\n                                <div class=\"col-sm-8\">\n                                    <input id=\"name\" name=\"name\" placeholder=\"Name\" type=\"text\" class=\"form-control\" \n                                    [(ngModel)]=\"user.name\">\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label for=\"password\" class=\"col-sm-2 control-label\">\u5BC6\u7801</label>\n                                <div class=\"col-sm-8\">\n                                    <input id=\"password\" name=\"password\" placeholder=\"Password\" type=\"password\" class=\"form-control\">\n                                    <span class=\"help-block m-b-none\">\n                                        \u767B\u9646web\u7684\u5BC6\u7801, \u4E0D\u4FEE\u6539\u8BF7\u7559\u7A7A\n                                    </span>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <label for=\"ssh_key_pwd\" class=\"col-sm-2 control-label\">SSH\u5BC6\u94A5</label>\n                                <div class=\"col-sm-8\" style=\"border: none\">\n                                    <a id=\"regen_ssh_key\" class=\"form-control\" (click)=\"keygen(user.id)\"> \u91CD\u65B0\u751F\u6210</a>\n                                    <span class=\"help-block m-b-none\">\n                                        \u91CD\u65B0\u751F\u6210\u5BC6\u94A5\uFF0C\u9700\u8981\u91CD\u65B0\u4E0B\u8F7D\u5E76\u5BFC\u5165\n                                    </span>\n                                </div>\n                            </div>\n                            <div class=\"hr-line-dashed\"></div>\n\n                            <div class=\"form-group\">\n                                <label for=\"email\" class=\"col-sm-2 control-label\">Email<span class=\"red-fonts\">*</span></label>\n                                <div class=\"col-sm-8\">\n                                    <input id=\"email\" name=\"email\" type=\"email\" placeholder=\"Email\" \n                                    class=\"form-control\" [(ngModel)]=\"user.email\" >\n                                </div>\n                            </div>\n\n                            <div class=\"hr-line-dashed\"></div>\n                            <div class=\"form-group\">\n                                <div class=\"col-sm-4 col-sm-offset-2\">\n                                    <button class=\"btn btn-white\" type=\"submit\">\u53D6\u6D88</button>\n                                    <button id=\"submit_button\" class=\"btn btn-primary\" type=\"submit\">\u786E\u8BA4\u4FEE\u6539</button>\n                                </div>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    ",
            directives: [router_1.ROUTER_DIRECTIVES]
        })
    ], ChangeInfo);
    return ChangeInfo;
}());
exports.ChangeInfo = ChangeInfo;
var ChangeInfoComponent = (function () {
    function ChangeInfoComponent() {
    }
    ChangeInfoComponent = __decorate([
        core_1.Component({
            selector: 'div',
            template: "<ng-left></ng-left><div id=\"page-wrapper\" class=\"gray-bg\">\n        <div class=\"row border-bottom\">\n            <ng-nav-bar></ng-nav-bar>\n        </div>\n        <ng-nav-cat-bar ></ng-nav-cat-bar>\n        <ng-body></ng-body>\n        <div class=\"footer fixed\">\n            <div class=\"pull-right\">\n                Version <strong>0.3.1</strong> GPL.\n            </div>\n            <div>\n                <strong>Copyright</strong> Jumpserver.org Team &copy; 2014-2015\n            </div>\n        </div>\n    </div>",
            directives: [leftbar_1.LeftbarComponent, ngnav_1.NavComponent, nav_cat_bar_1.NavcatbarComponent, ChangeInfo]
        })
    ], ChangeInfoComponent);
    return ChangeInfoComponent;
}());
exports.ChangeInfoComponent = ChangeInfoComponent;
//# sourceMappingURL=changinfo.js.map
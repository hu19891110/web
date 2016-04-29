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
var Grouplist = (function () {
    function Grouplist(http, _router, _logger, _appService) {
        var _this = this;
        this.http = http;
        this._router = _router;
        this._logger = _logger;
        this._appService = _appService;
        this._appService.getGrouplist().subscribe(function (response) {
            _this.groups = response;
            _this._logger.log('grouplist.ts:Grouplist,constructor');
            _this._logger.debug(response);
        });
    }
    Grouplist.prototype.ngOnInit = function () {
        // this._appService.getMyinfoFromServer().subscribe(response => {
        //     this.user = response;
        //     this._logger.log('dashboard.ts:Dashboard,ngOnInit')
        //     this._logger.debug(response)
        //     this._appService.setMyinfo(this.user);
        // });
    };
    Grouplist.prototype.ngAfterViewInit = function () {
        // this.user = this._appService.getMyinfo()
        // this._logger.log('dashboard.ts:Dashboard,ngAfterViewInit');
        // this._logger.log(this._appService.getMyinfo())
    };
    Grouplist.prototype.groupEdit = function (id) {
        // TODO: router
    };
    Grouplist.prototype.groupDelete = function (id) {
        if (confirm("确定删除")) {
            this._appService.delGroup(id).subscribe(function (response) {
                // this.groups. TODO: remove this id from groups
                alert(response);
            });
        }
    };
    Grouplist = __decorate([
        core_1.Component({
            selector: 'ng-body',
            template: "<div class=\"wrapper wrapper-content animated fadeInRight\">\n    <div class=\"row\">\n        <div class=\"col-sm-10\">\n            <div class=\"ibox float-e-margins\">\n\n                <div class=\"ibox-title\">\n                    <h5> \u67E5\u770B\u7528\u6237\u7EC4</h5>\n                    <div class=\"ibox-tools\">\n                        <a class=\"collapse-link\">\n                            <i class=\"fa fa-chevron-up\"></i>\n                        </a>\n                        <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\n                            <i class=\"fa fa-wrench\"></i>\n                        </a>\n                        <a class=\"close-link\">\n                            <i class=\"fa fa-times\"></i>\n                        </a>\n                    </div>\n                </div>\n\n                <div class=\"ibox-content\">\n                    <div class=\"\">\n                    <a href=\"{% url 'user_group_add' %}\" class=\"btn btn-sm btn-primary \"> \u6DFB\u52A0\u7528\u6237\u7EC4 </a>\n                    <a id=\"del_btn\" class=\"btn btn-sm btn-danger \"> \u5220\u9664\u6240\u9009 </a>\n                    <form id=\"search_form\" method=\"get\" action=\"\" class=\"pull-right mail-search\">\n                        <div class=\"input-group\">\n                            <input type=\"text\" class=\"form-control input-sm\" id=\"search_input\" name=\"search\" placeholder=\"Search\">\n                            <div class=\"input-group-btn\">\n                                <button id='search_btn' type=\"submit\" class=\"btn btn-sm btn-primary\">\n                                    -\u641C\u7D22-\n                                </button>\n                            </div>\n                        </div>\n                    </form>\n                    </div>\n\n                    <table id=\"editable\" class=\"table table-striped table-bordered table-hover\">\n                        <thead>\n                            <tr>\n                                <th class=\"text-center\">\n                                    <input type=\"checkbox\" id=\"select_all\" name=\"select_all\">\n                                </th>\n                                <th class=\"text-center\">\u7EC4\u540D</th>\n                                <th class=\"text-center\">\u6210\u5458\u6570\u76EE</th>\n                                <th class=\"text-center\">\u5907\u6CE8</th>\n                                <th class=\"text-center\">\u64CD\u4F5C</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr class=\"gradeX\" *ngFor=\"group in grouplist\">\n                                <td class=\"text-center\">\n                                    <input class=\"shiftCheckbox\" type=\"checkbox\"  name=\"selected\" [(ngModel)]=\"group.id\">\n                                </td>\n                                <td class=\"text-center\" [(ngModel)]=\"group.name\"></td>\n                                <td class=\"text-center\">\n                                    <a href=\"{% url 'user_list' %}?gid={{ group.id }}\" [(ngModel)]=\"group.membercount\"></a>\n                                </td>\n                                <td class=\"text-center\" [(ngModel)]=\"group.comment\"></td>\n                                <td class=\"text-center\">\n                                    <a class=\"btn btn-xs btn-info\" (click)=\"groupEdit(group.id)\">\u7F16\u8F91</a>\n                                    <a class=\"btn btn-xs btn-danger del\" (click)=\"groupDelete(group.id)\">\u5220\u9664</a>\n                                </td>\n                            </tr>\n                        </tbody>\n                    </table>\n                    <div class=\"row\">\n                        <!--div class=\"col-sm-6\">\n                            <div class=\"dataTables_info\" id=\"editable_info\" role=\"status\" aria-live=\"polite\">\n                                Showing {{ user_groups.start_index }} to {{ user_groups.end_index }} of {{ p.count }} entries\n                            </div>\n                        </div-->\n                       <!-- TODO: paginator-->\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n    ",
            directives: [router_1.ROUTER_DIRECTIVES]
        })
    ], Grouplist);
    return Grouplist;
}());
exports.Grouplist = Grouplist;
var GrouplistComponent = (function () {
    function GrouplistComponent() {
    }
    GrouplistComponent = __decorate([
        core_1.Component({
            selector: 'div',
            template: "<ng-left></ng-left><div id=\"page-wrapper\" class=\"gray-bg\">\n        <div class=\"row border-bottom\">\n            <ng-nav-bar></ng-nav-bar>\n        </div>\n        <ng-nav-cat-bar ></ng-nav-cat-bar>\n        <ng-body></ng-body>\n        <div class=\"footer fixed\">\n            <div class=\"pull-right\">\n                Version <strong>0.3.1</strong> GPL.\n            </div>\n            <div>\n                <strong>Copyright</strong> Jumpserver.org Team &copy; 2014-2015\n            </div>\n        </div>\n    </div>",
            directives: [leftbar_1.LeftbarComponent, ngnav_1.NavComponent, nav_cat_bar_1.NavcatbarComponent, Grouplist]
        })
    ], GrouplistComponent);
    return GrouplistComponent;
}());
exports.GrouplistComponent = GrouplistComponent;
//# sourceMappingURL=grouplist.js.map
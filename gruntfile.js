module.exports = function (grunt) {
    //配置参数
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';',
                stripBanners: true
            },
            dist: {
                src: [
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
                    'node_modules/admin-lte/plugins/iCheck/icheck.min.js',
                    'js/term.js',
                    'node_modules/echarts/dist/echarts.min.js'
                ],
                dest: "js/base.js"
            }
        },
        uglify: {
            options: {},
            dist: {
                files: {
                    'js/base.min.js': 'js/base.js'
                }
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            compress: {
                files: {
                    'css/base.min.css': [
                        'node_modules/bootstrap/dist/css/bootstrap.min.css',
                        'node_modules/font-awesome/css/font-awesome.min.css',
                        'node_modules/ionicons/dist/css/ionicons.min.css',
                        'node_modules/admin-lte/dist/css/AdminLTE.css',
                        'node_modules/admin-lte/dist/css/skins/_all-skins.min.css',
                        'node_modules/admin-lte/plugins/iCheck/flat/blue.css',
                        'node_modules/admin-lte/plugins/morris/morris.css',
                        'node_modules/admin-lte/plugins/jvectormap/jquery-jvectormap-1.2.2.css',
                        'node_modules/admin-lte/plugins/datepicker/datepicker3.css',
                        'node_modules/admin-lte/plugins/daterangepicker/daterangepicker-bs3.css',
                        'node_modules/admin-lte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.css'
                    ]
                }
            }
        }
    });

    //载入concat和uglify插件，分别对于合并和压缩
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    //注册任务
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
}
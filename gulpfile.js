var gulp = require('gulp');
var run = require('gulp-run');
var livereload = require('gulp-livereload'); // 网页自动刷新（服务器控制客户端同步刷新）
var exec = require('child_process').exec;

// 注册任务
gulp.task('stopserver', function () {
  return run('forever stopall').exec();
});
gulp.task('server', function () {
  return run('forever start ./mock-server/index.js').exec();
});
gulp.task('reserver', function () {
  return run('forever restartall').exec();
});

// 监听任务
gulp.task('watch', function () {
  //gulp.watch( '*.html', ['html']) // 监听根目录下所有.html文件
  gulp.watch('mock-server/**/*.js', ['reserver', 'reload']);
});


gulp.task('reload', function () {
  gulp.src('').pipe(livereload());
})

// 默认任务
gulp.task('default', ['stopserver', 'server', 'watch']);
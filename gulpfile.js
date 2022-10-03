let gulp = require('gulp'),
    webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    gulp.src('src')
        .pipe(webserver({
            fallback: 'login.html',
            port: 8000,
            livereload: true,
            open: true
        }))
});

gulp.task('dev', function(){
    gulp.watch('src/css/**/*.css');
    gulp.watch('src/js/**/*.js');
    gulp.watch('src/**/*.html');
})

gulp.task('default', gulp.series('webserver', 'dev'));



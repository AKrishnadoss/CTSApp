/// <binding AfterBuild='default' />
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('minify', function () {
    return gulp.src("wwwroot/scripts/*.js")
        .pipe(uglify())
        .pipe(concat("ctsapp.min.js"))
        .pipe(gulp.dest("wwwroot/clientapp/dist"))
});

gulp.task('default',  ["minify"]);
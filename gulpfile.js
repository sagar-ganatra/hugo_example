var gulp = require('gulp'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    hash = require('gulp-hash'),
    minify = require('gulp-minify');

gulp.task('clean:css:src', function () {
  return gulp.src('static/css/pages/**/*.css')
             .pipe(clean());
});

gulp.task('css:src', ['clean:css:src'], function () {
  return gulp.src('src/styles/pages/**/index.scss')
             .pipe(sass({
               outputStyle: 'compressed'
             }))
             .on('error', function (error) {
               console.log(error.toString());
               this.emit('end');
             })
             .pipe(gulp.dest('static/css/pages'));
});

gulp.task('clean:css:vendor', function () {
  return gulp.src('static/css/vendor/**/*.css')
             .pipe(clean());
});

gulp.task('css:vendor', ['clean:css:vendor'], function () {
  return gulp.src('src/styles/vendor/index.scss')
             .pipe(sass({
               outputStyle: 'compressed'
             }))
             .on('error', function (error) {
               console.log(error.toString());
               this.emit('end');
             })
             .pipe(concat('vendor.css'))
             .pipe(gulp.dest('static/css/vendor'));
});

gulp.task('clean:js:vendor', function () {
  return gulp.src('static/js/vendor/*.js')
             .pipe(clean());
});

gulp.task('compress:vendor', ['clean:js:vendor'], function () {
  return gulp.src('src/js/vendor/*.js')
             .pipe(concat('vendor.js'))
             .pipe(minify({
                  ext: {
                   src: '_debug.js',
                   min: '.js'
                 }
             }))
             .pipe(gulp.dest('static/js/vendor'));
});

gulp.task('clean:js:pages', function () {
  return gulp.src('static/js/pages/*.js')
             .pipe(clean());
});

gulp.task('compress:pages', ['clean:js:pages'], function () {
  return gulp.src('src/js/pages/*.js')
             .pipe(minify({
                  ext: {
                   src: '_debug.js',
                   min: '.js'
                 }
             }))
             .pipe(gulp.dest('static/js/pages'));
});

gulp.task('hash:js', function () {
  return gulp.src('static/js/**/*.js')
             .pipe(hash({
               template: '<%= name %>_<%= hash %><%= ext %>'
             }))
             .pipe(gulp.dest('static/js'))
             .pipe(hash.manifest('assets_js.json'))
             .pipe(gulp.dest('data/code_assets/'));
});

gulp.task('hash:css', ['css:src', 'css:vendor'], function () {
  return gulp.src('static/css/**/*.css')
             .pipe(hash({
               template: '<%= name %>_<%= hash %><%= ext %>'
             }))
             .pipe(gulp.dest('static/css'))
             .pipe(hash.manifest('assets_css.json'))
             .pipe(gulp.dest('data/code_assets/'));
});

gulp.task('watch', function () {
  gulp.watch(['src/styles/**/*.scss'], ['hash:css']);
  gulp.watch(['src/js/**/*.js'], ['compress:src', 'compress:vendor', 'hash:js']);
});

// gulp.task('default', ['css', 'copyJSFiles', 'js']);

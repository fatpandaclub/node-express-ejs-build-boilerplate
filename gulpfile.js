var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');

gulp.task('sass', function () {
  return new Promise(function(resolve, reject) {
      gulp.src('./src/scss/style.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(sourcemaps.init())
          .pipe(autoprefixer())
          .pipe(cleanCSS({compatibility: 'ie8'}))
          .pipe(gulp.dest('./dist/css'))
          .pipe(livereload());
          resolve();
  });
});

gulp.task('js', function () {
  return new Promise(function(resolve, reject) {
      gulp.src('./src/js/**/*.js')
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(babel({
          presets: [
            ['@babel/env', {
              modules: false
            }]
          ]
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(livereload());
        resolve();
  });
});


gulp.task('build-deps', function () {
  const files = [
    'node_modules/jquery/dist/jquery.min.js',
  ]
  return new Promise(function(resolve, reject) {
    gulp.src(files)
      .pipe(plumber())
      .pipe(gulp.dest('./dist/js/libs'))
      resolve();
  });
}); 

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('./src/js/**/*.js', gulp.series('js'));
});

gulp.task('default', gulp.parallel('sass', 'js', 'build-deps'));
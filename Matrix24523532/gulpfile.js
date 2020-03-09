'use strict'
// Require gulp
const gulp = require('gulp');
// Require gulp-babel
const babel = require('gulp-babel');

const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');
const streamqueue = require("streamqueue");


// gulp.src("./src/*.js")   // отключение 'use strict'
//     .pipe(removeUseStrict())
//     .pipe(gulp.dest("./dist"));

//------< собираем js файли с кодом матрицы в один файл >----------
gulp.task('scripts', function() {
    return streamqueue({ objectMode: true },
        gulp.src("app/build_js/addFunctions.js"),
        gulp.src("app/build_js/model.js"),
        gulp.src("app/build_js/view.js"),
        gulp.src("app/build_js/controller.js"),
        gulp.src("app/build_js/main.js")
    )
        .pipe(concat('script_min.js'))
        .pipe(uglify()) // сжимаем файл
        .pipe(gulp.dest('app/js'))
});




gulp.task('sass', () => {
  return gulp.src('app/sass/**/*.+(sass|scss)')
      .pipe(sass())
      .pipe(gulp.dest('app/css'))
      .pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', ['browserSync','sass','es6','scripts'], () => {
  gulp.watch('app/sass/**/*.+(sass|scss)', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  gulp.watch('app/src_es6/**/*.js', ['es6']);
  gulp.watch('app/build_js/**/*.js', ['scripts']);//изменения в js, собраным с es6
});

gulp.task('browserSync', () => {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

// Create an es6 task
gulp.task('es6', () => {
	// Return gulp.src with the src set to our src folder
	// we return here do that we indicate to gulp that this task is async
	return gulp.src('app/src_es6/**/*.js')
		// We pipe the source into babel
		.pipe(babel({
			// We need to tell babel to use the babel-preset-es2015
            presets: ['es2015']
		}))
		// We then pipe that into gulp.dest to set a final destination
		// In this case a build folder
		.pipe(gulp.dest('app/build_js'));
});
// Create a default gulp task, this lets us type gulp into the terminal
// The ['es6'] tells gulp what task or tasks to run right away. 
gulp.task('default', ['es6'],() => {
	// Tell gulp to watch for file changes on src/app.js
	// run the es6 task when it changes!
	gulp.watch('src/app.js',['es6'])
});


/*
return gulp.src('src/app.js') // берем файл
    .pipe(babel({presets: ['es2015'])) // выполняем плагин, функцию, команду
    .pipe(gulp.dest('build'));  // выгружаем результат работы плагина


*/
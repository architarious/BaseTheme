var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglifyjs');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

/*
* IO variables
*/
var css_in = './app/scss/**/*.scss';
var css_out = './stylesheets';
var img_in = './app/img/*.*';
var img_out = './images';
var js_in = './app/js/*.js';
var js_out = './javascripts';
var templates = './views';
var proxy ="localhost/BaseTheme/"+templates;




/*
* Minify images and export to the images directory
*/
gulp.task('imagemin', function () {
    return gulp.src(img_in)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(img_out));
});

/*
* Run SASS preprocessors, autoprefixer and generate sourcemaps
*/ 
gulp.task('sass', function () {
	return gulp.src(css_in)
	.pipe(sourcemaps.init())
	.pipe(sass( {outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%', 'Firefox ESR', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: false
        }))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(css_out))
	.pipe(browserSync.stream());
});

/*
* Minify styles.css
*/
gulp.task('minify-css', () => {
  return gulp.src(css_out+'/styles.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(css_out));
});

/*
* Consolidate and minify js files
*/
gulp.task('uglify', function() {
  gulp.src(js_in)
    .pipe(uglify('main.js'))
    .pipe(gulp.dest(js_out))
});
 
/*
* Initialize browsersync and watch for changes
*/
gulp.task('watch', function() {
	// BrowserSync settings
	browserSync.init({
	  //server:{baseDir: "./"}
	  proxy: proxy
    });

    
    //Watch for SCSS file changes; run sass and minify-css
    gulp.watch(css_in, ['sass', 'minify-css'])
    	.on('change', function(event){
    		console.log('File' + event.path + ' was ' + event.type + ', running tasks...')
    	});

	//Watch for other file changes and then reload browsersync
	gulp.watch(img_in, ['imagemin']);
	gulp.watch(img_out+"/**/*.*").on('change', browserSync.reload);
	gulp.watch(js_in, ['uglify']).on('change', browserSync.reload);
    gulp.watch(templates+"/**/*.*").on('change', browserSync.reload);

});
 
// Default task
gulp.task('default', ['sass', 'watch']);

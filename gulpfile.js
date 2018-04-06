
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var config = require('./config.json');


var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglifyjs');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

/*
* IO paths - stored in config.json
*/
var templates = config.views;
var proxy = config.proxy;
var css_in = config.css.src; 
var css_out = config.css.dest; 
var css_libraries = config.css.includePaths;
var css_fileName = config.css.file;
var img_in = config.img.src; 
var img_out = config.img.dest; 
var js_in = config.js.src; 
var js_out = config.js.dest; 
var fonts_in = config.fonts.src;
var fonts_out = config.fonts.dest;




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
	.pipe(sass({
		outputStyle: 'compressed',
		errLogToConsole: true,
		includePaths: css_libraries
	}).on('error', sass.logError))
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
  return gulp.src(css_out+'/'+css_fileName+'.css')
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
* Move font-awesome fonts into a central directory
*/
gulp.task('fonts', function() {
  return gulp.src(fonts_in)
    .pipe(gulp.dest(fonts_out));
});

/*
* Compile everything
*/
gulp.task('init', ['sass', 'imagemin', 'uglify', 'fonts', 'minify-css']);
 
/*
* Initialize browsersync and watch for changes
*/
gulp.task('watch', function() {
	// BrowserSync settings
	browserSync.init({
	  server:{
		  baseDir: "./",
		  index: "views/index.html"
		}
	  //proxy: proxy
    });

    
    //Watch for SCSS file changes; run sass and minify-css
    gulp.watch(css_in, ['sass'])
    	.on('change', function(event){
    		console.log('File' + event.path + ' was ' + event.type + ', running tasks...')
    	});

	//Watch for other file changes and then reload browsersync
	gulp.watch(css_out+'/'+css_fileName+'.css', ['minify-css']);
	gulp.watch(img_in, ['imagemin']);
	gulp.watch(img_out+"/**/*.*").on('change', browserSync.reload);
	gulp.watch(js_in, ['uglify']).on('change', browserSync.reload);
    gulp.watch(templates+"/**/*.*").on('change', browserSync.reload);

});
 
// Default task
gulp.task('default', ['init', 'watch']);

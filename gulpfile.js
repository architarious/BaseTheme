

const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const config = require('./config.json');

const autoprefixer = require('autoprefixer');
const cssnano = require("cssnano");
const concat = require('gulp-concat');
const del = require("del");
const eslint = require("gulp-eslint");
const imagemin = require('gulp-imagemin');
const newer = require("gulp-newer");
const normalize = require("postcss-normalize");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const fileinclude = require('gulp-file-include');

/**************************************************************
* IO paths - stored in config.json
*/
const templateDir = config.templates.dir;
const appTemplates = config.templates.appTemplates;
const prodTemplates = config.templates.prodTemplates;
const html_in = config.templates.html;
const proxy = config.proxy;
const css_in = config.css.src; 
const css_out = config.css.dest; 
const css_libraries = config.css.includePaths;
const css_fileName = config.css.file;
const img_in = config.img.src; 
const img_out = config.img.dest; 
const js_in = config.js.src; 
const js_out = config.js.dest; 
const fonts_in = config.fonts.src;
const fonts_out = config.fonts.dest;



/**************************************************************
 * BrowserSync Tasks
 */
// BrowserSync
function browserSync(done) {
	browsersync.init({
	  server: {
		baseDir: "./",
		index: "views/prod/t-homepage.html"
	  },
	  //port: 3000,
	  //proxy: proxyGoesHere
	});
	done();
 }
 
// BrowserSync Reload
function browserSyncReload(done) {
	browsersync.reload();
	done();
}
// BrowserSync Reload
function browserSyncStream(done) {
	browsersync.stream();
	done();
}



/**************************************************************
 * Optimize images
 */
// Optimize Images
function images() {
	return gulp
	  .src(img_in)
	  .pipe(newer(img_out))
	  .pipe(
		imagemin([
		  imagemin.gifsicle({ interlaced: true }),
		  imagemin.jpegtran({ progressive: true }),
		  imagemin.optipng({ optimizationLevel: 5 }),
		  imagemin.svgo({
			plugins: [
			  {
				removeViewBox: false,
				collapseGroups: true
			  }
			]
		  })
		])
	  )
	  .pipe(gulp.dest(img_out));
  }
  


/**************************************************************
 * CSS tasks
 */
function css() {
	return gulp
	  .src(css_in)
	  .pipe(plumber())
	  .pipe(sourcemaps.init())
	  .pipe(sass({ 
		  outputStyle: "expanded",
		  errLogToConsole: true
		  //includePaths: css_libraries
		}).on('error', sass.logError))
	  .pipe(sourcemaps.write())
		.pipe(gulp.dest(css_out))
		.pipe(browsersync.stream())
	  .pipe(rename({ suffix: ".min" }))
	  .pipe(postcss([
		  autoprefixer(), 
		  cssnano(), 
		  normalize()
	    ]))
		.pipe(gulp.dest(css_out))
		.pipe(browsersync.stream())
  }
  


/**************************************************************
 * Javascript tasks
 */  
// Lint scripts
function scriptsLint() {
	return gulp
	  .src(js_in)
	  .pipe(plumber())
	  .pipe(eslint())
	  .pipe(eslint.format())
	  .pipe(eslint.failAfterError());
}
  
// Transpile, concatenate and minify scripts
function scripts() {
	return (
	  gulp
		.src(js_in)
		.pipe(plumber())
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(js_out))
		.pipe(browsersync.stream())
	);
}

/**************************************************************
 * HTML Templating tasks
 */

function fileIncluder(){
	return gulp
	.src([appTemplates])
	.pipe(plumber())
	.pipe(fileinclude({
		prefix: '@@',
		basepath: 'app/views'
	}))
	.pipe(gulp.dest(prodTemplates));
}


/**************************************************************
 * Watch tasks
 */    
function watchFiles() {
	gulp.watch(css_in, css);
	gulp.watch(js_in, scripts);
	gulp.watch(appTemplates, html);
	gulp.watch(img_in, images);
} 
  


/**************************************************************
 * Complex tasks
 */ 
const html = gulp.series(fileIncluder, browserSyncReload); 
const js = gulp.series(scriptsLint, scripts);
const build = gulp.parallel(css, images, js);
const watch = gulp.parallel(watchFiles, browserSync);
  



/**************************************************************
 * EXPORT TASKS
 */
exports.templates = html;
exports.js = scripts;
exports.images = images;
exports.css = css;
exports.build = build;
exports.watch = watch;
exports.default = build;
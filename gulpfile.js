const{
	src,
	dest,
	parallel,
	series,
	watch
} = require('gulp');

//plugins
const autoprefixer = require('autoprefixer');
const cssnano = require("cssnano");
const purgecss = require('@fullhuman/postcss-purgecss');

const uglify = require('gulp-uglify');
const eslint = require("gulp-eslint");
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const postcss = require("gulp-postcss");
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const plumber = require("gulp-plumber");
const sourcemaps = require('gulp-sourcemaps');
const fileinclude = require('gulp-file-include');

const browsersync = require('browser-sync').create();

/**************************************************************
* IO paths - stored in config.json
*/
const config = require('./config.json');

const html_in = config.templates.src;
const html_out = config.templates.dest;
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
 * Clean Assets
 */
function clear() {
    return src('./assets/*', {
            read: false
        })
        .pipe(clean());
}

/**************************************************************
 * Javascript functions
 */  

function js() {

    return src(js_in)
        .pipe(changed(js_in))
        .pipe(concat('bundle.js'))
		.pipe(eslint())
		.pipe(eslint.format())
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest(js_out))
        .pipe(browsersync.stream());
}

/**************************************************************
 * CSS functions
 */

function css() {

    return src(css_in)
        .pipe(changed(css_in))
		.pipe(plumber())
		.pipe(sourcemaps.init())
        .pipe(sass({
			outputStyle: "expanded",
			errLogToConsole: true
		}).on('error', sass.logError))
        .pipe(rename({
            extname: '.min.css'
        }))
		.pipe(postcss([
			autoprefixer({
				overrideBrowserslist: ['last 2 versions'],
            	cascade: false
			}), 
		    cssnano(), 
			purgecss({
				content: ['./assets/views/templates/**/*.html']
			  }),

		]))
		.pipe(sourcemaps.write())
        .pipe(dest(css_out))
        .pipe(browsersync.stream());
}

/**************************************************************
 * Optimize images
 */

function img() {
    return src(img_in)
        .pipe(imagemin([
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
		  ]))
        .pipe(dest(img_out))
		.pipe(browsersync.stream());
}

/**************************************************************
 *  Font tasks 
 */

function fontMover(){
	return src(fonts_in)
		.pipe(dest(fonts_out))
		.pipe(browsersync.stream());
}


/**************************************************************
 * HTML Templating tasks
 */

 function htmlCompiler(){
	return src([html_in])
	.pipe(plumber())
	.pipe(fileinclude({
		prefix: '@@',
		basepath: 'app/views'
	}))
	.pipe(dest(html_out))
	.pipe(browsersync.stream());
}


/**************************************************************
 * BrowserSync Tasks
 */
// BrowserSync
function browserSync(done) {
	browsersync.init({
	  server: {
		baseDir: "./assets/",
		index: "views/templates/t-homepage.html"
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
 * Watch Files
 */

function watchFiles() {
    watch(css_in, css);
    watch(js_in, js);
    watch(img_in, img);
	watch(html_in, htmlCompiler);
}


// Tasks to define the execution of the functions simultaneously or in series

exports.watch = parallel(watchFiles, browserSync);
exports.default = series(clear, parallel(js, css, img, htmlCompiler, fontMover));
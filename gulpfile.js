var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

var input = './app/scss/**/*.scss';
var output = './stylesheets';
 
gulp.task('sass', function () {
	return gulp.src(input)
	.pipe(sourcemaps.init())
	.pipe(sass( {outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%', 'Firefox ESR'],
            cascade: false
        }))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(output))
	.pipe(browserSync.stream());
});
 
// Watch files for change and set Browser Sync
gulp.task('watch', function() {
	// BrowserSync settings
	browserSync.init({
	  server:{baseDir: "./"}
    });

    //watch html files
    gulp.watch("./views/*.html").on('change', browserSync.reload);
 
    // Scss file watcher
    gulp.watch(input, ['sass'])
    	.on('change', function(event){
    		console.log('File' + event.path + ' was ' + event.type + ', running tasks...')
    	});
});
 
// Default task
gulp.task('default', ['sass', 'watch']);

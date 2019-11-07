/*
|--------------------------------------------------------------------
| SET DEPENDENCIES
|--------------------------------------------------------------------
*/

// Required for all tasks
var gulp = require('gulp');
// Required for SASS tags
var sass = require('gulp-sass');
// Adds support for SASS globbing
var sassGlob = require('gulp-sass-glob');
// Used to rename CSS and JS depending if minified
var rename = require("gulp-rename");
// Used to add conditional functionality
var gulpif = require('gulp-if');
// Used to delete folders during build process
var del = require('del');
// Used to create synchronous build tasks
var runSequence = require('run-sequence');

/*
|--------------------------------------------------------------------
| CONFIG
|--------------------------------------------------------------------
*/

// If minify is true then css & js will be minified
// This is in case the code needs to be maintained by a less-technical developer
var minify = false;

/*
|--------------------------------------------------------------------
|  DELETE DIST FOLDER
|--------------------------------------------------------------------
*/

gulp.task('deleteDist', function(){
	return del('dist/');
});

/*
|--------------------------------------------------------------------
|  COPY STATIC ASSETS
|--------------------------------------------------------------------
*/

// Copy HTML files
gulp.task('copyHTML', function() {
	// Copy all non-directory files
	gulp.src('dev/html/*.+(html|md)')
	.pipe(gulp.dest('dist/'));
});


// Copy Package JSON to dist file as it needs the link to the template config is needed by kss
gulp.task('copyPackage', function() {
	// Copy all non-directory files
	gulp.src('package.json')
	.pipe(gulp.dest('dist/'));
});

// Copy template to public folder
gulp.task('copyTemplate', function() {
	// Copy all non-directory files
	gulp.src('dev/template_config.js')
	.pipe(gulp.dest('dist/'));
});

// Copy assets to public folder
gulp.task('copyJS', function() {
	// Copy all non-directory files
	gulp.src('dev/js/*.+(js)')
	.pipe(gulp.dest('dist/public/'));
});

// Copy IMG files
gulp.task('copyIMG', function() {
	// Copy all non-directory files
	gulp.src('dev/img/*.+(png|jpg|gif|svg)')
	.pipe(gulp.dest('dist/public/'));
});

/*
|--------------------------------------------------------------------
|  SASS
|--------------------------------------------------------------------
*/

gulp.task('sass', function () {
	return gulp.src('dev/sass/*.scss')
	.pipe(sassGlob())
	.pipe(gulpif(minify, sass({outputStyle: 'compressed', precision: 8}), sass({outputStyle: 'expanded', precision: 8})))
	.pipe(gulpif(minify, rename({ suffix: '.min' })))
	.on('error', sass.logError)
	.pipe(gulp.dest('./dist/public/'));
});

/*
|--------------------------------------------------------------------
|  PRODUCTION FUNCTIONS
|--------------------------------------------------------------------
*/

// Here we pull everything together into generic watch and build functions

// WATCH FUNCTION
gulp.task("watch", function() {
	// HTML
	gulp.watch('dev/html/**/*.html',['copyHTML']);
	// Images
	gulp.watch('dev/img/*.+(png|jpg|gif|svg)',['copyIMG']);
	// SASS
	gulp.watch('dev/sass/**/*.scss',['sass']);
	// JS
	gulp.watch('dev/js/**/*.js',['copyJS']);
});

// BUILD FUNCTION
gulp.task('build',function() {
	runSequence(
		// Delete Dist Folder
		"deleteDist",	
		// Run other tasks asynchronously 
		["copyHTML", "copyJS", "copyIMG", "sass", "copyPackage", "copyTemplate"]
	);
});


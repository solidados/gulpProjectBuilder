const gulp = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const del = require('del')


// building folders structure
const paths = {
    styles: {
        src: 'src/styles/**/*.less',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    }
}

// function to clean /dist folder
function clean() {
    return del(['dist'])
}

// universal paths for styles and scripts
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(less())
        .pipe(cleanCSS()) //this plugin will minify the code by deleting spaces, unnecessary punctuation charachters, paragraphs etc.
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
}

// Task for script processing
function scripts() {
    return gulp.src(paths.scripts.src, {
            sourcemaps: true
        })
        .pipe(babel())
}

function watch() {
    gulp.watch(paths.styles.src, styles)
}

// builder for tasks flow
const build = gulp.series(clean, styles, watch) // .series allows tasks in brackets to run consistently

exports.clean = clean
exports.styles = styles
exports.watch = watch
exports.build = build // task is called with <$ gulp build>
exports.default = build // task on default is called with <$ gulp>
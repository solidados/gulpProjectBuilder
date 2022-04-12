const gulp = require('gulp')
const less = require('gulp-less')
const del = require('del')
const cleanCSS = require('gulp-clean-css')

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
        .pipe(gulp.dest(paths.styles.dest))
}

exports.clean = clean
exports.styles = styles
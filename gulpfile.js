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

exports.clean = clean
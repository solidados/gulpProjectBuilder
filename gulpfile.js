const gulp = require('gulp');
const less = require('gulp-less');
const del = require('del');
const cleanCSS = require('gulp-clean-css');

const paths = {
    styles: {
        src: 'src/styles/**/*.less'
    }
}

// function to clean /dist folder
function clean() {
    return del(['dist'])
}

exports.clean = clean
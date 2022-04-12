const gulp = require('gulp');
const less = require('gulp-less');
const del = require('del');
const cleanCSS = require('gulp-clean-css');

function clean() {
    return del(['dist'])

}
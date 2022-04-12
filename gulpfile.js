const gulp = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const { deserialize } = require('v8')
const { dest } = require('vinyl-fs')


// building folders structure
const paths = {
    html: {
        src: 'src/*.html',
        dest: 'dist'
    },
    styles: {
        src: 'src/styles/**/*.less',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    },
    images: {
        src: 'src/img/*',
        dest: 'dist/img'
    }
}

// function to clean /dist folder
function clean() {
    return del(['dist'])
}

// function for minify html syntax
function html() {
    return gulp.src(paths.html.src)
        .pipe(htmlmin({ coollapseWhitespace: true }))
        .pipe(gulp.dest(paths.html.dest));
}

// universal paths for styles and scripts
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        })) //this plugin will minify the code by deleting spaces, unnecessary punctuation charachters, paragraphs etc.
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
}

// Task for script processing
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babell/env']
        }))
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scripts.dest))
}

// imagemin function - shows image optimization and parameters of minimization
function img() {
    return gulp.src(paths.images.src)
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest(paths.images.dest))
}
// It does not compile everything but only the edited ones. I.e.: if you chnaged styles only – it will compile styles, if scripts - then scripts... 
function watch() {
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts)
}

// builder for tasks to flow in described order
const build = gulp.series(clean, html, gulp.parallel(styles, scripts, img), watch) // .series allows tasks in brackets to run consistently

exports.clean = clean
exports.img = img
exports.html = html
exports.styles = styles
exports.scripts = scripts
exports.watch = watch
exports.build = build // task is called with <$ gulp build>
exports.default = build // task on default is called with <$ gulp>
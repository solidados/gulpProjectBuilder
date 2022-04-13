const gulp = require('gulp')
const less = require('gulp-less')
const stylus = require('gulp-stylus') // pre-processor for CSS files. something like 'beautify'
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const htmlmin = require('gulp-htmlmin')
const size = require('gulp-size')
const newer = require('gulp-newer')

const browserSync = require('browser-sync').create()
    // const gulppug = require('gulp-pug') // html pre-processor pug
const del = require('del')
const { deserialize } = require('v8')
const { dest } = require('vinyl-fs')


// building folders structure
const paths = {
    // pug: {
    //     src: 'src/*.pug',
    //     dest: 'dist/'
    // },
    html: {
        src: 'src/*.html',
        dest: 'dist/'
    },
    styles: {
        src: ['src/styles/**/*.less', 'src/styles/**/*.styl'],
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    },
    images: {
        src: 'src/img/**',
        dest: 'dist/img/'
    }
}

// function to clean /dist folder
// Exclusion: by adding '!dist/img' into array allows to clean /dist excluding (!) /img and its content.
function clean() {
    return del(['dist/*', '!dist/img'])
}

// function for html pre-processor pug
// function pug() {
//     return gulp.src(paths.pug.src)
//         .pipe(gulppug())
//         .pipe(size({
//             showFiles: true
//         }))
//         .pipe(gulp.dest(paths.pug.dest))
//         .pipe(browserSync.stream())
// }

// function for minify html syntax
function html() {
    return gulp.src(paths.html.src)
        .pipe(htmlmin({ coollapseWhitespace: true }))
        .pipe(size({
            showFiles: true
        }))
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream())
}

// universal paths for styles and scripts
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(less())
        // .pipe(stylus()) // switch to this .pipe from less, if you are using *.styl
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        })) //this plugin will minify the code by deleting spaces, unnecessary punctuation charachters, paragraphs etc.
        .pipe(rename({
            basename: 'style',
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(size({
            showFiles: true
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream())
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
        .pipe(size({
            showFiles: true
        }))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream())
}

// imagemin function - shows image optimization and parameters of minimization
function img() {
    return gulp.src(paths.images.src)
        .pipe(newer(paths.images.dest))
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
        .pipe(size({
            showFiles: true
        }))
        .pipe(gulp.dest(paths.images.dest))
}
// It does not compile everything but only the edited ones. I.e.: if you chnaged styles only – it will compile styles, if scripts - then scripts... 
function watch() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    })
    gulp.watch(paths.html.dest).on('change', browserSync.reload)
    gulp.watch(paths.html.src, html)
        // gulp.watch(paths.pug.src, pug) // to be commented in case of lack of need
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts)
    gulp.watch(paths.images.src, img)
}

// builder for tasks to flow in described order
// here, instead of html you may switch and plug in pre-processor pug <i.e.: html => pug> and all files in src/*.pug will be processed as *.html in dist/
const build = gulp.series(clean, html, gulp.parallel(styles, scripts, img), watch) // .series allows tasks in brackets to run consistently

exports.clean = clean
exports.img = img
    // exports.pug = pug // html pre-processor pug
exports.html = html
exports.styles = styles
exports.scripts = scripts
exports.watch = watch
exports.build = build // task is called with <$ gulp build>
exports.default = build //! task on default is called with <$ gulp>
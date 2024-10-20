import gulp from "gulp"
import pugs from "gulp-pug"
import { deleteAsync } from "del"
import ws from "gulp-webserver"
import image from "gulp-image"
import * as dartSass from "sass"
import gulpSass from "gulp-sass"
import autoPrefixer from 'gulp-autoprefixer'
import miniCSS from "gulp-csso"
import bro from "gulp-bro"
import babelify from "babelify"
import ghPages from 'gulp-gh-pages'

const sass = gulpSass(dartSass)

// sass.compiler = require('node-sass')
// gulp가 작업 할 곳의 경로를 알려주자.
const routes = {
    pug: {
        watch: "src/**/*.pug",
        src: "src/*.pug",
        dest: "build"
    },
    img: {
        src: "src/img/*",  // 확장자를 지정하려면 *.jpg 같이 써준다.
        dest: "build/img"
    },
    scss: {
        watch: "src/scss/**/*.scss",
        src: "src/scss/style.scss",
        dest: "build/css"
    },
    js: {
        watch: "src/js/**/*.js",
        src: "src/js/main.js",
        dest: "build/js"
    }
}

// build를 수정하려면 deleteAsync를 사용해서 이전 작업을 삭제해야 한다.
const clean = () => deleteAsync(["build/", ".publish"])

const pug = () =>
    gulp
        .src(routes.pug.src) // 작업경로 확인
        .pipe(pugs())  // .pug를 .html로 컴파일
        .pipe(gulp.dest(routes.pug.dest))  //목적지에 저장

const webserver = () =>
    gulp.src("build").pipe(ws({ livereload: true, open: true }))

const img = () =>
    gulp
        .src(routes.img.src)
        .pipe(image())
        .pipe(gulp.dest(routes.img.dest))


const styles = () =>
    gulp
        .src(routes.scss.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoPrefixer())
        .pipe(miniCSS())
        .pipe(gulp.dest(routes.scss.dest))

const js = () =>
    gulp
        .src(routes.js.src)
        .pipe(bro({
            transform: [
                babelify.configure({ presets: ["@babel/preset-env"] }),
                ["uglifyify", { global: true }]]
        })
        ).pipe(gulp.dest(routes.js.dest))

const gh = () =>
    gulp
        .src("build/**/*")
        .pipe(ghPages())

const watch = () => {
    gulp.watch(routes.pug.watch, pug)
    gulp.watch(routes.img.src, pug)
    gulp.watch(routes.scss.watch, styles)
    gulp.watch(routes.js.watch, js)
}


const prepare = gulp.series([clean, img]);

const assets = gulp.series([pug, styles, js])

// 작업을 동시에 수행하기위해 parallel을 사용
const postDev = gulp.parallel([webserver, watch, styles])

// npm run dev 명령어로 하단 [ ..., ...]의 작업 실행
export const build = gulp.series([prepare, assets])
export const dev = gulp.series([build, postDev])
export const deploy = gulp.series([build, gh, clean])


//Объявление констант с возможностями:
//Самого gulp
const { src, dest, watch, parallel, series } = require('gulp');
//И его плагинов
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const svgSprite = require('gulp-svg-sprite');
const ttf2woff2 = require('gulp-ttf2woff2');
const fonter = require('gulp-fonter');
const include = require('gulp-include');
const browserSync = require('browser-sync').create();


//Работа со стилями
function styles() {
   //Достать данные отсюда
   return src('app/scss/style.scss')
      //Добавить вендорные префиксы
      .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
      //Объеденить все взятые файлы в этот
      .pipe(concat('style.min.css'))
      //Сжать файл
      .pipe(scss({ outputStyle: 'compressed' }))
      //Положить файл сюда
      .pipe(dest('app/css'))
      //обновить сайт в браузере
      .pipe(browserSync.stream())
}

//Работа со скриптами
function scripts() {
   // Взять эти файлы
   return src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/slick-carousel/slick/slick.js',
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
      'node_modules/rateyo/src/jquery.rateyo.js',
      'node_modules/ion-rangeslider/js/ion.rangeSlider.js',

      'app/js/main.js'

   ])
      //Объеденить все взятые файлы в этот
      .pipe(concat('main.min.js'))
      //Сжать файл
      .pipe(uglify())
      //Поместить файл сюда
      .pipe(dest('app/js'))
      //обновить сайт в браузере
      .pipe(browserSync.stream())
}

//Работа с картинками
function images() {
   //Взять картинки отсюда, кроме svg
   return src(['app/images/src/**/*.*', '!app/images/src/**/*.svg', '!app/images/src/**/*.ico'])
      //  взять только новые исходные картинки, старые не трогать
      .pipe(newer('app/images'))
      //Сжатие в 50% + конвертироание в avif
      .pipe(avif({ quality: 50 }))

      .pipe(src('app/images/src/**/*.*'))
      .pipe(newer('app/images'))
      //Конвертирование в webp
      .pipe(webp())

      .pipe(src('app/images/src/**/*.*'))
      .pipe(newer('app/images'))
      //Сжатие
      .pipe(imagemin())

      //Положить результат сюда
      .pipe(dest('app/images'))
}

//Работа с картинками svg
function sprite() {
   //Взять картинки svg отсюда
   return src('app/images/src/*.svg')
      .pipe(svgSprite({
         mode: {
            //В папку stack положить html
            stack: {
               // в images положить sprite.svg
               sprite: '../sprite.svg',
               example: true
            }
         }
      }))
      //Результат положить сюда
      .pipe(dest('app/images'))
}

//Работа со шрифтами
function fonts() {
   // Взять шрифты отсюда
   return src('app/fonts/src/*.*')
      //Конвертировать в woff и ttf
      .pipe(fonter({
         formats: ['woff', 'ttf']
      }))
      // взять шрифты ttf
      .pipe(src('app/fonts/*.ttf'))
      // конвертировать их в woff2
      .pipe(ttf2woff2())
      // Результат положить сюда
      .pipe(dest('app/fonts'))
}

//Работа со страницами
function pages() {
   // Взять страницы отсюда
   return src('app/pages/*.html')
      // подключить куски страниц отсюда
      .pipe(include({
         includePaths: 'app/components'
      }))
      //Результат положить сюда
      .pipe(dest('app'))
      //Динамическое обновление
      .pipe(browserSync.stream())
}

//обновление сайта в процессе его разработки
function browsersync() {
   browserSync.init({
      server: {
         //Рабочий каталог:
         baseDir: "app/"
      }
   })
}

//Динамическое обновление сайта в процессе его разработки
function watching() {
   //Наблюдать за изменением файлов стилей, при изменении выполнять функцию styles
   watch(['app/scss/style.scss'], styles)
   //Наблюдать за изменением в каталоге картинок, при изменении выполнять функцию images
   watch(['app/images/src'], images)
   //Наблюдать за изменением файлов скриптовб, при изменении выполнять функцию scripts
   watch(['app/js/main.js'], scripts)
   //Наблюдать за изменением файлов страниц и их частей, при изменении выполнять функцию pages
   watch(['app/components/*', 'app/pages/*'], pages)
   //Наблюдать за изменением файлов html. При смене фокуса перезагружать сайт
   watch(['app/*.html']).on('change', browserSync.reload);
}

// Очистка dist перед записью в него очерезной версии сайта
function cleanDist() {
   return src('dist')
      .pipe(clean())
}

// Сборка
function building() {
   // Взять эти файлы
   return src([
      'app/css/style.min.css',
      'app/js/main.min.js',
      'app/images',
      'app/images/**/*.*',
      'app/fonts/*.*',
      'app/**/*.html',
      '!app/images/src',
      // '!app/images/*.svg',
      // 'app/images/sprite.svg',
      '!app/images/stack',
      '!app/components/**/*.*',
      '!app/pages/**/*.*',
      // с учетом сохранения структуры каталогов
   ], { base: 'app' })
      // поместить их в dist
      .pipe(dest('dist'))
}

// gulp styles - выполнить функцию styles
exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.images = images;
exports.building = building;
exports.sprite = sprite;
exports.fonts = fonts;
exports.pages = pages;
exports.browsersync = browsersync;

// gulp  - параллельно выполнить функции styles, scripts, browsersync, watching
exports.default = parallel(fonts, images, sprite, styles, scripts, pages, browsersync, watching);
// gulp build  - последовательно выполнить функции cleanDist, затем - building
exports.build = series(cleanDist, building);

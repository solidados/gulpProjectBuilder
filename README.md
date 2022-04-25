# Simple GulpProjectBuilder
## Why Gulp
This repo was created for Gulp task manager to automate & enhance your work flow.

<i>Gulp is a task manager for automating frequently used tasks, written on JavaScript. The software uses command line to run tasks defined in Gulpfile. It is created as an offshoot of Grunt project in order to take the best practices from it.</i>

# Простая сборка Gulp, или "Как пользоваться этим проектом"

// в этом документе использован синтаксис mark-down
При помощи файлов этого репозитория вы сможете быстро настроить сборку вашего проекта на Gulp.

## Структура каталогов для размещения файлов стилей и скриптов:

Весь код необходимо писать в каталоге src:  
<i>– скрипты сохранять в каталоге /scripts</i>  
<i>– стили сохранять в каталоге /styles</i>  
>./src/scripts/\*\*/\*.js  
>./src/styles/\*\*/\*.less  

## Инструкция:
1. Скачать все файлы репозитория к себе в любую директорию
2. Ввести в Терминале команду: <i>npm i</i> (предварительно должен быть установлен node.js)
3. Выполнить команду: <i>gulp</i> (происходит запуск задачи <b>default</b>)
4. Писать свой код, и наслаждаться автоматической сборкой вашего проекта.

## Ссылки:
[Сборка проекта на Gulp 4](https://github.com/morphIsmail/gulp_build_3)  
[Документация Gulp на русском языке](https://webdesign-master.ru/blog/docs/gulp-documentation.html)  

## В сборщике были установлены NPM-пакеты:  
[gulp-babel](https://www.npmjs.com/package/gulp-babel) – Преобразует JavaScript в стандарт совместимости со старыми браузерами  
[browser-sync](https://www.npmjs.com/package/browser-sync) - Синхронизация кода с результатами в браузере  
[del](https://www.npmjs.com/package/del) – Удаление временных каталогов и файлов  
[gulp](https://www.npmjs.com/package/gulp) – Сборщик Gulp  
[gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) - Добавляет префиксы в CSS код  
[gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) – Минификация и оптимизация CSS файлов  
[gulp-concat](https://www.npmjs.com/package/gulp-concat) – Объединение нескольких файлов в один  
[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) – Для сжатия изображений  
[gulp-less](https://www.npmjs.com/package/gulp-less) – Компиляция Less файлов  
[gulp-rename](https://www.npmjs.com/package/gulp-rename) – Переименовывает файлы  
[gulp-sass](https://www.npmjs.com/package/gulp-sass) – Компиляция Sass и Scss файлов  
[gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) – Для работы с препроцессорами, создает карту кода для консоли в браузере  
[gulp-stylus](https://www.npmjs.com/package/gulp-stylus) – Компиляция Stylus файлов  
[gulp-uglify](https://www.npmjs.com/package/gulp-uglify) – Сжатие и оптимизация JavaScript кода  

  
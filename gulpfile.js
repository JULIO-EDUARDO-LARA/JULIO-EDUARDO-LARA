const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done){
    //PASOS DE COMPILACION DE SASS A CSS
    src('src/scss/**/*.scss')          //PAS1: Identifi ruta         
        .pipe(sass( {outputStyle: 'expanded'} ))                  //PAS2: Compilarlo.
        .pipe(dest("build/css"));      //PAS3: Almacenar  css compilado 
    done();
}
function imagenes () {
    return src('src/img/**/*')             //PASO 1: Identificar la ruta de las imag
        .pipe(imagemin( { optimizationLevel: 3 } ) )
        .pipe(dest('build/img'));
}
function versionWebp(){
    return src('src/img/**/*.{png, jpg}')
        .pipe(webp())
        .pipe( dest('build/img') )
}
function versionAvif(){
    return src('src/img/**/*.{png, jpg}')
        .pipe( avif() )
        .pipe( dest( 'build/img' ) )
}
function dev (){
    watch( 'src/scss/**/*.scss', css );
    watch( 'src/img/**/*', imagenes );
}
exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( imagenes, versionWebp, versionAvif, css, dev ); //default se llama solo comand gulp





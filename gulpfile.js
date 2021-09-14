
let projectFolder = "dist";
let sourceFolder = "src";
const fs = require('fs');
let path = {
    build: {
        html: projectFolder+"/",
        css: projectFolder +"/css/",
        js: projectFolder + '/js/',
        img: projectFolder + '/img/',
        fonts: projectFolder + '/fonts/',
    },
    src: {
        html: [sourceFolder+ '/*.html', '!' + sourceFolder+ '/_*.html'],
        css: sourceFolder + '/scss/style.scss',
        js: sourceFolder + '/js/script.js',
        img: sourceFolder + '/img/**/*.+(png|jpg|gif|ico|svg|webp)',
        fonts: sourceFolder + '/fonts/*.ttf',
    },
    watch: {
        html: sourceFolder+ '/**/*.html',
        css: sourceFolder + '/scss/**/*.scss',
        js: sourceFolder + '/js/**/*.js',
        img: sourceFolder + '/img/**/*.+(png|jpg|gif|ico|svg|webp)',
    },
    clean: './' + projectFolder + '/'
    
}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    htmlmin = require('gulp-htmlmin'),
    del = require('del'),
    scss = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin'),
    svgSprite = require('gulp-svg-sprite'),
    ttf2woff2 = require('gulp-ttf2woff2');
    

function browserSync(params) {
    browsersync.init({
        server: {
            baseDir:'./' + projectFolder + '/'
        },
        port: 3000,
        notify: false
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(scss({
        outputStyle: 'expanded' }).on('error', scss.logError))
        .pipe(autoprefixer({
            overrideBrowserList: ['last 5 versions'],
            cascade: true
        }))
        .pipe(cleanCSS())
        .pipe(rename({extname: '.min.css'}))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src([
        'src/js/libs/*.js',
        path.src.js])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function images() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interplaced: true,
            optimizationLevel: 3 // 0 to 7
        }))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function svgSprites() {
    return src(sourceFolder + '/icons/*.svg')
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: '../sprite.svg'
            }
        }
    }))
    .pipe(dest(path.build.img))
}

gulp.task('fonts', function() {
return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts))
})


let srcFonts = './src/scss/_fonts.scss';

gulp.task('fontsStyle', function(done) {
    let file_content = fs.readFileSync(srcFonts);

	fs.writeFile(srcFonts, '', cb);
	fs.readdir(path.build.fonts, function (err, items) {
		if (items) {
			let c_fontname;
			for (var i = 0; i < items.length; i++) {
				let fontname = items[i].split('.');
				fontname = fontname[0];
				if (c_fontname != fontname) {
					fs.appendFile(srcFonts, '@include font-face("' + fontname + '", "' + fontname + '", 400);\r\n', cb);
				}
				c_fontname = fontname;
			}
		}
	})

	done();

})



function cb() {
    
}

function wathcFiles() {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.img], images)
    gulp.watch(sourceFolder + '/icons/*.svg', svgSprites)
}

gulp.task('clean', function() {
    return del(path.clean);
})


let build = gulp.series(gulp.parallel(js, css, html, images), svgSprites);
let watch = gulp.parallel(build, wathcFiles, browserSync);


exports.svgSprites = svgSprites;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
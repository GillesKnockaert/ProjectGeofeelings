var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gulpMocha = require('gulp-mocha');
var env = require('gulp-env');
var supertest = require('supertest');
var less = require('gulp-less');

gulp.task('default', function(){
    nodemon({
        script: 'bin/www',
        ext: 'js',
        env: {
        },
        ignore:['./node/modules/**']
    })
    .on('restart', function(){
            console.log('Restarting');
    });
});

gulp.task('test', function(){
    env({vars: {ENV: 'Test'}});
    gulp.src('tests/*.js',{read: false})
        .pipe(gulpMocha({reporter: 'nyan'}))
});

gulp.task('less', function () {
    return gulp.src("./public/css/*.less")
        .pipe(less())
        .pipe(gulp.dest("./public/dist/"));
});

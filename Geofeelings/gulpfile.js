var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gulpMocha = require('gulp-mocha');
var env = require('gulp-env');
var supertest = require('supertest');
var less = require('gulp-less');

gulp.task('nodemon', function(){
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

gulp.task('set-env', function () {
    env({
        vars: {
            MONGO_URI: "mongodb://fgryspee:geofeelings@ds034198.mongolab.com:34198/geofeelings",
            MONGO_LOCAL: "mongodb://localhost:27017/geofeelings"
        }
    })
});


gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});

gulp.task('dev',['nodemon','set-env','set-dev-node-env']);
gulp.task('prod',['nodemon','set-env','set-prod-node-env']);


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

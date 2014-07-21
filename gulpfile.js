var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');
var clean = require('gulp-clean');

var filesStylus = ['stylus/**/*.styl'];

gulp.task('stylus', function () {

  gulp.watch(filesStylus, function(e){
    var fileName = e.path.slice(e.path.lastIndexOf('/')),
        pathFile = e.path.replace(fileName, ''),
        pathSearch = pathFile + '/**/*.styl',
        otherFiles = pathFile + '/**/!(*.styl)',
        pathDest = pathFile.replace('/stylus/', '/assets/');
      
    gulp.src(otherFiles)
      .pipe(gulp.dest(pathDest));

    gulp.src(pathSearch)
      .pipe(stylus({
        use: [nib()],
        set:['compress'],
        import: ['nib']
      }))
      .pipe(gulp.dest(pathDest));
  });

});

// gulp.task('compile', function () {

//   var pathSearch = './**/*.styl',
//       //otherFiles = './stylus/**/!(*.styl)',
//       pathDest = './assets';

//   // gulp.src(otherFiles)
//   //   .pipe(gulp.dest(pathDest));

//   gulp.src(['./**/*.styl'])
//     .pipe(stylus({
//       use: [nib()],
//       set:['compress'],
//       import: ['nib']
//     }))
//     .pipe(gulp.dest('./assets'));
// });

gulp.task('default', ['stylus']);
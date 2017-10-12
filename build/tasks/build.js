const gulp = require('gulp'),
  contentful = require('contentful'),
  nunjucksRender = require('gulp-nunjucks-render'),
  paths = require('../paths'),
  runSequence = require('run-sequence');

const client = contentful.createClient({
  space: 'uov9yuwhpdok',
  accessToken: 'ba01168ca3ab3df6fed796b07060fd2dda6f4fd31fae0741f65bc2dd5161ca4f',
});

const getGalleries = function () {
  console.log('Fetching galleries.');
  return client.getEntries({
    'content_type': 'gallery',
  }).then((entries) => {
    return Promise.resolve(entries.items);
  });
}

// compiles nunjucks
gulp.task('build-html', function () {
  return getGalleries()
    .then((galleries) => {
      const images = galleries[0].fields.images;

      return gulp.src(paths.html)
        .pipe(nunjucksRender({
          path: ['src'],
          data: {
            images,
          }
        }))
        .pipe(gulp.dest(paths.output));
    });
});

gulp.task('build-css', function () {
  return gulp.src(paths.css)
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-img', function () {
  return gulp.src(paths.img)
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-copy', ['build-copy-photoswipe'], function () {
  return
});

gulp.task('build-copy-photoswipe', function () {
  return gulp.src(['node_modules/photoswipe/dist/**/*'])
    .pipe(gulp.dest(paths.output + "assets/vendor/photoswipe"));
});

gulp.task('build', function (callback) {
  return runSequence(
    'clean',
    ['build-html', 'build-css', 'build-img', 'build-copy'],
    callback
  );
});
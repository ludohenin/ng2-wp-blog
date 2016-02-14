import {join} from 'path';
import {APP_DEST, WP_DIR} from '../config';

export = function buildJSDev(gulp, plugins) {
  return function () {
    return gulp.src(join(APP_DEST, '**/*.*'))
      .pipe(gulp.dest(WP_DIR));
  };
};

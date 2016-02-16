import {FONTS_SRC, FONTS_DEST} from '../config';

export = function buildJSDev(gulp, plugins) {
  return function () {
    return gulp.src(FONTS_SRC)
      .pipe(gulp.dest(FONTS_DEST));
  };
};

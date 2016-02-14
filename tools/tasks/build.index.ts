import {join} from 'path';
import {APP_SRC, APP_DEST, DEPENDENCIES, APP_ASSETS, ENV} from '../config';
import {transformPath, templateLocals} from '../utils';

export = function buildIndexDev(gulp, plugins) {
  return function () {
    return gulp.src([join(APP_SRC, 'index.html'), join(APP_SRC, 'index.php')])
      // NOTE: There might be a way to pipe in loop.
      .pipe(inject('shims'))
      .pipe(inject('libs'))
      .pipe(inject())
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(APP_DEST));
  };


  function inject(name?: string) {
    return plugins.inject(gulp.src(getInjectablesDependenciesRef(name), { read: false }), {
      name,
      transform: transformPath(plugins, 'dev')
    });
  }

  function getInjectablesDependenciesRef(name?: string) {
    return DEPENDENCIES.concat(APP_ASSETS)
      .filter(dep => dep['inject'] && dep['inject'] === (name || true))
      .map(mapPath);
  }

  function mapPath(dep) {
    let prodPath = `${dep.dest}/${dep.src.split('/').pop()}`;
    return ('prod' === ENV ? prodPath : dep.src );
  }
};

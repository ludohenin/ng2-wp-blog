import * as slash from 'slash';
import {join} from 'path';
import {APP_BASE, APP_DEST, ASSETS_PATH_PREFIX, ENV} from '../config';

let injectables: string[] = [];

export function injectableAssetsRef() {
  return injectables;
}

export function registerInjectableAssetsRef(paths: string[], target: string = '') {
  injectables = injectables.concat(
    paths
      .filter(path => !/(\.map)$/.test(path))
      .map(path => join(target, slash(path).split('/').pop()))
  );
}

export function transformPath(plugins, env) {
  return function (filepath) {
    filepath = ENV === 'prod' ? filepath.replace(`/${APP_DEST}`, '') : filepath;
    arguments[0] = join(APP_BASE, ASSETS_PATH_PREFIX, filepath);
    return slash(plugins.inject.transform.apply(plugins.inject.transform, arguments));
  };
}

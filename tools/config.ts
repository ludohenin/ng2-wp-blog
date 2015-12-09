import {readFileSync} from 'fs';
import {argv} from 'yargs';


// --------------
// Configuration.
export const ENV                  = argv['env']         || 'dev';
export const DEST                 = argv['dest']        || ENV;
export const DEBUG                = argv['debug']       || false;
export const PORT                 = argv['port']        || 5555;
export const LIVE_RELOAD_PORT     = argv['reload-port'] || 4002;
export const DOCS_PORT            = argv['docs-port']   || 4003;
export const APP_BASE             = argv['base']        || '/';

export const APP_TITLE            = 'ng2-wp-blog';

export const APP_SRC              = 'src';
export const ASSETS_SRC           = `${APP_SRC}/assets`;

export const TOOLS_DIR            = 'tools';
export const TMP_DIR              = 'tmp';
export const TEST_DEST            = 'test';
export const DOCS_DEST            = 'docs';
export const APP_DEST             = `dist/${DEST}`;
export const ASSETS_DEST          = `${APP_DEST}/assets`;
export const BUNDLES_DEST         = `${APP_DEST}/bundles`;
export const CSS_DEST             = `${APP_DEST}/css`;
export const FONTS_DEST           = `${APP_DEST}/font`;
export const LIB_DEST             = `${APP_DEST}/lib`;
export const APP_ROOT             = ENV === 'dev' ? `${APP_BASE}${APP_DEST}/` : `${APP_BASE}`;
export const VERSION              = appVersion();

export const VERSION_NPM          = '3.0.0';
export const VERSION_NODE         = '4.0.0';


// List all NPM dependencies not loaded asynchrounously with SystemJS script loader.
let NPM_DEPENDENCIES = [
  { src: 'es6-shim/es6-shim.min.js',    inject: 'shims', dest: LIB_DEST },
  { src: 'reflect-metadata/Reflect.js', inject: 'shims', dest: LIB_DEST },
  { src: 'systemjs/dist/system.src.js', inject: 'shims', dest: LIB_DEST },

  { src: 'materialize-css/dist/css/materialize.min.css', inject: true, dest: CSS_DEST },

  { src: 'systemjs/dist/system-polyfills.js', dest: LIB_DEST },
  { src: 'node_modules/materialize-css/dist/font/**/*', dest: FONTS_DEST }
];

const NPM_DEPENDENCIES_DEV = [
  { src: 'angular2/bundles/angular2.dev.js', inject: 'libs', dest: LIB_DEST },
  { src: 'angular2/bundles/router.dev.js',   inject: 'libs', dest: LIB_DEST },
  { src: 'angular2/bundles/http.dev.js',     inject: 'libs', dest: LIB_DEST },
];

const NPM_DEPENDENCIES_PROD = [
  { src: 'angular2/bundles/angular2.min.js', inject: 'libs', dest: LIB_DEST },
  { src: 'angular2/bundles/router.min.js',   inject: 'libs', dest: LIB_DEST },
  { src: 'angular2/bundles/http.min.js',     inject: 'libs', dest: LIB_DEST },
];

// List all app dependencies not loaded asynchrounously with SystemJS script loader.
export const APP_ASSETS = [
  { src: `${ASSETS_SRC}/prism.min.js`,  inject: 'libs', dest: LIB_DEST },
  { src: `${ASSETS_SRC}/prism.css`, inject: true, dest: CSS_DEST },
  { src: `${ASSETS_SRC}/main.css`,  inject: true, dest: CSS_DEST }
];

NPM_DEPENDENCIES = NPM_DEPENDENCIES.concat('dev' === ENV ? NPM_DEPENDENCIES_DEV : NPM_DEPENDENCIES_PROD);
NPM_DEPENDENCIES
  .filter(d => !/\*/.test(d.src))
  .forEach(d => d.src = require.resolve(d.src));

export const DEPENDENCIES = NPM_DEPENDENCIES.concat(APP_ASSETS);



// ----------------
// SystemsJS Configuration.

const SYSTEM_CONFIG_DEV = {
  defaultJSExtensions: true,
  paths: {
    'bootstrap': `${APP_ROOT}bootstrap`,
    'lodash': `${APP_BASE}node_modules/lodash/index`,
    'rxjs/*': `${APP_BASE}node_modules/@reactivex/rxjs/dist/cjs/*`,
    '*': `${APP_BASE}node_modules/*`
  }
};

// This is important to keep clean module names as 'module name == module uri'.
export const SYSTEM_CONFIG_BUILDER = {
  defaultJSExtensions: true,
  paths: {
    '*': `${TMP_DIR}/*`,
    'angular2/*': 'node_modules/angular2/*',
    'lodash': 'node_modules/lodash/index',
    'urijs/*': 'node_modules/urijs/*',
    'rxjs/*': 'node_modules/@reactivex/dist/cjs'
  }
};

const SYSTEM_CONFIG_PROD = {
  defaultJSExtensions: true,
  bundles: {
    'bundles/app': ['bootstrap']
  }
};

export const SYSTEM_CONFIG = ENV === 'dev' ? SYSTEM_CONFIG_DEV : SYSTEM_CONFIG_PROD;

// --------------
// Private.
function appVersion(): number|string {
  var pkg = JSON.parse(readFileSync('package.json').toString());
  return pkg.version;
}

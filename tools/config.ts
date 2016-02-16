import {readFileSync} from 'fs';
import {argv} from 'yargs';
import {normalize, join} from 'path';
import * as chalk from 'chalk';

// --------------
// Configuration.

const ENVIRONMENTS = {
  DEVELOPMENT: 'dev',
  PRODUCTION: 'prod'
};

export const PORT                 = argv['port']        || 5555;
export const PROJECT_ROOT         = normalize(join(__dirname, '..'));
export const ENV                  = getEnvironment();
export const APP_ENV              = argv['app-env']     || ENV;
export const DEBUG                = argv['debug']       || false;
export const DOCS_PORT            = argv['docs-port']   || 4003;
export const APP_BASE             = argv['base']        || '/';

export const ENABLE_HOT_LOADING   = !!argv['hot-loader'];
export const HOT_LOADER_PORT      = 5578;

export const BOOTSTRAP_MODULE     = ENABLE_HOT_LOADING ? 'hot_loader_main' : 'main';

export const APP_TITLE            = 'My Angular2 App';

export const WP_DIR               = '../../Sites/wp-3dots-blog/wp-content/themes/angular2';
export const ASSETS_PATH_PREFIX   = ''; //'wp-content/themes/angular2';

export const APP_SRC              = 'src';
export const TEST_SRC             = 'src';
export const ASSETS_SRC           = `${APP_SRC}/assets`;

export const TOOLS_DIR            = 'tools';
export const TMP_DIR              = 'tmp';
export const TEST_SPEC_DEST       = 'dist/test/spec';
export const TEST_E2E_DEST        = 'dist/test/e2e';
export const DOCS_DEST            = 'docs';
export const APP_DEST             = `dist/${ENV}`;
export const BUNDLES_DEST         = `${APP_DEST}/bundles`;
export const CSS_DEST             = `${APP_DEST}/css`;
export const JS_DEST              = `${APP_DEST}/js`;
export const FONTS_DEST           = `${APP_DEST}/font`;
export const LIB_DEST             = `${APP_DEST}/lib`;
export const APP_ROOT             = ENV === 'dev' ? `${APP_BASE}${APP_DEST}/` : `${APP_BASE}`;
export const VERSION              = appVersion();

export const CSS_PROD_BUNDLE      = 'all.css';
export const JS_PROD_SHIMS_BUNDLE = 'shims.js';
export const JS_PROD_APP_BUNDLE   = 'app.js';

export const VERSION_NPM          = '2.14.2';
export const VERSION_NODE         = '4.0.0';

if (ENABLE_HOT_LOADING) {
  console.log(chalk.bgRed.white.bold('The hot loader is temporary disabled.'));
  process.exit(0);
}

interface InjectableDependency {
  src: string;
  inject?: string | boolean;
  dest?: string;
}

// Declare NPM dependencies (Note that globs should not be injected).
export const DEV_NPM_DEPENDENCIES: InjectableDependency[] = normalizeDependencies([
  { src: 'systemjs/dist/system-polyfills.src.js', inject: 'shims', dest: JS_DEST },
  { src: 'reflect-metadata/Reflect.js', inject: 'shims', dest: JS_DEST },
  { src: 'es6-shim/es6-shim.js', inject: 'shims', dest: JS_DEST },
  { src: 'systemjs/dist/system.src.js', inject: 'shims', dest: JS_DEST },
  { src: 'angular2/bundles/angular2-polyfills.js', inject: 'shims', dest: JS_DEST },
  { src: 'rxjs/bundles/Rx.js', inject: 'libs', dest: JS_DEST },
  { src: 'angular2/bundles/angular2.js', inject: 'libs', dest: JS_DEST },
  { src: 'angular2/bundles/router.js', inject: 'libs', dest: JS_DEST },
  { src: 'angular2/bundles/http.js', inject: 'libs', dest: JS_DEST },
  { src: 'materialize-css/dist/css/materialize.min.css', inject: true, dest: CSS_DEST },
  { src: 'node_modules/materialize-css/dist/font/**/*', dest: FONTS_DEST }
]);

export const PROD_NPM_DEPENDENCIES: InjectableDependency[] = normalizeDependencies([
  { src: 'systemjs/dist/system-polyfills.src.js', inject: 'shims' },
  { src: 'reflect-metadata/Reflect.js', inject: 'shims' },
  { src: 'es6-shim/es6-shim.min.js', inject: 'shims' },
  { src: 'systemjs/dist/system.js', inject: 'shims' },
  { src: 'angular2/bundles/angular2-polyfills.min.js', inject: 'libs' },
  { src: 'materialize-css/dist/css/materialize.min.css', inject: true, dest: CSS_DEST },
  { src: 'node_modules/materialize-css/dist/font/**/*', dest: FONTS_DEST }
]);

// Declare local files that needs to be injected
export const APP_ASSETS: InjectableDependency[] = [
  { src: `${ASSETS_SRC}/prism.min.js`,  inject: 'libs', dest: LIB_DEST },
  { src: `${ASSETS_SRC}/prism.css`, inject: true, dest: CSS_DEST },
  { src: `${ASSETS_SRC}/main.css`, inject: true, dest: CSS_DEST }
];


export const DEV_DEPENDENCIES = DEV_NPM_DEPENDENCIES.concat(APP_ASSETS);
export const PROD_DEPENDENCIES = PROD_NPM_DEPENDENCIES.concat(APP_ASSETS);


// ----------------
// SystemsJS Configuration.
const SYSTEM_CONFIG_DEV = {
  defaultJSExtensions: true,
  paths: {
    [BOOTSTRAP_MODULE]: `${APP_BASE}${BOOTSTRAP_MODULE}`,
    'config': `${APP_ROOT}config`,
    'angular2/*': `${APP_BASE}angular2/*`,
    'rxjs/*': `${APP_BASE}rxjs/*`,
    'lodash': `${APP_BASE}node_modules/lodash/lodash`,
    '*': `${APP_BASE}node_modules/*`
  },
  packages: {
    angular2: { defaultExtension: false },
    rxjs: { defaultExtension: false }
  }
};

export const SYSTEM_CONFIG = SYSTEM_CONFIG_DEV;

export const SYSTEM_BUILDER_CONFIG = {
  defaultJSExtensions: true,
  paths: {
    'tmp/*': 'tmp/*',
    '*': 'node_modules/*'
  }
};

// --------------
// Private.

function normalizeDependencies(deps: InjectableDependency[]) {
  deps
    .filter((d:InjectableDependency) => !/\*/.test(d.src)) // Skip globs
    .forEach((d:InjectableDependency) => d.src = require.resolve(d.src));
  return deps;
}

function appVersion(): number|string {
  var pkg = JSON.parse(readFileSync('package.json').toString());
  return pkg.version;
}

function getEnvironment() {
  let base:string[] = argv['_'];
  let prodKeyword = !!base.filter(o => o.indexOf(ENVIRONMENTS.PRODUCTION) >= 0).pop();
  if (base && prodKeyword || argv['env'] === ENVIRONMENTS.PRODUCTION) {
    return ENVIRONMENTS.PRODUCTION;
  } else {
    return ENVIRONMENTS.DEVELOPMENT;
  }
}


// import {readFileSync} from 'fs';
// import {argv} from 'yargs';
//
//
// // --------------
// // Configuration.
// export const ENV                  = argv['env']         || 'dev';
// export const APP_ENV              = argv['app-env']     || ENV;
// export const DEST                 = argv['dest']        || ENV;
// export const DEBUG                = argv['debug']       || false;
// export const PORT                 = argv['port']        || 5555;
// export const LIVE_RELOAD_PORT     = argv['reload-port'] || 4002;
// export const DOCS_PORT            = argv['docs-port']   || 4003;
// export const APP_BASE             = argv['base']        || '/';
//
// export const APP_TITLE            = '3dots blog' + ('dev' === APP_ENV ? ' DEV' : '');
//
// export const WP_DIR               = '../../Sites/wp-3dots-blog/wp-content/themes/angular2';
// export const ASSETS_PATH_PREFIX   = 'wp-content/themes/angular2';
//
// export const APP_SRC              = 'src';
// export const TEST_SRC             = 'src';
// export const ASSETS_SRC           = `${APP_SRC}/assets`;
//
// export const TOOLS_DIR            = 'tools';
// export const TMP_DIR              = 'tmp';
// export const TEST_DEST            = 'test';
// export const DOCS_DEST            = 'docs';
// export const APP_DEST             = `dist/${DEST}`;
// export const ASSETS_DEST          = `${APP_DEST}/assets`;
// export const BUNDLES_DEST         = `${APP_DEST}/bundles`;
// export const CSS_DEST             = `${APP_DEST}/css`;
// export const FONTS_DEST           = `${APP_DEST}/font`;
// export const LIB_DEST             = `${APP_DEST}/lib`;
// export const APP_ROOT             = ENV === 'dev' ? `${APP_BASE}${APP_DEST}/` : `${APP_BASE}`;
// export const VERSION              = appVersion();
//
// export const VERSION_NPM          = '3.0.0';
// export const VERSION_NODE         = '4.0.0';
//
//
// // List all NPM dependencies not loaded asynchrounously with SystemJS script loader.
// const NPM_DEPENDENCIES_COMMON = [
//   { src: 'es6-shim/es6-shim.min.js',    inject: 'shims', dest: LIB_DEST },
//   { src: 'es6-shim/es6-shim.map', dest: LIB_DEST },
//   { src: 'reflect-metadata/Reflect.js', inject: 'shims', dest: LIB_DEST },
//   { src: 'systemjs/dist/system.src.js', inject: 'shims', dest: LIB_DEST },
//
//   { src: 'materialize-css/dist/css/materialize.min.css', inject: true, dest: CSS_DEST },
//
//   { src: 'systemjs/dist/system-polyfills.js', dest: LIB_DEST },
//   { src: 'node_modules/materialize-css/dist/font/**/*', dest: FONTS_DEST }
// ];
//
// const NPM_DEPENDENCIES_DEV = [
//   { src: 'angular2/bundles/angular2-polyfills.js', inject: 'shims', dest: LIB_DEST },
//   { src: 'rxjs/bundles/Rx.js',           inject: 'libs', dest: LIB_DEST },
//   { src: 'angular2/bundles/angular2.dev.js', inject: 'libs', dest: LIB_DEST },
//   { src: 'angular2/bundles/router.dev.js',   inject: 'libs', dest: LIB_DEST },
//   { src: 'angular2/bundles/http.dev.js',     inject: 'libs', dest: LIB_DEST },
// ];
//
// const NPM_DEPENDENCIES_PROD = [
//   { src: 'angular2/bundles/angular2-polyfills.min.js', inject: 'shims', dest: LIB_DEST },
//   { src: 'rxjs/bundles/Rx.min.js',           inject: 'libs', dest: LIB_DEST },
//   { src: 'angular2/bundles/angular2.min.js', inject: 'libs', dest: LIB_DEST },
//   { src: 'angular2/bundles/router.min.js',   inject: 'libs', dest: LIB_DEST },
//   { src: 'angular2/bundles/http.min.js',     inject: 'libs', dest: LIB_DEST },
// ];
//
//
// const NPM_DEPENDENCIES = NPM_DEPENDENCIES_COMMON.concat(
// 'dev' === ENV ? NPM_DEPENDENCIES_DEV
//                 : NPM_DEPENDENCIES_PROD);
//
// NPM_DEPENDENCIES
//   .filter(d => !/\*/.test(d.src))
//   .forEach(d => d.src = require.resolve(d.src));
//
//
// // List all app dependencies not loaded asynchrounously with SystemJS script loader.
// export const APP_ASSETS = [
//   { src: `${ASSETS_SRC}/prism.min.js`,  inject: 'libs', dest: LIB_DEST },
//   { src: `${ASSETS_SRC}/prism.css`, inject: true, dest: CSS_DEST },
//   { src: `${ASSETS_SRC}/main.css`,  inject: true, dest: CSS_DEST }
// ];
//
// export const DEPENDENCIES = NPM_DEPENDENCIES.concat(APP_ASSETS);
//
//
//
// // ----------------
// // NG2 App Configuration (Injected into /{APP_SRC}/config.ts).
//
// const APP_CONFIG_COMMON = { // Dev & Common.
//   WP_API_ROOT: 'https://3dots.io/wp-blog-test/wp-json',
//   WP_API_NAMESPACE: '/wp/v2',
//   DISQUS_SRC: 'https://3dotsblogtest.disqus.com/embed.js',
//   GA_ID: 'UA-71460906-1'
// };
// const APP_CONFIG_PROD = {
//   WP_API_ROOT: 'https://3dots.io/wp-blog/wp-json',
//   DISQUS_SRC: 'https://3dots-blog.disqus.com/embed.js',
//   GA_ID: 'UA-71414560-1'
// };
//
// export const APP_CONFIG = Object.assign({}, APP_CONFIG_COMMON, ('prod' === APP_ENV ? APP_CONFIG_PROD : {}));
//
// // ----------------
// // SystemsJS Configuration.
//
// const SYSTEM_CONFIG_DEV = {
//   defaultJSExtensions: true,
//   paths: {
//     'bootstrap': `${APP_ROOT}bootstrap`,
//     'config': `${APP_ROOT}config`,
//     'lodash': `${APP_BASE}node_modules/lodash/index`,
//     '*': `${APP_BASE}node_modules/*`
//   }
// };
//
// // This is important to keep clean module names as 'module name == module uri'.
// export const SYSTEM_CONFIG_BUILDER = {
//   defaultJSExtensions: true,
//   paths: {
//     '*': `${TMP_DIR}/*`,
//     'angular2/*': 'node_modules/angular2/*',
//     'rxjs/*': 'node_modules/rxjs/*',
//     'lodash': 'node_modules/lodash/index',
//     'urijs/*': 'node_modules/urijs/*'
//   }
// };
//
// const SYSTEM_CONFIG_PROD = {
//   defaultJSExtensions: true,
//   paths: {
//     'bundles/*': `${APP_ROOT}${ASSETS_PATH_PREFIX}/bundles/*`
//   },
//   bundles: {
//     'bundles/app': ['bootstrap']
//   }
// };
//
// export const SYSTEM_CONFIG = ENV === 'dev' ? SYSTEM_CONFIG_DEV : SYSTEM_CONFIG_PROD;
//
// // --------------
// // Private.
// function appVersion(): number|string {
//   var pkg = JSON.parse(readFileSync('package.json').toString());
//   return pkg.version;
// }

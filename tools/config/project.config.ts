import {join} from 'path';
import {argv} from 'yargs';
import {SeedConfig} from './seed.config';
import {InjectableDependency} from './seed.config.interface';


export class ProjectConfig extends SeedConfig {
  APP_CONFIG           = require('./app.config');
  DEST                 = argv['dest']        || this.ENV;
  APP_ENV              = argv['app-env']     || this.ENV;
  APP_DEST             = `dist/${this.DEST}`;
  APP_TITLE            = this.ENV === 'dev' ? '3dots.io blog [TEST]' : '3dots.io blog';
  ASSETS_PATH_PREFIX   = this.ENV === 'dev' ? '' : `${this.APP_BASE}wp-content/themes/angular2`;
  FONTS_DEST           = `${this.APP_DEST}/font`;
  PROJECT_TASKS_DIR    = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
  WP_DIR               = '../../Sites/wp-3dots-blog/wp-content/themes/angular2';

  DEV_NPM_DEPENDENCIES: InjectableDependency[] = [
    ...this.DEV_NPM_DEPENDENCIES,
    ...this.normalizeDependencies([
      { src: 'materialize-css/dist/css/materialize.min.css', inject: true }
    ])
  ];

  PROD_NPM_DEPENDENCIES: InjectableDependency[] = [
    ...this.PROD_NPM_DEPENDENCIES,
    ...this.normalizeDependencies([
      { src: 'materialize-css/dist/css/materialize.min.css', inject: true }
    ])
  ];

  APP_ASSETS: InjectableDependency[] = [
    { src: `${this.ASSETS_SRC}/prism.min.js`,  inject: 'libs' },
    { src: `${this.ASSETS_SRC}/prism.css`, inject: true },
    ...this.APP_ASSETS
  ];

  DEV_DEPENDENCIES = this.DEV_NPM_DEPENDENCIES.concat(this.APP_ASSETS);
  PROD_DEPENDENCIES = this.PROD_NPM_DEPENDENCIES.concat(this.APP_ASSETS);

  FONTS_SRC = [
    'node_modules/materialize-css/dist/font/**/*'
  ];

  SYSTEM_CONFIG_DEV: any = {
    defaultJSExtensions: true,
    paths: {
      [this.BOOTSTRAP_MODULE]: `${this.APP_BASE}${this.BOOTSTRAP_MODULE}`,
      '*': `${this.APP_BASE}node_modules/*`
    },
    packages: {
      angular2: { defaultExtension: false },
      rxjs: { defaultExtension: false },
      moment: { main: 'moment.js' },
      lodash: { main: 'lodash.js' }
    }
  };

  SYSTEM_CONFIG = this.SYSTEM_CONFIG_DEV;

  SYSTEM_BUILDER_CONFIG = {
    defaultJSExtensions: true,
    paths: {
      [`${this.TMP_DIR}/*`]: `${this.TMP_DIR}/*`,
      '*': 'node_modules/*'
    },
    packages: {
      angular2: { defaultExtension: false },
      rxjs: { defaultExtension: false },
      moment: { main: 'moment.js' },
      lodash: { main: 'lodash.js' }
    }
  };
}

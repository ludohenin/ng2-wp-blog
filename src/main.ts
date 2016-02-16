import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import {AppCmp} from './components/app/app';

bootstrap(AppCmp, [
  provide(APP_BASE_HREF, { useValue: '<%= APP_ROOT %>' } ),
  ROUTER_PROVIDERS
]);

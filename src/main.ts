import {bootstrap} from 'angular2/platform/browser';
import {provide, enableProdMode, PLATFORM_PIPES} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import {AppComponent} from './app/app';
import {SHARED_PIPES_PROVIDERS} from './shared/pipes';

if ('<%= ENV %>' === 'prod') { enableProdMode(); }

bootstrap(AppComponent, [
  provide(APP_BASE_HREF, { useValue: '<%= APP_ROOT %>' } ),
  provide(PLATFORM_PIPES, { useValue: SHARED_PIPES_PROVIDERS, multi: true }),
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS
]);

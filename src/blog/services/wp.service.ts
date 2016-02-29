import {XHR_SERVICE_PROVIDERS} from './wp/xhr';
import {WP_RESOURCE_PROVIDERS} from './wp/wp_resource';
import {ROOT_PROVIDERS} from './wp/root';
import {POSTS_PROVIDERS} from './wp/posts';
import {USERS_PROVIDERS} from './wp/users';
import {TERMS_PROVIDERS} from './wp/terms';
import {WpService} from './wp/wp';

export * from './wp/xhr';
export * from './wp/wp_resource';
export * from './wp/root';
export * from './wp/posts';
export * from './wp/users';
export * from './wp/terms';
export * from './wp/wp';

export const WP_SERVICE_PROVIDERS = [
  XHR_SERVICE_PROVIDERS,
  WP_RESOURCE_PROVIDERS,
  ROOT_PROVIDERS,
  POSTS_PROVIDERS,
  USERS_PROVIDERS,
  TERMS_PROVIDERS,
  WpService,
];

import {Injectable} from 'angular2/angular2';

export * from './xhr';
export * from './wp_resource';
export * from './root';
export * from './posts';
export * from './users';
export * from './terms';

import {XHR_SERVICE_PROVIDERS} from './xhr';
import {WP_RESOURCE_PROVIDERS} from './wp_resource';
import {ROOT_PROVIDERS, RootModel} from './root';
import {POSTS_PROVIDERS, PostsCollection} from './posts';
import {USERS_PROVIDERS, UsersCollection} from './users';
import {TERMS_PROVIDERS, TermsCollection} from './terms';


@Injectable()
export class WpService {
  namespace: string;
  constructor(public root: RootModel,
              public posts: PostsCollection,
              public users: UsersCollection,
              public terms: TermsCollection) {
  }
}

export const WP_SERVICE_PROVIDERS = [
  XHR_SERVICE_PROVIDERS,
  WP_RESOURCE_PROVIDERS,
  ROOT_PROVIDERS,
  POSTS_PROVIDERS,
  USERS_PROVIDERS,
  TERMS_PROVIDERS,
  WpService,
];

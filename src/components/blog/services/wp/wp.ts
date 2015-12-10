import {Injectable} from 'angular2/angular2';

export * from './xhr';
export * from './wp_collection';
export * from './root';
export * from './posts';

import {POSTS_PROVIDERS, PostsCollection} from './posts';
import {ROOT_PROVIDERS, RootModel} from './root';
import {WP_COLLECTION_PROVIDERS} from './wp_collection';
import {XHR_SERVICE_PROVIDERS} from './xhr';

@Injectable()
export class WpService {
  namespace: string;
  constructor(public root: RootModel,
              public posts: PostsCollection) {
  }
}

export const WP_SERVICE_PROVIDERS = [
  XHR_SERVICE_PROVIDERS,
  WP_COLLECTION_PROVIDERS,
  ROOT_PROVIDERS,
  POSTS_PROVIDERS,
  WpService,
];

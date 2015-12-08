import {Injectable} from 'angular2/angular2';

export * from './wp_api';
export * from './models/posts';

import {WpApiService} from './wp_api';
import {POSTS_PROVIDERS, PostsCollection} from './models/posts';

@Injectable()
export class WpService {
  namespace: string;
  constructor(public posts: PostsCollection,
              private _api: WpApiService) {
  }
  get root() {
    return {
      get: () => this._api.root()
    };
  }
}

export const WP_SERVICE_PROVIDERS = [
  WpApiService,
  POSTS_PROVIDERS,
  WpService
];

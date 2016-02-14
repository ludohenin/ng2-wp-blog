import {Component, provide, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {NavbarCmp} from './components/navbar/navbar';
import {PostCmp} from './components/post/post';
import {PostsCmp} from './components/posts/posts';

import {
  SERVICE_PROVIDERS,
  ApiService,
  WpService,
  WpResourceConfig,
  RootModel,
  WpModelFactory,
  makeModelFactory
} from './services/services';
import {BLOG_DIRECTIVES} from './directives/directives';

import * as CONFIG from 'config';

const WpResourceCustomConfig = {
  urlRoot: CONFIG.WP_API_ROOT,
  namespace: CONFIG.WP_API_NAMESPACE,
  request: {
    search: {
      per_page: 5,
      _embed: 1
    }
  }
};

const WpModelFactoryDef = {
  useFactory: makeModelFactory(),
  deps: [ApiService, WpResourceConfig]
};

// ----------------
// Configuration.
// NOTE: Order is important here.
export const BLOG_PROVIDERS = [
  HTTP_PROVIDERS,
  SERVICE_PROVIDERS,
  provide(WpResourceConfig, { useValue: WpResourceCustomConfig}),
  provide(WpModelFactory, WpModelFactoryDef)
];

@Component({
  selector: 'blog',
  viewProviders: [BLOG_PROVIDERS],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, BLOG_DIRECTIVES, NavbarCmp]
})
@RouteConfig([
  { path: '/', component: PostsCmp, as: 'PostsHome' },
  { path: '/posts/:id', component: PostCmp, as: 'PostPage' },
  { path: '/page/:id', component: PostsCmp, as: 'PostsPage' }
])
export class BlogCmp {
  site: RootModel;
  constructor(public wp: WpService) {
    this.site = this.wp.root;
    this.site.get();
    this.wp.posts.init();
    this.wp.users.init();
    this.wp.terms.categories.init();
    this.wp.terms.tags.init();
    console.log(this);
  }
}

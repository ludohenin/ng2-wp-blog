import {Component, provide, ViewEncapsulation} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {NavbarCmp} from './components/navbar/navbar';
import {PostCmp} from './components/post/post';
import {PostsCmp} from './components/posts/posts';

import {SERVICE_PROVIDERS, ApiService, WpService, WpResourceConfig, PostModel,
   RootModel, WpModelFactory, makeModelFactory} from './services/services';
import {BLOG_DIRECTIVES} from './directives/directives';

import * as CONFIG from 'config';

// ----------------
// Configuration.
// NOTE: Order is important here.
export const BLOG_PROVIDERS = [
  HTTP_PROVIDERS,
  SERVICE_PROVIDERS,
  provide(WpResourceConfig, { useValue: {
    urlRoot: CONFIG.WP_API_ROOT,
    namespace: CONFIG.WP_API_NAMESPACE
    // request: {
    //   search: {
    //     per_page: 10
    //   }
    // }
  }}),
  provide(WpModelFactory, {
    useFactory: makeModelFactory(PostModel),
    deps: [ApiService, WpResourceConfig]
  })
];

@Component({
  selector: 'blog',
  viewProviders: [BLOG_PROVIDERS],
  templateUrl: './components/blog/blog.html',
  styleUrls: ['./components/blog/blog.css'],
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

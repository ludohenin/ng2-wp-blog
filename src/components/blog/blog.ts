import {Component, provide, ViewEncapsulation} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {merge} from 'lodash';

import {NavbarCmp} from './components/navbar/navbar';
import {PostCmp} from './components/post/post';
import {PostsCmp} from './components/posts/posts';

import {SERVICE_PROVIDERS, WpService, WpResourceConfig, WpCollection, PostModel, RootModel} from './services/services';
import {BLOG_DIRECTIVES} from './directives/directives';

import * as CONFIG from 'config';

// NOTE: Order is important here.
export const BLOG_PROVIDERS = [
  HTTP_PROVIDERS,
  SERVICE_PROVIDERS,
  provide(WpResourceConfig, { useValue: {
    urlRoot: CONFIG.WP_API_ROOT,
    namespace: CONFIG.WP_API_NAMESPACE
  }}),
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
  { path: '/', component: PostsCmp, as: 'PostsCmp' },
  { path: '/posts/:id/', component: PostCmp, as: 'PostCmp' }
])
export class BlogCmp {
  site: RootModel;
  posts: PostModel[];
  disqusSrc: string;
  constructor(public wp: WpService) {
    this.site = this.wp.root;
    this.site.get().subscribe(res => merge(this.site, res));
    // TODO: Move initialization to collection instantiation ?
    this.wp.posts.initialize().subscribe(res => this.posts);
  }
}

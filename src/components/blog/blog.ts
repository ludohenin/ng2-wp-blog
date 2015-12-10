import {Component, ViewEncapsulation} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {NavbarCmp} from './components/navbar/navbar';
import {PostCmp} from './components/post/post';
import {PostsCmp} from './components/posts/posts';

import {SERVICE_PROVIDERS, WpService, PostModel, RootModel} from './services/services';
import {BLOG_DIRECTIVES} from './directives/directives';

import {BLOG_CONFIG_PROVIDERS, Config} from './config';

// TODO: Order is important here.
export const BLOG_PROVIDERS = [
  HTTP_PROVIDERS,
  SERVICE_PROVIDERS,
  BLOG_CONFIG_PROVIDERS
];

@Component({
  selector: 'blog',
  providers: [BLOG_PROVIDERS],
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
  constructor(public wp: WpService, public config: Config, root: RootModel) {
    this.site = root;
    this.site.get();
    this.wp.posts.initialize().subscribe(res => this.posts);
  }
}

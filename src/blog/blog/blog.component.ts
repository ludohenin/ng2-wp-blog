import {Component, provide, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {NavbarComponent} from '../navbar/navbar.component';
import {PostComponent} from '../post/post.component';
import {PostsComponent} from '../posts/posts.component';
import {PreloaderComponent} from '../preloader/preloader.component';

import {
  WP_SERVICE_PROVIDERS,
  ApiService,
  WpService,
  WpResourceConfig,
  RootModel,
  WpModelFactory,
  makeModelFactory
} from '../services/wp.service';
import {BLOG_DIRECTIVES} from '../directives/blog.directives';

import {APP_CONFIG} from '../../config';

const WpResourceCustomConfig = {
  urlRoot: APP_CONFIG.WP_API_ROOT,
  namespace: APP_CONFIG.WP_API_NAMESPACE,
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
  WP_SERVICE_PROVIDERS,
  provide(WpResourceConfig, { useValue: WpResourceCustomConfig}),
  provide(WpModelFactory, WpModelFactoryDef)
];

@Component({
  selector: 'blog',
  viewProviders: [BLOG_PROVIDERS],
  moduleId: module.id,
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, BLOG_DIRECTIVES, NavbarComponent, PreloaderComponent]
})
@RouteConfig([
  { path: '/', component: PostsComponent, as: 'PostsHome' },
  { path: '/posts/:id', component: PostComponent, as: 'PostPage' },
  { path: '/page/:id', component: PostsComponent, as: 'PostsPage' }
])
export class BlogComponent {
  site: RootModel;
  activatePreloader: boolean = false;
  constructor(public wp: WpService) {
    this.site = this.wp.root;
    this.site.get();
    this.wp.posts.init();
    this.wp.users.init();

    this.wp.posts.loading.subscribe(val => {
      this.activatePreloader = val;
    });

    // this.wp.terms.categories.init();
    // this.wp.terms.tags.init();
  }
}

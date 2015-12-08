import {Component, ViewEncapsulation} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {NavbarCmp} from './components/navbar/navbar';
import {PostCmp} from './components/post/post';
import {PostsCmp} from './components/posts/posts';

import {SERVICE_PROVIDERS, WpService, PostModel} from './services/services';
import {BLOG_DIRECTIVES} from './directives/directives';


@Component({
  selector: 'blog',
  viewProviders: [HTTP_PROVIDERS, SERVICE_PROVIDERS],
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
  site = {name: ''};
  posts: PostModel[];
  constructor(public wp: WpService, public router: Router) {
    this.wp.root.get().subscribe(res => this.site = res);
    this.wp.posts.initialize().subscribe(res => this.posts);
    console.log(router);
    router.subscribe((r => console.log(r)));
  }
}

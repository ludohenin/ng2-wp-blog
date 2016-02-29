import {Component, ViewEncapsulation} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';

import {WpService, PostModel} from '../services/wp.service';
import {BLOG_DIRECTIVES} from '../directives/blog.directives';
import {PaginationComponent} from '../pagination/pagination.component';

@Component({
  selector: 'posts',
  viewProviders: [],
  moduleId: module.id,
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, BLOG_DIRECTIVES, PaginationComponent]
})
export class PostsComponent {
  posts: PostModel[];
  activePage: number;
  constructor(public wp: WpService, routeParams: RouteParams) {
    let id = routeParams.get('id');
    this.activePage = (id ? parseInt(id) : 0) || 1;
    this.loadPage(this.activePage);
  }
  loadPage(id: number): void {
    this.activePage = id;
    this.wp.posts
      .getPage(id)
      .subscribe(res => {
        this.posts = res.data;
      });
  }
}

import {Component, ViewEncapsulation} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';

import {WpService, PostModel} from '../../services/services';
import {BLOG_DIRECTIVES} from '../../directives/directives';
import {PaginationCmp} from '../pagination/pagination';

@Component({
  selector: 'posts',
  viewProviders: [],
  templateUrl: './posts.html',
  styleUrls: ['./posts.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, BLOG_DIRECTIVES, PaginationCmp]
})
export class PostsCmp {
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

import {Component, ElementRef, ViewEncapsulation} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';

import {WpService, PostModel} from '../../services/services';
import {BLOG_DIRECTIVES} from '../../directives/directives';
import {DisqusCmp} from '../disqus/disqus';

@Component({
  selector: 'post',
  viewProviders: [],
  moduleId: module.id,
  templateUrl: './post.html',
  styleUrls: ['./post.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, BLOG_DIRECTIVES, DisqusCmp]
})
export class PostCmp {
  post: PostModel;
  constructor(public routeParams: RouteParams,
              public wp: WpService,
              private _el: ElementRef) {
    let id = parseInt(this.routeParams.params['id']);
    this.wp.posts.getOneById(id).subscribe(post => this.post = post);
  }
  ngAfterViewChecked() {
    (<any>window).Prism.highlightAll();
  }
}

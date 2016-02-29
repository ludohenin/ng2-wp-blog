import {Component, ElementRef, AfterViewChecked, OnDestroy, ViewEncapsulation} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import {Subscription} from 'rxjs';

import {WpService, PostModel} from '../services/wp.service';
import {BLOG_DIRECTIVES} from '../directives/blog.directives';
import {DisqusComponent} from '../disqus/disqus.component';

@Component({
  selector: 'post',
  viewProviders: [],
  moduleId: module.id,
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, BLOG_DIRECTIVES, DisqusComponent]
})
export class PostComponent implements AfterViewChecked, OnDestroy {
  post: PostModel;
  subscription: Subscription<PostModel>;
  constructor(public routeParams: RouteParams,
              public wp: WpService,
              private _el: ElementRef) {
    let id = parseInt(this.routeParams.params['id']);
    this.subscription = this.wp.posts.getOneById(id).subscribe(post => this.post = post);
    console.log(this.subscription);
  }
  ngAfterViewChecked() {
    (<any>window).Prism.highlightAll();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

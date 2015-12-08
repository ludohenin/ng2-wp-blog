import {Component, ViewEncapsulation} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {WpService, PostModel} from '../../services/services';

@Component({
  selector: 'posts',
  viewProviders: [],
  templateUrl: './components/blog/components/posts/posts.html',
  styleUrls: ['./components/blog/components/posts/posts.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})
export class PostsCmp {
  posts: PostModel[];
  constructor(public wp: WpService) {
    this.wp.posts.getPage().subscribe(post => this.posts = post);
  }
}

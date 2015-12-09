import {EventEmitter, Injectable} from 'angular2/angular2';
import {ApiService} from './xhr';
import {WpCollection, WpModel} from './wp_collection';

export class PostModel extends WpModel {
  id: number;
  date: Date;
  date_gmt: Date;
  guid: any;
  link: string;
  modified: Date;
  modified_gmt: Date;
  password: string;
  slug: string;
  status: string;
  type: string;
  title: any;
  content: any;
  author: any;
  excerpt: any;
  featured_image: any;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  format: string;
  _links: any;
  _embedded: any;
}


@Injectable()
export class PostsCollection extends WpCollection<PostModel> {
  constructor(public api: ApiService) {
    super(api);
    this.urlRoot = 'https://3dots.io/wp-blog/wp-json/wp/v2';
    this.url = '/posts';
    this.modelProviders = [PostModel];
    this.modelToken = PostModel;
  }
  initialize(): EventEmitter<PostModel[]> {
    let event = new EventEmitter();
    // this.getPage(1).subscribe(res => {
    //   // TODO: move header names to config.
    //   this.total = parseInt(this.response.headers.get('x-wp-total'));
    //   this.total_pages = parseInt(this.response.headers.get('x-wp-totalpages'));
    //   this.initialized = true;
    //   event.next(res);
    // });
    return event;
  }
}

export const POSTS_PROVIDERS = [
  PostsCollection,
  PostModel
];

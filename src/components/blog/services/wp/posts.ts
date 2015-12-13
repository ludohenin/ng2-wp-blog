import {Injectable} from 'angular2/angular2';
import {isArray} from 'lodash';
import {ApiService} from './xhr';
import {WpCollection, WpModel, WpResourceConfig, WpModelFactory} from './wp_resource';


@Injectable()
export class PostModel extends WpModel {
  url: string = '/posts';
  _tags: any[];

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
  get tags() {
    let tagTaxonomy = 'post_tag';
    let tags: any[];
    this._embedded['http://api.w.org/term'].forEach((terms => {
      if (isArray(terms)) {
        terms.forEach(term => {
          if (term.taxonomy === tagTaxonomy) {
            tags = tags || [];
            tags.push(term);
          }
        });
      }
    }));
    return tags;
  }
}

@Injectable()
export class PostsCollection extends WpCollection<PostModel> {
  modelToken = PostModel;
  url = '/posts';
  constructor(public api: ApiService, public config: WpResourceConfig, modelFactory: WpModelFactory) {
    super(api, config, modelFactory);
  }
}

export const POSTS_PROVIDERS = [
  PostsCollection,
  PostModel
];

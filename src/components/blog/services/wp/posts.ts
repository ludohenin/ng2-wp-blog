import {Injectable} from 'angular2/core';
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
  // TODO: Improve to support w/o _embedded and probably move out
  get tags() {
    if (this._tags) { return this._tags; }

    let tagTaxonomy = this.config.taxonomy.tag;
    this._embedded['http://api.w.org/term'].forEach(terms => {
      if (isArray(terms)) {
        terms.forEach(term => {
          if (term.taxonomy === tagTaxonomy) {
            this._tags = this._tags || [];
            this.tags.push(term);
          }
        });
      }
    });
    return this._tags;
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

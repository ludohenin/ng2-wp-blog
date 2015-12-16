import {Injectable} from 'angular2/core';
import {ApiService} from './xhr';
import {WpCollection, WpModel, WpResourceConfig, WpModelFactory} from './wp_resource';

@Injectable()
export class TagModel extends WpModel {
  _links: any;
  count: number;
  description: string;
  id: number;
  link: string;
  name: string;
  slug: string;
  taxonomie: string;
}

@Injectable()
export class TagsCollection extends WpCollection<TagModel> {
  modelToken = TagModel;
  url = '/terms/tag';
  constructor(public api: ApiService, public config: WpResourceConfig, modelFactory: WpModelFactory) {
    super(api, config, modelFactory);
  }
}

@Injectable()
export class CategoryModel extends WpModel {
  _links: any;
  count: number;
  description: string;
  id: number;
  link: string;
  name: string;
  parent: number;
  slug: string;
  taxonomie: string;
}

@Injectable()
export class CategoriesCollection extends WpCollection<CategoryModel> {
  modelToken = CategoryModel;
  url = '/terms/category';
  constructor(public api: ApiService, public config: WpResourceConfig, modelFactory: WpModelFactory) {
    super(api, config, modelFactory);
  }
}

@Injectable()
export class TermsCollection {
  constructor(public categories: CategoriesCollection,
              public tags: TagsCollection) {
  }
}


export const TERMS_PROVIDERS = [
  TermsCollection,
  TagsCollection,
  TagModel,
  CategoriesCollection,
  CategoryModel
];

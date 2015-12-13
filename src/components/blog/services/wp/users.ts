import {Injectable} from 'angular2/angular2';
import {ApiService} from './xhr';
import {WpCollection, WpModel, WpResourceConfig, WpModelFactory} from './wp_resource';

@Injectable()
export class UserModel extends WpModel {
  _links: any;
  avatar_urls: any;
  description: string;
  id: number;
  link: string;
  name: string;
  slug: string;
  url: string;
  constructor(public api: ApiService, public config: WpResourceConfig) {
    super(api, config);
  }
}

@Injectable()
export class UsersCollection extends WpCollection<UserModel> {
  modelToken = UserModel;
  url = '/users';
  constructor(public api: ApiService, public config: WpResourceConfig, public modelFactory: WpModelFactory) {
    super(api, config, modelFactory);
  }
}


export const USERS_PROVIDERS = [
  UsersCollection,
  UserModel
];

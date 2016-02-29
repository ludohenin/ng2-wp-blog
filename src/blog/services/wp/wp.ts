import {Injectable} from 'angular2/core';

import {RootModel} from './root';
import {PostsCollection} from './posts';
import {UsersCollection} from './users';
import {TermsCollection} from './terms';


@Injectable()
export class WpService {
  namespace: string;
  constructor(public root: RootModel,
              public posts: PostsCollection,
              public users: UsersCollection,
              public terms: TermsCollection) {
  }
}

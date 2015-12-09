import {EventEmitter, Observable, Injectable} from 'angular2/angular2';
import {Response} from 'angular2/http';
import {merge} from 'lodash';
import {ApiService} from './xhr';

@Injectable()
export class RootModel {
  _links: any;
  authentication: any[];
  description: string;
  name: string;
  namespaces: string[];
  routes: any;
  url: string;
  constructor(public api: ApiService) {
  }
  get(): RootModel {
    let request = this.api.request({
      url: 'https://3dots.io/wp-blog/wp-json'
    }, { cache: true });

    request.subscribe((res: Response) => merge(this, res.json()));

    return this;
  }
}


export const ROOT_PROVIDERS = [
  RootModel
];

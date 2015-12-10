import {EventEmitter, Injectable} from 'angular2/angular2';
import {merge} from 'lodash';
import {ApiService} from './xhr';
import {WpModel, WpResourceConfig} from './wp_resource';

@Injectable()
export class RootModel extends WpModel {
  _links: any;
  authentication: any[];
  description: string;
  name: string;
  namespaces: string[];
  routes: any;
  constructor(public api: ApiService, public config: WpResourceConfig) {
    super(api, config);
  }
  // Override the default Method as we want the api root (discovery endpoint).
  get(): EventEmitter {
    let request = new EventEmitter ();
    this.api.request({url: this.urlRoot}, {cache: true})
      .subscribe((res: Response) => {
        let model = res.json();
        merge(this, model);
        request.next(this);
      });

    return request;
  }
}


export const ROOT_PROVIDERS = [
  RootModel
];

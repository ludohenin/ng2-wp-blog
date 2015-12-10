import {EventEmitter, Injectable, Injector} from 'angular2/angular2';
import {Response, URLSearchParams} from 'angular2/http';
import {find, merge} from 'lodash';
import {ApiService} from './xhr';

@Injectable()
export class WpCollectionConfig {
  urlRoot: string = '';
  namespace: string = '';
}

export class WpModel {
  id: number;
  set(json: any): WpModel {
    merge(this, json);
    return this;
  }
}

// TODO: Validate generic type.
@Injectable()
export class WpCollection<T extends WpModel> extends Array {
  urlRoot: string;
  namespace: string;
  url: string;
  modelProviders: any[];
  modelToken: any;
  private _injector: Injector;
  constructor(public api: ApiService, public config: WpCollectionConfig) {
    super();
    merge(this, config);
  }
  findOneById(id: number): T {
    return find(this, {id});
  }
  getOneById(id: number): EventEmitter<T> {
    let request = new EventEmitter();

    // check if in the collection already.
    let model = this.findOneById(id);
    if (model) {
      this.async(() => request.next(model));
    } else {
      // Request otherwise.
      let searchParams = new URLSearchParams();
      searchParams.set('_embed', '1');
      this.api.request({
        // TODO: Refactor.
        url: `${this.urlRoot}${this.namespace}${this.url}/${id}`,
        search: searchParams
      }, {cache: true})
        .subscribe((res: Response) => {
          let model = res.json();
          model = this._mapModel(model);
          request.next(model);
        });
    }

    return request;
  }
  getPage(page: number = 1, options: any = {}): EventEmitter<T[]> {
    let searchParams = new URLSearchParams();
    searchParams.set('page', page.toString());
    searchParams.set('_embed', '1');
    return this.getList(searchParams);
  }
  getList(searchParams: URLSearchParams): EventEmitter<T[]> {
    let request = new EventEmitter();

    this.api.request({
      // TODO: Refactor.
      url: `${this.urlRoot}${this.namespace}${this.url}`,
      search: searchParams
    }, {cache: true}).subscribe((res: Response) => {
      let collection: any[] = res.json();
      collection = this._mapCollection(collection);
      request.next(collection);
    });

    return request;
  }
  async(cb: () => void): void {
    setTimeout(cb);
  }
  // Refactor map fonction.
  private _mapCollection(res: T[]) {
    return res.map(rawModel => {
      let cachedModel = this.findOneById(rawModel.id);
      if (cachedModel) {
        return cachedModel;
      } else {
        let model = this._mapModel(rawModel);
        this.push(model);
        return model;
      }
    });
  }
  // TODO: refactor Types and variable names.
  private _mapModel(res: any): T {
    this._injector = this._injector || Injector.resolveAndCreate(this.modelProviders);
    let model: T = this._injector.resolveAndInstantiate(this.modelToken);
    model.set(res);
    return model;
  }
}

export const WP_COLLECTION_PROVIDERS = [
  WpCollection,
  WpModel,
  WpCollectionConfig
];

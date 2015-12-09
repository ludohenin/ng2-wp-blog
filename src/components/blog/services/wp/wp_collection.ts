import {EventEmitter, Injectable, Injector, Observable} from 'angular2/angular2';
import {Response, URLSearchParams} from 'angular2/http';
import {find, merge} from 'lodash';
import {ApiService} from './xhr';

export class WpModel {
  id: number;
  set(json: any): WpModel {
    merge(this, json);
    return this;
  }
}

@Injectable()
export class WpCollection<T extends WpModel> extends Array {
  urlRoot: string;
  url: string;
  modelProviders: any[];
  modelToken: any;
  private _injector: Injector;
  constructor(public api: ApiService) {
    super();
    this._injector = Injector.resolveAndCreate(this.modelProviders);
  }
  findOneById(id: number): T {
    return find(this, {id});
  }
  getOneById(id: number): Observable<T> {
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
        url: `${this.urlRoot}${this.url}/${id}`,
        search: searchParams
      }, {cache: true})
        .map((res: Response) => res.json())
        .map(this._mapModel.bind(this))
        .subscribe(model => request.next(model));
    }

    return request;
  }
  getPage(page: number = 1, options: any = {}): Observable<T[]> {
    let searchParams = new URLSearchParams();
    searchParams.set('page', page.toString());
    searchParams.set('_embed', '1');
    return this.getList(searchParams);
  }
  getList(searchParams: URLSearchParams): Observable<T[]> {
    return this.api.request({
      url: `${this.urlRoot}${this.url}`,
      search: searchParams
    }, {cache: true})
      .map((res: Response) => res.json())
      .map(this._mapCollection.bind(this));
  }
  async(cb: () => void): void {
    setTimeout(cb);
  }
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
    let model: T = this._injector.resolveAndInstantiate(this.modelToken);
    model.set(res);
    return model;
  }
}

export const WP_COLLECTION_PROVIDERS = [
  WpCollection,
  WpModel
];

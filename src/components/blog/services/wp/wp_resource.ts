import {EventEmitter, Injectable, Injector} from 'angular2/angular2';
import {Response, URLSearchParams} from 'angular2/http';
import {find, merge} from 'lodash';
import {ApiService} from './xhr';

@Injectable()
export class WpResourceConfig {
  urlRoot: string = '';
  namespace: string = '';
  url: string = '';
}

@Injectable()
export class WpModel {
  id: number;
  urlRoot: string;
  namespace: string;
  url: string;
  constructor(public api: ApiService, public config: WpResourceConfig) {
    merge(this, config);
  }
  // TODO: add request options.
  get(id: number): EventEmitter<WpModel> {
    let request = new EventEmitter ();
    let searchParams = new URLSearchParams();
    searchParams.set('_embed', '1');
    this.api.request({
      url: `${this.urlRoot}${this.namespace}${this.url}/${id}`,
      search: searchParams
    }, {cache: true})
      .subscribe((res: Response) => {
        let model = res.json();
        merge(this, model);
        request.next(this);
      });
    return request;
  }
  save() {/** NOT YET IMPLEMENTED */}
  delete() {/** NOT YET IMPLEMENTED */}
  set(json: any): WpModel {
    merge(this, json);
    return this;
  }
}


// TODO: Validate generic type works (as I expect).
@Injectable()
export class WpCollection<T extends WpModel> extends Array {
  urlRoot: string;
  namespace: string;
  url: string;
  modelProviders: any[];
  modelToken: any;
  private _injector: Injector;
  constructor(public api: ApiService, public config: WpResourceConfig) {
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
      let model = this.getModelInstance();
      model.get(id).subscribe(type => request.next(type));
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
      let collection = this._mapCollection(res.json());
      request.next(collection);
    });

    return request;
  }
  async(cb: () => void): void {
    setTimeout(cb);
  }
  // NOTE: Unfortunately this does not work as it do not resolve from the
  // properly configure providers available in blog.ts ... but how to get them ???
  // this._injector = this._injector || Injector.resolveAndCreate(BLOG_PROVIDERS);
  // let model: T = this._injector.resolveAndInstantiate(this.modelToken);
  // Swap when issues solved.
  public getModelInstance(): T {
    return new this.modelToken(this.api, this.config);
  }
  private _mapCollection(collection: any) {
    return collection.map(rawModel => {
      let cachedModel = this.findOneById(rawModel.id);
      if (cachedModel) {
        // Update the cached object with the fetch one.
        return cachedModel.set(rawModel);
      } else {
        let model = this.getModelInstance();
        this.push(model.set(rawModel));
        return model;
      }
    });
  }
}

export const WP_RESOURCE_PROVIDERS = [
  WpResourceConfig,
  WpCollection,
  WpModel
];

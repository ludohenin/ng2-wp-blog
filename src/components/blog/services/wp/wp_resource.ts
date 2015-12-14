import {EventEmitter, Injectable} from 'angular2/angular2';
import {RequestOptionsArgs, Response, URLSearchParams} from 'angular2/http';
import {find, merge} from 'lodash';
import {ApiService} from './xhr';

function mapFromConfig(ctx, conf) {
  ctx['url'] = conf.url;
  ctx['urlRoot'] = conf.urlRoot;
  ctx['namespace'] = conf.namespace;
}

@Injectable()
export class WpResourceConfig {
  urlRoot: string;
  namespace: string;
  url: string;
  taxonomy: {
    tag: string;
    category: string;
  };
  request: RequestOptionsArgs;
}

const WpResourceDefaultConfig: WpResourceConfig = {
  urlRoot: '',
  namespace: '',
  url: '',
  taxonomy: {
    tag: 'post_tag',
    category: 'category'
  },
  request: {}
};

@Injectable()
export class WpModel {
  id: number;
  parent: WpCollection<WpModel>;
  urlRoot: string;
  namespace: string;
  url: string;
  constructor(public api: ApiService, public config: WpResourceConfig) {
    this._mergeConfig();
    mapFromConfig(this, this.config);
  }
  // TODO: add request options.
  get(id: number, params: any = {}): EventEmitter<WpModel> {
    let request = new EventEmitter ();
    let searchParams = new URLSearchParams();

    Object.keys(this.config.request.search).forEach(k => searchParams.set(k, this.config.request.search[k]));
    Object.keys(params).forEach(k => searchParams.set(k, params[k]));

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
    this.mapDates();
    return this;
  }
  mapDates() {
    let props = ['date', 'date_gmt', 'modified', 'modified_gmt'];
    let keys = Object.keys(this);
    props.forEach(prop => {
      if (keys.indexOf(prop) > -1) {
        this[prop] = new Date(this[prop]);
      }
    });

    function map(key) {
      props.forEach(prop => {
        if (this[key] === prop) {
          this[key] = new Date(this[key]);
        }
      });
    }
  }
  private _mergeConfig() {
    merge(this.config, merge(WpResourceDefaultConfig, this.config));
  }
}

// Token only.
export class WpModelFactory {
  getModelInstance(ctor: any): any {/** */}
}

class WpModelFactoryImpl {
  constructor(public deps: any[]) {}
  getModelInstance(ctor: any): any {
    return new ctor(...this.deps);
  };
}

export function makeModelFactory() {
  return function modelFactory(...deps: any[]) {
    return new WpModelFactoryImpl(deps);
  };
}

// TODO: Validate generic type works (as I expect).
@Injectable()
export class WpCollection<T extends WpModel> extends Array {
  initialized: boolean = false;
  urlRoot: string;
  namespace: string;
  url: string;
  modelProviders: any[];
  modelToken: any;
  totalItems: number;
  totalPages: number;
  constructor(public api: ApiService, public config: WpResourceConfig, public modelFactory: WpModelFactory) {
    super();
    this._mergeConfig();
    mapFromConfig(this, this.config);
  }
  init(): WpCollection<T> {
    if (this.initialized) { return this; }
    this.getPage().subscribe(res => {
      this.totalItems = parseInt(res.raw.headers.get('x-wp-total'));
      this.totalPages = parseInt(res.raw.headers.get('x-wp-totalpages'));
      this.initialized = true;
    });
    return this;
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
      let model = this.modelFactory.getModelInstance(this.modelToken);
      model.get(id).subscribe(type => request.next(type));
    }

    return request;
  }
  getPage(page: number = 1, params: any = {}): EventEmitter<T[]> {
    let searchParams = new URLSearchParams();
    searchParams.set('page', page.toString());

    // TODO: Move into a method.
    Object.keys(this.config.request.search).forEach(k => searchParams.set(k, this.config.request.search[k]));
    Object.keys(params).forEach(k => searchParams.set(k, params[k]));

    return this.getList(searchParams);
  }
  //TODO: Update return type acc to apiResponse object type ({data, raw}).
  getList(searchParams: URLSearchParams): EventEmitter<T[]> {
    let request = new EventEmitter();

    this.api.request({
      // TODO: Refactor.
      url: `${this.urlRoot}${this.namespace}${this.url}`,
      search: searchParams
    }, {cache: true}).subscribe((res: Response) => {
      let collection = this._mapCollection(res.json());
      // Refactor to provide request as well.
      request.next({data: collection, raw: res});
    });

    return request;
  }
  async(cb: () => void): void {
    setTimeout(cb);
  }
  private _mapCollection(collection: any) {
    return collection.map(rawModel => {
      let cachedModel = this.findOneById(rawModel.id);
      if (cachedModel) {
        // Update the cached object with the fetch one.
        return cachedModel.set(rawModel);
      } else {
        let model = this.modelFactory.getModelInstance(this.modelToken);
        this.push(model.set(rawModel));
        model.set({ parent: this });
        return model;
      }
    });
  }
  private _mergeConfig() {
    merge(this.config, merge(WpResourceDefaultConfig, this.config));
  }
}

export const WP_RESOURCE_PROVIDERS = [
  WpResourceConfig,
  WpCollection,
  WpModel,
  WpModelFactory
];

import {EventEmitter, Observable, Injectable, Injector} from 'angular2/angular2';
import {Http, Request, RequestOptions, RequestOptionsArgs, Response} from 'angular2/http';
import {find, merge} from 'lodash';
import {WpApiService} from '../wp_api';

export function makeRequest(opts: RequestOptionsArgs) {
  let options: RequestOptions;
  if (!(opts instanceof RequestOptions)) {
    options = new RequestOptions(options);
  } else {
    options = opts;
  }

  return new Request(options);
}


export class PostModel {
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

  set(post) {
    merge(this, post);
  }
  get() {}
  save() {}
  delete() {}
}


@Injectable()
class BaseCollection extends Array {
  defaults: any;
  mergeOptions(opts): any {
    return merge({}, this.defaults, opts);
  }
  findOneById(id: number): PostModel {
    return find(this, {id});
  }
  sendFromCache(val: any): Observable<any> {
    let res = new EventEmitter(true);
    setTimeout(() => res.next(val));
    return res;
  }
}

export const POSTS_PROVIDERS = [];

@Injectable()
export class PostsCollection extends BaseCollection {
  initialized: boolean;
  response: Response;
  request: EventEmitter<PostModel[]>;
  uri: string = '/posts{/id}?_embed';
  total: number;
  total_pages: number;
  // TODO: move to config.
  defaults: any = {
    page: 1,
    per_page: 10,
    _embed: false
  };
  private _injector: Injector;
  private requestQueue: any[] = [];
  constructor(private _api: WpApiService, private _http: Http) {
    super();
    this._injector = Injector.resolveAndCreate(POSTS_PROVIDERS);
  }
  initialize(): Observable<PostModel[]> {
    let event = new EventEmitter(true);
    this.getPage(1).subscribe(res => {
      // TODO: move header names to config.
      this.total = parseInt(this.response.headers.get('x-wp-total'));
      this.total_pages = parseInt(this.response.headers.get('x-wp-totalpages'));
      this.initialized = true;
      event.next(res);
    });
    return event;
  }
  getOneById(id: number): Observable<PostModel> {
    let cachedPost = this.findOneById(id);
    if (cachedPost) { return this.sendFromCache(cachedPost); }
    // TODO: map to flatten embeded data.
    return this._get(this.uri, this.mergeOptions({id}))
      .map(this._mapModel.bind(this));
  }
  getPage(page: number = 1, options: any = {}): Observable<PostModel[]> {
    if (this.length > 1) {
      return this.sendFromCache(this);
    }
    return this._get(this.uri, this.mergeOptions(options))
      .map(this._mapCollection.bind(this))
      .map(this._cacheResponse.bind(this));
  }
  private _request(options) {
    // Check cache (design cache api).
  }
  private _get(uri, opts): Observable<any> {
    this.request = new EventEmitter();
    this._api.get(uri, opts).subscribe(res => {
      this.response = res;
      this.request.next(res.json());
    });
    return this.request;
  }
  private _mapCollection(res: PostModel[]) {
    return res.map(res => this._mapModel(res));
  }
  private _mapModel(res: PostModel): PostModel {
    let model: PostModel = this._injector.resolveAndInstantiate(PostModel);
    model.set(res);
    return model;
  }
  private _cacheResponse(res: PostModel[]) {
    // TODO: Test if not already cached.
    res.forEach((post: PostModel) => this.push(post));
    return res;
  }


  private _http_request(options: RequestOptions): Observable<any> {
    let request = makeRequest(options);
    return this._http.request(request);
  }
}

POSTS_PROVIDERS.push([
  PostsCollection,
  PostModel
]);

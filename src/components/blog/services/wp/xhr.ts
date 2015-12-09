import {EventEmitter, Injectable, Observable, provide} from 'angular2/angular2';
import {Http, Request, RequestMethods, RequestOptions, RequestOptionsArgs, Response} from 'angular2/http';
import {extend} from 'lodash';


export function makeRequestOtions(opts: RequestOptions|RequestOptionsArgs): RequestOptions {
  let options: RequestOptions;
  if (!(opts instanceof RequestOptions)) {
    options = new RequestOptions(opts);
  } else {
    options = opts;
  }

  if (!options.method) { options.method = RequestMethods.Get; }

  return options;
}

@Injectable()
export class XhrService {
  constructor(private _http: Http) {
  }
  request(request: Request) {
    return this._http.request(request);
  }
}

@Injectable()
export class CacheService {
  private _cache = new Map();
  set(key: Request, value: Response): CacheService {
    if (this._cache.get(key.url)) { return this; }
    this._cache.set(key.url, value);
    return this;
  }
  get(key: Request): Response {
    return (<Response>this._cache.get(key.url));
  }
}

@Injectable()
export class QueueService {
  private _queue = new Map();
  get(key: Request): Observable<any> {
    return (<Observable<any>>this._queue.get(key.url));
  }
  set(key: Request, value: Observable<any>): QueueService {
    this._queue.set(key.url, value);
    return this;
  }
  delete(key: Request): QueueService {
    this._queue.delete(key.url);
    return this;
  }
}

export interface IApiServiceConfig {
  cache?: boolean;
  force?: boolean;
  // cancelPrev?: boolean;
}

export class ApiServiceConfig implements IApiServiceConfig {
  cache: boolean;
  force: boolean;
}

export let ApiServiceDefaultConfig: ApiServiceConfig = {
  cache: false,
  force: false
};

@Injectable()
export class ApiService {
  constructor(public config: ApiServiceConfig,
              public xhr: XhrService,
              private _cache: CacheService,
              private _queue: QueueService) {
  }
  request<T>(reqOpts: RequestOptions|RequestOptionsArgs, conf?: IApiServiceConfig): Observable<T> {
    let config = (<ApiServiceConfig>extend({}, this.config, conf));
    let requestOptions = makeRequestOtions(reqOpts);
    let request = new Request(requestOptions);
    let cachedResponse = this._cache.get(request);
    let ongoingRequest = this._queue.get(request);
    let _request = new EventEmitter();

    if (cachedResponse && config.cache) {
      this.async(() => _request.next(cachedResponse));
      return _request;
    }

    if(ongoingRequest && !config.force) {
      return ongoingRequest;
    }

    this._queue.set(request, _request);
    this.xhr.request(request).subscribe(res => {
      if (config.cache) {
        this._cache.set(request, res);
      }
      _request.next(res);
      this._queue.delete(request);
    });

    return _request;
  }
  async(cb: () => void): void {
    setTimeout(cb);
  }
}

export const XHR_SERVICE_PROVIDERS = [
  XhrService,
  CacheService,
  QueueService,
  provide(ApiServiceConfig, { useValue: ApiServiceDefaultConfig}),
  ApiService
];

import {EventEmitter, Injectable, Observable} from 'angular2/angular2';
import {Http, Request, RequestOptions, RequestOptionsArgs, Response} from 'angular2/http';


export function makeRequestOtions(opts: RequestOptions|RequestOptionsArgs): RequestOptions {
  let options: RequestOptions;
  if (!(opts instanceof RequestOptions)) {
    options = new RequestOptions(options);
  } else {
    options = opts;
  }

  return options;
}

@Injectable()
export class XhrService {
  constructor(public http: Http) {
  }
  request(options: RequestOptions) {
    return this.http.request(new Request(options));
  }
}

@Injectable()
export class CacheService {
  cache = new Map();
  set(key: string, value: Response): CacheService {
    this.cache.set(key, value);
    return this;
  }
  get(key: RequestOptions): Response {
    return (<Response>this.cache.get(key));
  }
}

@Injectable()
export class Queue {
  queue = new Map();
  add() {}
}

@Injectable()
export class ApiService {
  constructor(public xhr: XhrService,
              public cache: CacheService) {}
  request(opts: RequestOptions|RequestOptionsArgs, toCache?: boolean): Observable<any> {
    let requestOptions = makeRequestOtions(opts);
    let cachedResponse = this.cache.get(requestOptions);
    let request = new EventEmitter();

    if (cachedResponse) {
      this.async(() => request.next(cachedResponse));
    }
    // Check queue. Return the response if !=
      // key = requestOptions, val = request
      // return the same request if already queued.
      // queue otherwise and return udefined.
    // Finally make request.
    return request;
  }
  async(cb: () => void): void {
    setTimeout(cb);
  }
}

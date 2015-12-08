import {Injectable, Observable} from 'angular2/angular2';
import {Http, Request, RequestOptions, RequestOptionsArgs, Response} from 'angular2/http';
import * as URITemplate from 'urijs/src/URITemplate';
import {WP_API_ROOT, WP_API_NAMESPACE} from '../../config';

// TODO: rename xhr
// use Resquest interface

// TODO: parse routes returned by the api root.
@Injectable()
export class WpApiService {
  namespace: string;
  constructor(private _http: Http) {
  }
  root(): any {
    return this._http
      .get(WP_API_ROOT)
      .map((res: Response) => res.json());
  }
  get(uri: string, opts: any = {}): Observable<any> {
    return this._http.get(this._URI(uri, opts));
  }
  private _URI(uri: string, opts: any): string {
    return WP_API_ROOT + WP_API_NAMESPACE + URITemplate(uri).expand(opts);
  }
}

export function requestFactory(opts: RequestOptionsArgs) {
  let options: RequestOptions;
  if (!(opts instanceof RequestOptions)) {
    options = new RequestOptions(options);
  } else {
    options = opts;
  }

  return new Request(options);
}

@Injectable()
export class BaseResource {
  getOneById(id: number) {/** */}
  get(url: string) {/** */}
  save() {/** */}
  delete() {/** */}
}

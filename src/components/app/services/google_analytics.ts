import {Injectable} from 'angular2/angular2';
import {Router} from 'angular2/router';
import * as config from 'config';

@Injectable()
export class GoogleAnalyticsService {
  base: string = '';
  ga: any;
  constructor(public router: Router) {
    this.ga = (<any>window).ga;
    this.init(config.GA_ID, '/blog/');
    router.subscribe(this.track.bind(this));
  }
  init(id: string, base: string) {
    this.base = base;
    this.ga('create', id, 'auto');
  }
  track(path) {
    let fullpath = (this.base.replace(/\/$/, '')) + (/^\//.test(path) ? path :  `/${path}`);
    console.log(path);
    console.log(fullpath);
    this.ga('send', 'pageview', fullpath);
  }
}

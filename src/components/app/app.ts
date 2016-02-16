import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {GoogleAnalyticsService} from '../../services/services';
import {BlogCmp} from '../blog/blog';


@Component({
  selector: 'app',
  providers: [GoogleAnalyticsService],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, BlogCmp]
})
@RouteConfig([
  { path: '/...', component: BlogCmp, as: 'Blog' }
])
export class AppCmp {
  constructor(public ga: GoogleAnalyticsService) {
  }
}

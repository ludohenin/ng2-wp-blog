import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {GoogleAnalyticsService} from '../shared/services';
import {BlogComponent} from '../blog/blog';


@Component({
  selector: 'app',
  providers: [GoogleAnalyticsService],
  moduleId: module.id,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, BlogComponent]
})
@RouteConfig([
  { path: '/...', component: BlogComponent, as: 'Blog' }
])
export class AppComponent {
  constructor(public ga: GoogleAnalyticsService) {
  }
}

import {Component, ViewEncapsulation} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {BlogCmp} from '../blog/blog';


@Component({
  selector: 'app',
  viewProviders: [],
  templateUrl: './components/app/app.html',
  styleUrls: ['./components/app/app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, BlogCmp]
})
@RouteConfig([
  { path: '/...', component: BlogCmp, as: 'Blog' }
])
export class AppCmp {}

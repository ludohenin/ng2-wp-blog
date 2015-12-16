import {Component, ViewEncapsulation} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';


@Component({
  selector: 'navbar',
  viewProviders: [],
  templateUrl: './components/blog/components/navbar/navbar.html',
  styleUrls: ['./components/blog/components/navbar/navbar.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES],
  properties: ['siteName']
})
export class NavbarCmp {}

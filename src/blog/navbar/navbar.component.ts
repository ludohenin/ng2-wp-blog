import {Component, ViewEncapsulation} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';


@Component({
  selector: 'navbar',
  viewProviders: [],
  moduleId: module.id,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES],
  properties: ['siteName']
})
export class NavbarComponent {}

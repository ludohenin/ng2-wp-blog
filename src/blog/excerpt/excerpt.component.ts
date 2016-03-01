import {Component, Input, ViewEncapsulation} from 'angular2/core';


@Component({
  selector: 'excerpt',
  moduleId: module.id,
  template: '<div [innerHtml]="excerptContent"></div>',
  encapsulation: ViewEncapsulation.None,
})
export class ExcerptComponent {
  @Input() excerptContent: string;
}

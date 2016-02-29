import {Directive, ElementRef, Input} from 'angular2/core';

@Directive({
  selector: '[excerpt]'
})
export class ExcerptDirective {
  constructor(public ngEl: ElementRef) {
  }
  @Input() set excerpt(html) {
    let postEl = document.createElement('div');
    postEl.innerHTML = html;
    let excerpt = (<HTMLElement>postEl.querySelector('p'));
    this.ngEl.nativeElement.innerHTML = excerpt.outerHTML;
  }
}

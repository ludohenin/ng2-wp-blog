import {Directive, ElementRef} from 'angular2/core';

@Directive({
  selector: '[excerpt]',
  inputs: ['excerpt']
})
export class ExcerptDirective {
  constructor(public ngEl: ElementRef) {
  }
  set excerpt(html) {
    let postEl = document.createElement('div');
    postEl.innerHTML = html;
    let excerpt = (<HTMLElement>postEl.querySelector('p'));
    this.ngEl.nativeElement.innerHTML = excerpt.outerHTML;
  }
}

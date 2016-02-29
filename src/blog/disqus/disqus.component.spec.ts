import {
  TestComponentBuilder,
  describe,
  expect,
  injectAsync,
  it,
  beforeEachProviders
} from 'angular2/testing';
import {Component, View} from 'angular2/core';

import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {DisqusComponent} from './disqus';

export function main() {

  describe('DisqusComponent Component', () => {

    beforeEachProviders(() => []);

    it('should work',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.overrideTemplate(TestComponent, '<div><disqus></disqus></div>')
          .createAsync(TestComponent)
          .then((rootTC) => {
            rootTC.detectChanges();
            let cmpDOMEl = rootTC.debugElement.children[0].nativeElement;
            expect(DOM.querySelectorAll(cmpDOMEl, 'disqus')[0]).toBeDefined();
          });
      }));
  });
}

@Component({selector: 'test-cmp'})
@View({directives: [DisqusComponent]})
class TestComponent {}

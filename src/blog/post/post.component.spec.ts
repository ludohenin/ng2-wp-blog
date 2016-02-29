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
import {PostComponent} from './post';

export function main() {

  describe('post Component', () => {

    beforeEachProviders(() => []);

    it('should work',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.overrideTemplate(TestComponent, '<div><post></post></div>')
          .createAsync(TestComponent)
          .then((rootTC) => {
            rootTC.detectChanges();
            let appDOMEl = rootTC.debugElement.children[0].nativeElement;
            expect(DOM.querySelectorAll(appDOMEl, 'post')[0]).toBeDefined();
          });
      }));
  });
}

@Component({selector: 'test-cmp'})
@View({directives: [PostComponent]})
class TestComponent {}

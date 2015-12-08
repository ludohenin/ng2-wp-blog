import {
  TestComponentBuilder,
  describe,
  expect,
  injectAsync,
  it,
  beforeEachProviders
} from 'angular2/testing';
import {Component, View, provide, DirectiveResolver} from 'angular2/angular2';

import {Location, Router, RouteRegistry} from 'angular2/router';
import {SpyLocation} from 'angular2/src/mock/location_mock';
import {RootRouter} from 'angular2/src/router/router';

import {DOM} from 'angular2/src/core/dom/dom_adapter';
import {BlogCmp} from './blog';

export function main() {

  describe('blog Component', () => {

    // Support for testing component that uses Router
    beforeEachProviders(() => [
      RouteRegistry,
      DirectiveResolver,
      provide(Location, {useClass: SpyLocation}),
      provide(Router,
        {
          useFactory:
            (registry, location) => { return new RootRouter(registry, location, BlogCmp); },
          deps: [RouteRegistry, Location]
        })
    ]);

    it('should work',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.overrideTemplate(TestComponent, '<div><blog></blog></div>')
          .createAsync(TestComponent)
          .then((rootTC) => {
            rootTC.detectChanges();
            let appDOMEl = rootTC.debugElement.componentViewChildren[0].nativeElement;
            expect(DOM.querySelectorAll(appDOMEl, 'blog')[0]).toBeDefined();
          });
      }));
  });
}

@Component({selector: 'test-cmp'})
@View({directives: [BlogCmp]})
class TestComponent {}

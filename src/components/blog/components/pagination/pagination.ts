import {Component, EventEmitter, ViewEncapsulation} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';


@Component({
  selector: 'pagination',
  templateUrl: './components/blog/components/pagination/pagination.html',
  styleUrls: ['./components/blog/components/pagination/pagination.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [RouterLink],
  properties: ['activePage', 'totalPages'],
  events: ['changePage']
})
export class PaginationCmp {
  activePage: number;
  pages: number[];
  changePage: EventEmitter<number> = new EventEmitter();
  set totalPages(val: number) {
    this.pages = this.makeArray(val);
  }
  showPage(pageNumber: number) {
    this.changePage.next(pageNumber);
    return false;
  }
  nextPage() {
    if (this.activePage === this.pages.length) return false;
    this.changePage.next(this.activePage + 1);
    return false;
  }
  previousPage() {
    if (this.activePage === 1) return false;
    this.changePage.next(this.activePage - 1);
    return false;
  }
  private makeArray(numberOfPages: number): number[] {
    let pagesSequence = [];

    // TODO: support very long list of pages

    for (let i = 1; i <= numberOfPages; i++) {
      pagesSequence.push(i);
    }
    return pagesSequence;
  }
}

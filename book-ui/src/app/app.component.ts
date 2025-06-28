import { Component, ViewChild } from '@angular/core';
import { BookListComponent } from './book-list/book-list.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="container mt-5">
      <h2 class="text-center mb-4">📚 Book Manager</h2>

      <app-book-form
        [editBook]="bookList.selectedBookId"
        [refreshCallback]="bookList.handleRefresh">
      </app-book-form>

      <app-book-list #bookList></app-book-list>
    </div>
  `
})
export class AppComponent {
  @ViewChild('bookList') bookList!: BookListComponent;

  refreshList() {
    this.bookList.fetchBooks();
  }
}

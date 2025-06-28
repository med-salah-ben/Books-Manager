import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var bootstrap: any;

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  selectedBookId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks() {
    this.http.get('/api/books/').subscribe((data: any) => {
      this.books = data;
    });
  }

    editBook(book: any) {
    this.selectedBookId = { ...book };
  }

  handleRefresh = () => {
    this.fetchBooks();
    this.selectedBookId = null;
  };

  confirmDelete(id: number) {
    this.selectedBookId = id;
    const modal = document.getElementById('deleteModal');
    if (modal) {
      const bsModal = new bootstrap.Modal(modal);
      bsModal.show();
    }
  }

deleteBook() {
  console.log("Deleting book ID:", this.selectedBookId);

  if (this.selectedBookId !== null) {
    this.http.delete(`/api/books/${this.selectedBookId}/`).subscribe(() => {
      this.fetchBooks();
      this.selectedBookId = null;
      const modal = document.getElementById('deleteModal');
      if (modal) {
        const bsModal = bootstrap.Modal.getInstance(modal);
        bsModal?.hide();
      }
    });
  }
}
}

import { Component, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
})
export class BookFormComponent implements OnChanges {
  @Input() editBook: any = null;
  @Input() refreshCallback!: () => void;

  bookForm: FormGroup;
  isEditMode = false;

  
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.bookForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(2)]],
      auteur: ['', [Validators.required]],
      annee: ['', [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editBook'] && this.editBook) {
      this.isEditMode = true;
      this.bookForm.patchValue(this.editBook);
    }
  }

  onSubmit() {
    if (this.bookForm.invalid) return;

    if (this.isEditMode) {
      this.http.put(`/api/books/${this.editBook.id}/`, this.bookForm.value).subscribe(() => {
        this.refreshCallback();
        this.resetForm();
      });
    } else {
      this.http.post('/api/books/', this.bookForm.value).subscribe(() => {
        this.refreshCallback();
        this.bookForm.reset();
      });
    }
  }

  resetForm() {
    this.bookForm.reset();
    this.isEditMode = false;
    this.editBook = null;
  }

  get f() {
    return this.bookForm.controls;
  }
}

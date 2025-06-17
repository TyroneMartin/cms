import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  standalone: true,
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css'],
  imports: [FormsModule, CommonModule] 
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document | null = null;
  document: Document = new Document('', '', '', '', []);
  editMode: boolean = false;
  id: string = '';

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        return;
      }

      const original = this.documentService.getDocument(this.id);
      if (!original) return;

      this.originalDocument = original;
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(original));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(
      this.id,
      value.name,
      value.description,
      value.url,
      []
    );

    if (this.editMode && this.originalDocument) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}

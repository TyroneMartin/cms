import { Component } from '@angular/core';
import { DocumentListComponent } from './document-list/document-list.component';
// import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Document } from './document.model';

@Component({
  selector: 'cms-documents',
  standalone: true,
  imports: [ DocumentListComponent, CommonModule, RouterModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css',
})
export class DocumentsComponent {
  selectedDocument?: Document;

  onDocumentSelected(document: Document) {
    this.selectedDocument = document;
  }
}
import { Component } from '@angular/core';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { Document } from './document.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-documents',
  standalone: true,
  imports: [DocumentListComponent, DocumentDetailComponent, CommonModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
  selectedDocument!: Document;
  
  onSelectedDocument(document: Document) {
    this.selectedDocument = document;
  }
}
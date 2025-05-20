import { Component, EventEmitter, Output } from '@angular/core';
import { DocumentItemComponent } from '../document-item/document-item.component'; 
import { Document } from '../document.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [DocumentItemComponent, CommonModule],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  
  documents: Document[] = [
    new Document('1', 'My Senior Project', 'Summary for my senior project', 'https://example.com/senior-project.pdf', []),
    new Document('2', 'My SQL Notes', 'Notes from my SQL class', 'https://example.com/sql-notes.pdf', []),
    new Document('3', 'Software Best Practices', 'Technical requirements and specifications', 'https://example.com/software-best-practices.pdf', []),
    new Document('4', 'Web Application User Guide', 'User guide for the application', 'https://example.com/web-app-user-guide.pdf', []),
    new Document('5', 'Professional Readiness', 'Financial breakdown for Q2', 'https://example.com/professional-readiness.pdf', [])
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
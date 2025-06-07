import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { CommonModule } from '@angular/common';
import { MOCKDOCUMENTS } from '../MOCKDOCUMENTS';
import { RouterModule } from '@angular/router';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [DocumentItemComponent, CommonModule, RouterModule],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent {
  @Output() documentWasSelected = new EventEmitter<Document>();

  documents: Document[] = [];

  constructor(private documentService: DocumentService) {
    this.documents = MOCKDOCUMENTS;
  }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();

    this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
  }

  onDocumentSelected(document: Document) {
    this.documentWasSelected.emit(document);
  }
}

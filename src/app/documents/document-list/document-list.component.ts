import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { CommonModule } from '@angular/common';
import { MOCKDOCUMENTS } from '../MOCKDOCUMENTS';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [DocumentItemComponent, CommonModule, RouterModule],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() documentWasSelected = new EventEmitter<Document>();
  
  documents: Document[] = MOCKDOCUMENTS;


  onDocumentSelected(document: Document) {
    this.documentWasSelected.emit(document);
  }
}

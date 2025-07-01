import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [DocumentItemComponent, CommonModule, RouterModule],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent implements OnInit, OnDestroy {
  @Output() documentWasSelected = new EventEmitter<Document>();

  documents: Document[] = [];
  subscription?: Subscription;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documents = [];
    this.documentService.getDocuments(); 

    // Subscribe to changes
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documentsList: Document[]) => {
        this.documents = documentsList;
      }
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onDocumentSelected(document: Document) {
    this.documentWasSelected.emit(document);
  }
}
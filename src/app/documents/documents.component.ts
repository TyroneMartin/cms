import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { DocumentListComponent } from './document-list/document-list.component';
// import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  standalone: true,
  imports: [ DocumentListComponent, CommonModule, RouterModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css',
})
export class DocumentsComponent implements OnInit, AfterViewInit {
  selectedDocument?: Document;

  constructor(
    private documentService: DocumentService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // console.log('DocumentsComponent ngOnInit called');
    if (isPlatformBrowser(this.platformId)) {
      this.documentService.getDocuments();
    }
  }

  ngAfterViewInit(): void {
    // console.log('DocumentsComponent AfterViewInit called');
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        console.log('DocumentsComponent AfterViewInit - loading documents');
        this.documentService.getDocuments();
      }, 0);
    }
  }

  getDocument(id: string): Document | null {
  return this.documentService.documents.find(document => document.id === id) || null;
}

  onDocumentSelected(document: Document) {
    this.selectedDocument = document;
  }
}
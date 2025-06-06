import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent implements OnInit {
  document?: Document | null;
  nativeWindow: any;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
    private windRefService: WindRefService
  ) {}

  ngOnInit() {
    this.nativeWindow = this.windRefService.getNativeWindow();

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.document = this.documentService.getDocument(id);
    });
  }

  onView() {
    if (this.document && this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    if (this.document) {
      this.documentService.deleteDocument(this.document);
      this.router.navigate(['/documents']);
    }
  }
}
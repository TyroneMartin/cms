import { Component } from '@angular/core';
import { DocumentDetailComponent } from '../document-detail/document-detail.component';

@Component({
  selector: 'cms-document-list',
  imports: [DocumentDetailComponent],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {

}

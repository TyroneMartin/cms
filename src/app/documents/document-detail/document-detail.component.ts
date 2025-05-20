import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-document-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent {
  @Input() document?: Document;
}
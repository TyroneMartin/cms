import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-document-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css'
})
export class DocumentItemComponent {
  @Input() document!: Document;
  @Output() documentSelected = new EventEmitter<void>();

  onClick() {
    this.documentSelected.emit();
  }
}
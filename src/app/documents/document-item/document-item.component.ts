import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-document-item',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css'
})
export class DocumentItemComponent {
  @Input() document?: Document;
}
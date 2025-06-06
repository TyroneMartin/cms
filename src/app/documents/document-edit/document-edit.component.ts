import { Component } from '@angular/core';
// import { DocumentListComponent } from '../document-list/document-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-document-edit',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent {
}
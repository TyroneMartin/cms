import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DocumentsComponent } from './documents/documents.component';

@Component({
  selector: 'cms-root',
  standalone: true,
  imports: [CommonModule,HeaderComponent, ContactsComponent, MessageListComponent, DocumentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cms';
  selectedFeature = 'documents';

   switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }
}

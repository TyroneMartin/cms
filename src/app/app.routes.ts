import { Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactsComponent } from './contacts/contacts.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/documents',
    pathMatch: 'full',
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    title: 'Contacts',

  },
  {
    path: 'documents',
    component: DocumentsComponent,
    title: 'Documents',
  },
  {
    path: 'messages',
    component: MessageListComponent,
    title: 'Messages',
  },
  {
    path: '**',
    redirectTo: '', // Redirects to homepage for unknown routes
  },
];

// Documentation on routing: https://angular.dev/tutorials/first-app/10-routing

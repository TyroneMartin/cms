import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { Contact } from './contact.model';

@Component({
  selector: 'cms-contacts',
  standalone: true,
  imports: [CommonModule, NgIf,ContactListComponent, ContactDetailComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent {
  selectedContact!: Contact;  // Use ! to tell the compiler you’ll assign it before it's used
  // selectedContact: Contact = {} as Contact; // Initialize selectedContact as an empty object


  onContactSelected(contact: Contact) {
    this.selectedContact = contact;
  }
}
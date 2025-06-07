import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
// import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cms-contacts',
  standalone: true,
  imports: [CommonModule, ContactListComponent, RouterModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent {
  selectedContact!: Contact;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.contactSelectedEvent.subscribe((contact: Contact) => {
      this.selectedContact = contact;
    });
  }
  onContactSelected(contact: Contact) {
    this.selectedContact = contact;
  }
}

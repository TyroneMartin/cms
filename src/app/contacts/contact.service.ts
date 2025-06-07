import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({ providedIn: 'root' })
export class ContactService {
  contacts: Contact[] = [];

  contactChangedEvent = new EventEmitter<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice(); // return a copy
  }

  getContact(id: string): Contact | null {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        // console.log('Looking for contact', id, 'Found:', contact);
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact): void {
    const index = this.contacts.findIndex((c) => c.id === contact.id);
    if (index > -1) {
      this.contacts.splice(index, 1);
      this.contactChangedEvent.emit(this.contacts.slice());
    }
  }
}

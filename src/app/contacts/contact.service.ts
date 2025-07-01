import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
// import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({ 
  providedIn: 'root' 
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  
  contacts: Contact[] = [];
  maxContactId: number;
  
  contactSelectedEvent = new Subject<Contact>();

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;
    
    for (let contact of this.contacts) {
      const currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    
    return maxId;
  }

  getContacts(): Contact[] {
    this.http.get<Contact[]>('https://wdd430-cms-application-default-rtdb.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts ? contacts : [];
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.error('Error fetching contacts:', error);
        }
      );
    
    return this.contacts.slice(); // return current copy for immediate use
  }

  getContact(id: string): Contact | null {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  storeContacts() {
    const contactsString = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put('https://wdd430-cms-application-default-rtdb.firebaseio.com/contacts.json', 
      contactsString, 
      { headers: headers })
      .subscribe(
        () => {
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.error('Error storing contacts:', error);
        }
      );
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  deleteContact(contact: Contact): void {
    if (!contact) {
      return;
    }
    
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }

  isContactInGroup(contactId: string, excludeContactId?: string): boolean {
    return this.contacts.some(contact => {
      if (excludeContactId && contact.id === excludeContactId) {
        return false;
      }
      return contact.group && contact.group.some(groupContact => groupContact.id === contactId);
    });
  }
}
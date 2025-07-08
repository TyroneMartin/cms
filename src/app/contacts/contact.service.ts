import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new Subject<Contact>();
  
  contacts: Contact[] = [];
  maxContactId!: number;

  constructor(private http: HttpClient) {
    this.getContacts();
  }

  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getContacts(): void {
    this.http.get<Contact[]>('http://localhost:3000/contacts')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts || [];
          this.maxContactId = this.getMaxId();
          this.sortAndSend();
        },
        (error: any) => {
          console.error('Error fetching contacts:', error);
        }
      );
  }

  getContact(id: string): Contact | null {
    return this.contacts.find(contact => contact.id === id) || null;
  }

  addContact(newContact: Contact): void {
    if (!newContact) return;

    newContact.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<{ message: string, contact: Contact }>(
      'http://localhost:3000/contacts',
      newContact,
      { headers }
    ).subscribe(response => {
      this.contacts.push(response.contact);
      this.sortAndSend();
    });
  }

  updateContact(original: Contact, newContact: Contact): void {
    if (!original || !newContact) return;

    const pos = this.contacts.findIndex(c => c.id === original.id);
    if (pos < 0) return;

    newContact.id = original.id;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put(
      `http://localhost:3000/contacts/${original.id}`,
      newContact,
      { headers }
    ).subscribe(() => {
      this.contacts[pos] = newContact;
      this.sortAndSend();
    });
  }

  deleteContact(contact: Contact): void {
    if (!contact) return;

    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0) return;

    this.http.delete(`http://localhost:3000/contacts/${contact.id}`)
      .subscribe(() => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      });
  }

  private sortAndSend(): void {
    this.contacts.sort((a, b) => a.name > b.name ? 1 : -1);
    this.contactListChangedEvent.next(this.contacts.slice());
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
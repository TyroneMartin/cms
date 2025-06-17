import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DndModule } from 'ng2-dnd';
import { ContactItemComponent } from '../contact-item/contact-item.component';

@Component({
  standalone: true,
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
  imports: [CommonModule, FormsModule, DndModule, ContactItemComponent]
})
export class ContactEditComponent implements OnInit {
  originalContact!: Contact;
  contact!: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id!: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        this.contact = new Contact('', '', '', '', '', []);
        return;
      }

      const original = this.contactService.getContact(this.id);
      if (!original) return;

      this.originalContact = original;
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(original));

      if (this.originalContact.group) {
        this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(
      this.id,
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts
    );

    if (this.editMode && this.originalContact) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    if (this.isInvalidContact(selectedContact)) return;
    this.groupContacts.push(selectedContact);
  }

  isInvalidContact(newContact: Contact): boolean {
    if (!newContact) return true;
    if (this.contact && newContact.id === this.contact.id) return true;
    return this.groupContacts.some(c => c.id === newContact.id);
  }

  onRemoveItem(index: number): void {
    if (index < 0 || index >= this.groupContacts.length) return;
    this.groupContacts.splice(index, 1);
  }
}
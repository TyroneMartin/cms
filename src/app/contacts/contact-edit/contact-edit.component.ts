import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  standalone: true,
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
  imports: [CommonModule, FormsModule, ContactItemComponent, DragDropModule,],
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
  ) {
    // Explicitly initialize groupContacts to avoid undefined issues
    this.groupContacts = [];
  }

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

  // Method called when a contact is dropped into the group area
  onDropSuccess(event: CdkDragDrop<Contact[]>) {
    // Handle drops from external sources (contact list)
    if (event.previousContainer !== event.container) {
      const droppedContact: Contact = event.item.data;
      
      // Use the addToGroup method to handle the logic
      this.addToGroup({ dragData: droppedContact });
    }
  }

  // Method to add a contact to the group (following the instruction pattern)
  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      // You could add a toast notification or alert here to show the error
      console.warn('Cannot add contact: Contact is invalid or already in group');
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  // Method to check if contact is already in the group (following the instruction pattern)
  isInvalidContact(newContact: Contact): boolean {
    if (!newContact) { // newContact has no value
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  // Method to remove a contact from the group (following the instruction pattern)
  onRemoveItem(index: number): void {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }
}
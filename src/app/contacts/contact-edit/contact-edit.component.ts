import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ContactItemComponent } from '../contact-item/contact-item.component';

@Component({
  selector: 'cms-contact-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    ContactItemComponent
  ],
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact | null = null;
  contact: Contact = new Contact('', '', '', '', '', []);
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string = '';

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
        return;
      }

      const fetchedContact = this.contactService.getContact(this.id);
      if (!fetchedContact) return;

      this.originalContact = fetchedContact;
      this.editMode = true;

      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if (this.contact.group) {
        this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
      }
    });
  }

  onSubmit(form: NgForm): void {
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

  onCancel(): void {
    this.router.navigate(['/contacts']);
  }

  onRemoveItem(index: number): void {
    if (index < 0 || index >= this.groupContacts.length) return;
    this.groupContacts.splice(index, 1);
  }

  isInvalidContact(newContact: Contact): boolean {
    if (!newContact) return true;
    if (this.contact && newContact.id === this.contact.id) return true;
    return this.groupContacts.some(c => c.id === newContact.id);
  }

  onDrop(event: CdkDragDrop<Contact[]>): void {
  if (event.previousContainer === event.container) {
    // Moving within the same container (reordering group contacts)
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    // Moving from contact list to group contacts
    const draggedContact = event.previousContainer.data[event.previousIndex];
    
    if (this.isInvalidContact(draggedContact)) {
      return;
    }
    
    // Create a copy of the contact and add to group
    const contactCopy = JSON.parse(JSON.stringify(draggedContact));
    
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    
    event.previousContainer.data.splice(event.previousIndex, 0, draggedContact);
  }
}
onContactListDrop(event: CdkDragDrop<Contact[]>): void {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }
}
}
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
  validationMessage: string = ''; 

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
    // Check if there are any invalid contacts in the group
    if (this.hasInvalidContacts()) {
      this.validationMessage = 'Please remove invalid contacts from the group before saving.';
      return;
    }

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
    this.clearValidationMessage(); 
  }

  isInvalidContact(newContact: Contact): boolean {
    if (!newContact) return true;
    if (this.contactService.isContactInGroup(newContact.id, this.contact?.id)) return true;
    
    return false;
  }

  getInvalidContactReason(contact: Contact): string {
    if (this.contact && contact.id === this.contact.id) {
      return 'Cannot add to own group';
    }
    if (this.contactService.isContactInGroup(contact.id, this.contact?.id)) {
      return 'Already in another group';
    }
    return 'Invalid contact';
  }

  hasInvalidContacts(): boolean {
    return this.groupContacts.some(contact => this.isInvalidContact(contact));
  }

  clearValidationMessage(): void {
    this.validationMessage = '';
  }

  onDrop(event: CdkDragDrop<Contact[]>): void {
    this.clearValidationMessage();

    if (event.previousContainer === event.container) {
      // Moving within the same container (reordering group contacts)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Moving from contact list to group contacts
      const draggedContact = event.previousContainer.data[event.previousIndex];
      const contactCopy = JSON.parse(JSON.stringify(draggedContact));
      
      this.groupContacts.splice(event.currentIndex, 0, contactCopy);
      
      // Then check if it's invalid and show validation message
      if (this.isInvalidContact(draggedContact)) {
        if (this.contact && draggedContact.id === this.contact.id) {
          this.validationMessage = 'A contact cannot be added to its own group.';
        } else if (this.contactService.isContactInGroup(draggedContact.id, this.contact?.id)) {
          this.validationMessage = 'This contact is already a member of another group and cannot be added to multiple groups.';
        }
      }
    }
  }
}
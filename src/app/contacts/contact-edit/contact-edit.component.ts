import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cms-contact-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, DragDropModule],
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact | null = null;
  originalContact: Contact | null = null;
  isEditMode = false;
  allContacts: Contact[] = [];
  availableContacts: Contact[] = [];
  groupContacts: Contact[] = [];
  errorMessage = '';
  
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      
      if (id === 'new') {
        this.isEditMode = false;
        this.contact = new Contact('', '', '', '', '', []);
      } else {
        this.isEditMode = true;
        this.contact = this.contactService.getContact(id);
        if (this.contact) {
          // Deep copy the original contact for comparison
          this.originalContact = JSON.parse(JSON.stringify(this.contact));
          this.groupContacts = [...(this.contact.group || [])];
        }
      }
      
      this.loadAvailableContacts();
    });
  }

  loadAvailableContacts(): void {
    this.allContacts = this.contactService.getContacts();
    
    this.availableContacts = this.allContacts.filter(contact => {
      if (this.contact && contact.id === this.contact.id) {
        return false; 
      }
      
   
      return !this.groupContacts.some(groupContact => groupContact.id === contact.id);
    });
  }

  onDrop(event: CdkDragDrop<Contact[]>): void {
    this.errorMessage = '';

    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
  
      const draggedContact = event.previousContainer.data[event.previousIndex];
      
      if (event.container.id === 'group-contacts') {
        if (this.groupContacts.some(contact => contact.id === draggedContact.id)) {
          this.errorMessage = 'Contact can not be added to the group. It is already in group or is the current contact';
          return;
        }
        
        if (this.contact && draggedContact.id === this.contact.id) {
          this.errorMessage = 'Contact can not be added to the group. It is already in group or is the current contact';
          return;
        }
      }
      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
      // Update groupContacts
      this.loadAvailableContacts();
    }
  }

  removeFromGroup(contactToRemove: Contact): void {
    this.groupContacts = this.groupContacts.filter(contact => contact.id !== contactToRemove.id);
    this.loadAvailableContacts();
    this.errorMessage = '';
  }

  onSave(): void {
    if (!this.contact) return;
    

    this.contact.group = [...this.groupContacts];
    
    if (this.isEditMode) {
      this.contactService.updateContact(this.originalContact!, this.contact);
    } else {
      this.contactService.addContact(this.contact);
    }
    
    this.router.navigate(['/contacts']);
  }

  onCancel(): void {
    this.router.navigate(['/contacts']);
  }

  canDropPredicate = (item: any, drop: any) => {
    return true;
  };
}
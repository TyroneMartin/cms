import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ContactItemComponent],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css',
})
export class ContactEditComponent {
groupContacts: Contact[] = [];

  constructor(private router: Router) {}

  onRemoveItem(index: number): void {
    if (index >= 0 && index < this.groupContacts.length) {
      this.groupContacts.splice(index, 1);
    }
  }

  onCancel(): void {
    this.router.navigate(['/contacts']);
  }

  onSubmit(): void {
    console.log('Form submitted');
  }
}

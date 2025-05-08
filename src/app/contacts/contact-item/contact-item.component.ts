import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})
export class ContactItemComponent {
  @Input() contact!: Contact;
  @Output() contactSelected = new EventEmitter<void>();

  onSelected() {
    this.contactSelected.emit();
  }
}
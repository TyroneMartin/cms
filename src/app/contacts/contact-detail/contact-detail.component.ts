import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit {
  @Input() contact!: Contact;

  constructor() {}

  ngOnInit(): void {
    if (!this.contact) {
      this.contact = {
        id: '1',
        name: 'Bro. Jackson',
        email: 'jacksonk@byui.edu',
        phone: '208-496-3771',
        imageUrl: 'assets/images/jacksonk.jpg',
        group: [],
      };
    }
  }

  onEdit() {
    console.log('Edit button clicked');
  }

  onDelete() {
    console.log('Delete button clicked');
  }
}
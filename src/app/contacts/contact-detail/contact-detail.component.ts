import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  imports: [],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent implements OnInit {
  // Initialize with an empty Contact object
  contact: Contact = {
    id: '',
    name: '',
    email: '',
    phone: '',
    imageUrl: '',
    group: []
  };

  constructor() { }

  ngOnInit(): void {
    // To be populate with real data later 
    this.contact = {
      id: '1',
      name: 'Bro. Jackson',
      email: 'jacksonk@byui.edu',
      phone: '208-496-3771',
      imageUrl: 'assets/images/jacksonk.jpg',
      group: []
    };
  }

  onEdit() {
    console.log('Edit button clicked');
    
  }

  onDelete() {
    console.log('Delete button clicked');
  }
}

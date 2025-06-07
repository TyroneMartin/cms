import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactItemComponent } from '../contact-item/contact-item.component';

@Component({
  selector: 'cms-contact-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ContactItemComponent],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();

    this.contactService.contactChangedEvent.subscribe((updatedContacts: Contact[]) => {
      this.contacts = updatedContacts;
    });
  }
}

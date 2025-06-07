import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import e from 'express';

@Component({
  selector: 'cms-contact-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css',
})
export class ContactDetailComponent implements OnInit {
  contact!: Contact;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // console.log("ContactDetailComponent initialized");
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        const foundContact = this.contactService.getContact(id);
        if (foundContact) {
          this.contact = foundContact;
        }
      } 
      // else {
      //   this.contact = {
      //     id: '',
      //     name: '',
      //     email: '',
      //     phone: '',
      //     imageUrl: '',
      //     group: null
      //   };
      // }
    });
  }

  onEdit() {
    // console.log('Edit button clicked');
    if (this.contact) {
      this.router.navigate(['/contacts', this.contact.id, 'edit']);
    }
  }

  onDelete() {
    console.log('Delete button clicked');
    if (this.contact) {
      this.router.navigate(['/contacts']);
    }
  }
}
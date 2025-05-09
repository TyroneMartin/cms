import { Component, OnInit, Input } from '@angular/core';
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
  //  constructor() {}      

  ngOnInit() {
    console.log("ContactDetailComponent initialized");
  }

  onEdit() {
    console.log('Edit button clicked');
  }

  onDelete() {
    console.log('Delete button clicked');
  }
}
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Contact } from '../contact.model';
// import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})
export class ContactItemComponent {
  @Input() contact!: Contact;

  // constructor(
  //   private router: Router,
  //   private contactService: ContactService
  // ) {}
}
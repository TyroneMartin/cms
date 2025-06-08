import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit {
  contact: Contact | null = null;
  nativeWindow: any;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private windRefService: WindRefService
  ) {}

  ngOnInit(): void {
    this.nativeWindow = this.windRefService.getNativeWindow();
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.contact = this.contactService.getContact(id);
    });
  }

  onDelete(): void {
    if (this.contact) {
      this.contactService.deleteContact(this.contact);
      this.router.navigateByUrl('/contacts');
    }
  }

  onEdit(): void {
    if (this.contact) {
      this.router.navigate(['/contacts', this.contact.id, 'edit']);
    }
  }
}

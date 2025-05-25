import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../message.model';
import { Contact } from '../../contacts/contact.model';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css',
})
// export class MessageItemComponent {
export class MessageItemComponent implements OnInit {
  @Input() message!: Message;
  messageSender!: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    const contact = this.contactService.getContact(this.message.sender);
    if (contact) {
      this.messageSender = contact.name;
    } else {
      this.messageSender = 'Unknown Sender';
    }
  }
}

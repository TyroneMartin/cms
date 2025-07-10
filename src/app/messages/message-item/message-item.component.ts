import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
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
export class MessageItemComponent implements OnInit, OnDestroy {
  @Input() message!: Message;
  messageSender: string = 'Loading...';
  private subscription!: Subscription;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    console.log('MessageItemComponent initialized with message:', this.message);
    
    // Initial attempt
    this.setSender();
    
    // Subscribe to contact changes
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        console.log('Contact list changed, updating sender...');
        this.setSender();
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private setSender() {
    if (!this.message || !this.message.sender) {
      console.log('No message or sender ID available');
      this.messageSender = 'Unknown Sender';
      return;
    }

    console.log('Looking for sender with ID:', this.message.sender);
    const contact: Contact | null = this.contactService.getContact(this.message.sender);
    
    if (contact) {
      this.messageSender = contact.name;
      console.log('Set message sender to:', this.messageSender);
    } else {
      this.messageSender = 'Unknown Sender';
      console.log('Could not find contact for sender ID:', this.message.sender);
    }
  }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../message.model';
import { MessageItemComponent } from '../message-item/message-item.component';
import { MessageEditComponent } from '../message-edit/message-edit.component';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-list',
  standalone: true,
  imports: [CommonModule, MessageItemComponent, MessageEditComponent],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
// export class MessageListComponent {

// messages: Message[] = [
//   new Message(
//     '1',
//     'Self Reliance',
//     'How can you be self reliant?',
//     'Jody Smith'
//   )
// ];
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  private subscription!: Subscription;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messages = this.messageService.getMessages();

    // Subscribe to changes
    this.subscription = this.messageService.messageChangedEvent.subscribe(
      (messages: Message[]) => {
        console.log('Received updated messages:', messages);
        this.messages = messages;
      }
    );
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../message.model';
import { MessageItemComponent } from '../message-item/message-item.component';
import { MessageEditComponent } from '../message-edit/message-edit.component';


@Component({
  selector: 'cms-message-list',
  standalone: true,
  imports: [CommonModule, MessageItemComponent, MessageEditComponent],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [
    new Message(
      '1', 
      'Self Reliance', 
      'How can you be self reliant?', 
      'Jody Smith'
    ),
    new Message(
      '2', 
      'Work Life Balance', 
      'Does anyone else struggle with work life balance?', 
      'Billy Elliot'
    ),
    new Message(
      '3', 
      'Procrastination', 
      'How to stop procrastinating?', 
      'Kelly Lopez'
    )
  ];
  
  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
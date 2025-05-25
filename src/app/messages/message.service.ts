import { Injectable, EventEmitter } from '@angular/core';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = [];

  messageChangedEvent = new EventEmitter<Message[]>();
  
  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages() {
    return this.messages.slice();
  }

  getMessage(id: string): Message | null {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
    console.log('Messages after add:', this.messages);
  }

}

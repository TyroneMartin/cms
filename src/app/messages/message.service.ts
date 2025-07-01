import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = [];
  maxMessageId: number;

  messageChangedEvent = new EventEmitter<Message[]>();
  
  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;
    
    for (let message of this.messages) {
      const currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    
    return maxId;
  }

  getMessages() {
    this.http.get<Message[]>('https://wdd430-cms-application-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages ? messages : [];
          this.maxMessageId = this.getMaxId();
          this.messages.sort((a, b) => {
            if (a.subject < b.subject) return -1;
            if (a.subject > b.subject) return 1;
            return 0;
          });
          this.messageChangedEvent.emit(this.messages.slice());
        },
        (error: any) => {
          console.error('Error fetching messages:', error);
        }
      );
    
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

  storeMessages() {
    const messagesString = JSON.stringify(this.messages);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put('https://wdd430-cms-application-default-rtdb.firebaseio.com/messages.json', 
      messagesString, 
      { headers: headers })
      .subscribe(
        () => {
          this.messageChangedEvent.emit(this.messages.slice());
        },
        (error: any) => {
          console.error('Error storing messages:', error);
        }
      );
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }

    this.maxMessageId++;
    message.id = this.maxMessageId.toString();
    this.messages.push(message);
    this.storeMessages();
    console.log('Messages after add:', this.messages);
  }
}
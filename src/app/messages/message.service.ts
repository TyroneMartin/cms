import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageListChangedEvent = new Subject<Message[]>();
  messages: Message[] = [];
  maxMessageId!: number;

  constructor(private http: HttpClient) {
    this.getMessages();
  }

getMessages(): void {
  this.http.get<{message: string, messages: Message[]}>('http://localhost:3000/api/messages')
    .subscribe(
      (responseData) => {
        this.messages = responseData.messages || [];
        this.sortAndSend();
      },
      (error: any) => {
        console.error('Error fetching messages:', error);
      }
    );
}


  getMessage(id: string): Message | null {
    return this.messages.find(message => message.id === id) || null;
  }

  addMessage(newMessage: Message): void {
    if (!newMessage) return;

    newMessage.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // Add to database
    this.http.post<{ message: string, createdMessage: Message }>(
      'http://localhost:3000/api/messages',
      newMessage,
      { headers }
    ).subscribe(
      (responseData) => {
        this.messages.push(responseData.createdMessage);
        this.sortAndSend();
      },
      (error: any) => {
        console.error('Error adding message:', error);
      }
    );
  }

  updateMessage(originalMessage: Message, newMessage: Message): void {
    if (!originalMessage || !newMessage) {
      return;
    }

    const pos = this.messages.findIndex(m => m.id === originalMessage.id);

    if (pos < 0) {
      return;
    }

    // Set the id of the new Message to the id of the old Message
    newMessage.id = originalMessage.id;
    if (originalMessage.id) {
      newMessage.id = originalMessage.id;
    }

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // Update database
    this.http.put<{ message: string, updatedMessage: Message }>(
      'http://localhost:3000/api/messages/' + originalMessage.id,
      newMessage, 
      { headers }
    ).subscribe(
      (response: any) => {
        this.messages[pos] = newMessage;
        this.sortAndSend();
      },
      (error: any) => {
        console.error('Error updating message:', error);
      }
    );
  }

  deleteMessage(message: Message): void {
    if (!message) {
      return;
    }

    const pos = this.messages.findIndex(m => m.id === message.id);

    if (pos < 0) {
      return;
    }

    // Delete from database
    this.http.delete('http://localhost:3000/api/messages/' + message.id)
      .subscribe(
        (response: any) => {
          this.messages.splice(pos, 1);
          this.sortAndSend();
        },
        (error: any) => {
          console.error('Error deleting message:', error);
        }
      );
  }

  private sortAndSend(): void {
    this.messages.sort((a, b) => a.subject > b.subject ? 1 : -1);
    this.messageListChangedEvent.next(this.messages.slice());
  }
}
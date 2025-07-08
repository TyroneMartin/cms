import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId!: number;

  constructor(private http: HttpClient) {
    this.getMessages();
  }

  getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getMessages(): void {
    this.http.get<Message[]>('http://localhost:3000/messages')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages || [];
          this.maxMessageId = this.getMaxId();
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

    this.http.post<{ statusMessage: string, message: Message }>(
      'http://localhost:3000/messages',
      newMessage,
      { headers }
    ).subscribe(response => {
      this.messages.push(response.message);
      this.sortAndSend();
    });
  }

  private sortAndSend(): void {
    this.messages.sort((a, b) => a.subject > b.subject ? 1 : -1);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
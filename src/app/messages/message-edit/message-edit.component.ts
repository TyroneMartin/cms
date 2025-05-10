import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-message-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  @ViewChild('subject') subject!: ElementRef;
  @ViewChild('msgText') msgText!: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  
  currentSender: string = 'Tyrone Martin';

  onSendMessage() {
    const subjectValue = this.subject.nativeElement.value;
    const msgTextValue = this.msgText.nativeElement.value;
    
    const newMessage = new Message(
      '001', 
      subjectValue,
      msgTextValue,
      this.currentSender
    );
    
    this.addMessageEvent.emit(newMessage);
    this.onClear();
  }
  
  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
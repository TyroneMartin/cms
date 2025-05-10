import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../message.model';


@Component({
  selector: 'cms-message-item',
    standalone: true,
  imports: [CommonModule],
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent {
  @Input() message!: Message;

}

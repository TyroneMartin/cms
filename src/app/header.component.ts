import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';

@Component({
  selector: 'cms-header',
  standalone: true,
  imports: [CommonModule, DropdownDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() selectedFeatureEvent = new EventEmitter<string>();
  
  onSelected(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }
}
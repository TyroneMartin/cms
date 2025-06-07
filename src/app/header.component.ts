import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownDirective } from './dropdown.directive';

@Component({
  selector: 'cms-header',
  standalone: true,
  imports: [CommonModule, DropdownDirective, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
}
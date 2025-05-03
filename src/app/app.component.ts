import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';

@Component({
  selector: 'cms-root',
  imports: [HeaderComponent, ContactsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cms';
}

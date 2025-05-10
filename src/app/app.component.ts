import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';
// import { ContactsComponent } from './contacts/contacts.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cms-root',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cms';
}
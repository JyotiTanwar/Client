import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { Contact } from './contact.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [RouterModule, ContactListComponent, ContactFormComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  contacts: Contact[] = [];
  selectedContact: Contact | null = null;
  constructor(private router: Router) { }

  addContact(contact: Contact) {
    this.contacts.push(contact);
    this.router.navigate(['/contacts']);
  }

  editContact(contact: Contact) {
    const index = this.contacts.findIndex(c => c.id === contact.id);
    if (index > -1) {
      this.contacts[index] = contact;
    }
    this.router.navigate(['/contacts']);
  }
  showNewButton() {
    return this.router.url === '/contacts' ? true : false;
  }
}
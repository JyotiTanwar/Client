import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { ContactService, Contact } from '../contact.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-contact-list',
  standalone: true,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
  imports: [CommonModule,RouterModule]
})

export class ContactListComponent implements OnInit {
  @Input() contacts: Contact[] = [];
  @Output() edit = new EventEmitter<Contact>();

  selectContact(contact: Contact) {
    this.edit.emit(contact);
    this.router.navigate(['/contacts/edit', contact.id]);
  }

  constructor(private contactService: ContactService,private router: Router) { }

  ngOnInit() {
     this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);
  }

  delete(id: number) {
    this.contactService.deleteContact(id).subscribe(() => {
      this.contacts = this.contacts.filter(c => c.id !== id);
    });
  }
}
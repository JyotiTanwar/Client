import { Routes } from '@angular/router';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactFormComponent } from './contacts/contact-form/contact-form.component';
import { ContactsComponent } from './contacts/contacts.component';

export const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  {
    path: 'contacts', component: ContactsComponent, children: [
      { path: '', component: ContactListComponent },
      { path: 'add', component: ContactFormComponent },
      { path: 'edit/:id', component: ContactFormComponent }
    ]
  }
];
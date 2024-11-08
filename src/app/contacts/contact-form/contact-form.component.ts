import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService, Contact } from '../contact.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements OnInit {
  @Input() contact: Contact | null = null;
  @Output() save = new EventEmitter<Contact>();
  @Output() update = new EventEmitter<Contact>();
  contactForm: FormGroup | undefined;
  contactId: number | undefined;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.contactId = +this.route.snapshot.paramMap.get('id')!;
    if (this.contactId) {
      this.isEditMode = true;
      this.contactService.getContact(this.contactId).subscribe(contact => {
        if (this.contactForm) {
          this.contactForm.patchValue(contact);
        }
      });
    }
  }

  onSubmit() {
    if (this.contactForm!.valid) {
      const contact: Contact = this.contactForm!.value;
      if (this.isEditMode) {
        this.contactService.updateContact(this.contactId, contact).subscribe(() => {
          this.showNotification('Contact updated successfully!');
          this.router.navigate(['/']);
        });
      } else {
        this.contactService.addContact(contact).subscribe(() => {
          this.showNotification('Contact added successfully!');
          this.router.navigate(['/']);
        });
      }
    }
  }
  
  onCancel() {
    this.router.navigate(['/']);
  }

  showNotification(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
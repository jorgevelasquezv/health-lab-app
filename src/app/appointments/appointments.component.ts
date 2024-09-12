import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../auth/services/user.service';
import { User } from '../domain/models/user.model';

@Component({
  selector: 'appointments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css',
})
export default class AppointmentsComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private userService: UserService = inject(UserService);
  private user: User | undefined = this.userService.user();

  public appointmentForm = this.formBuilder.group({
    name: [this.userFullName, [Validators.required, Validators.minLength(3)]],
    email: [this.userEmail, [Validators.required, Validators.email]],
    date: ['', [Validators.required, Validators.minLength(5)]],
    time: ['', [Validators.required, Validators.minLength(5)]],
    appointmentfor: ['', [Validators.required]],
  });

  public get userFullName() {
    return this.user ? `${this.user.name} ${this.user.lastName}` : '';
  }

  public get userEmail() {
    return this.user ? this.user.email : '';
  }

  public get name() {
    return this.appointmentForm.get('name');
  }

  public get email() {
    return this.appointmentForm.get('email');
  }

  public get date() {
    return this.appointmentForm.get('date');
  }

  public get time() {
    return this.appointmentForm.get('time');
  }

  public get appointmentfor() {
    return this.appointmentForm.get('appointmentfor');
  }

  get confirmNameInvalid() {
    if (!this.name) return false;
    return this.name.invalid && this.name.touched;
  }

  get confirmEmailInvalid() {
    if (!this.email) return false;
    return this.email.invalid && this.email.touched;
  }

  get confirmDateInvalid() {
    if (!this.date) return false;
    return this.date.invalid && this.date.touched;
  }

  get confirmTimeInvalid() {
    if (!this.time) return false;
    return this.time.invalid && this.time.touched;
  }

  get confirmAppointmentforInvalid() {
    if (!this.appointmentfor) return false;
    return this.appointmentfor.invalid && this.appointmentfor.touched;
  }

  public makeAppointment() {
    if (this.appointmentForm.invalid) {
      return Object.values(this.appointmentForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

    Swal.fire({
      title: '¡Solicitud de cita enviada!',
      text: 'Recibirás un correo electrónico de confirmación en breve.',
      icon: 'success',
      confirmButtonText: 'OK',
    });

    this.rechargeForm();
  }

  private rechargeForm() {
    this.appointmentForm.reset();
    this.appointmentForm.patchValue({
      name: this.userFullName,
      email: this.userEmail,
    });
  }
}

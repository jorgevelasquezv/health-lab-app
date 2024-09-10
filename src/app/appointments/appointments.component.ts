import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'appointments',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css',
})
export default class AppointmentsComponent {

  makeAppointment() {
    Swal.fire({
      title: 'Appointment Request Sent!',
      text: 'You will receive a confirmation email shortly.',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }

}

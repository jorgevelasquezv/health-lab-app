import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'contact-us',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export default class ContactUsComponent { }

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'home-services',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent { }

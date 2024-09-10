import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'shared-footer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent { }

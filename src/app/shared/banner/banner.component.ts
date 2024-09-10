import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'shraed-banner',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent { }

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'home-gallery',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent { }

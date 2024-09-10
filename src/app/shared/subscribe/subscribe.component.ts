import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'shared-subscribe',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css',
})
export class SubscribeComponent { }

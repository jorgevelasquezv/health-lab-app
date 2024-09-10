import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'home-team',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamComponent { }

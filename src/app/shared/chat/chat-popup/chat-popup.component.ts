import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'shared-chat-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-popup.component.html',
  styleUrl: './chat-popup.component.css',
})
export class ChatPopupComponent {
  @Output() close = new EventEmitter<void>();
  public selectedOption: string | null = null;

  closeChat(): void {
    this.close.emit();
  }

  selectOption(option: string): void {
    this.selectedOption = option;
  }

  goBack(): void {
    this.selectedOption = null;
  }
}

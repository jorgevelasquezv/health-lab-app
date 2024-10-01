import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChatPopupComponent } from '../chat-popup/chat-popup.component';

@Component({
  selector: 'shared-chat-button',
  standalone: true,
  imports: [CommonModule, ChatPopupComponent],
  templateUrl: './chat-button.component.html',
  styleUrl: './chat-button.component.css',
})
export class ChatButtonComponent {
  public isChatOpen = false;

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }
}

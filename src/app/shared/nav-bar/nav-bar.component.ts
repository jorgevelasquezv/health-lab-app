import { AuthService } from './../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, computed, HostListener, inject, Signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthStatus } from '../../domain/enums/auth-status.enum';

@Component({
  selector: 'shared-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  public isAuthenticated: Signal<boolean> = computed(() => this.authService.authStatus() == AuthStatus.authenticated);

  @HostListener('window:scroll', [])
  public onWindowScroll() {
    const navbar = document.querySelector('#header') as HTMLElement;
    if (window.scrollY > 0) {
      navbar.classList.remove('top-header');
      navbar.classList.add('top-fixed');
    } else {
      navbar.classList.remove('top-fixed');
      navbar.classList.add('top-header');
    }
    console.log('scrolling');

  }

  public logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}

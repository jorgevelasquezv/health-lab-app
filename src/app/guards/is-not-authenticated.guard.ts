import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { AuthStatus } from '../domain/enums/auth-status.enum';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.unauthenticated) {
    return true;
  }

  if (authService.authStatus() === AuthStatus.checking) {
    return false;
  }

  router.navigateByUrl('/');

  return true;
};

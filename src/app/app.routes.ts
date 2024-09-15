import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './guards/is-authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/page/home/home.component'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact-us/contact-us.component'),
  },
  {
    path: 'about',
    loadComponent: () => import('./about-us/about-us.component'),
  },
  {
    path: 'appointment',
    loadComponent: () => import('./appointments/appointments.component'),
    canActivate: [isAuthenticatedGuard],
  },
  {
    path: 'medical-record',
    loadComponent: () => import('./medical-record/medical-record.component'),
    canActivate: [isAuthenticatedGuard],
  },
  {
    path: 'exams',
    loadComponent: () => import('./exams/exams.component'),
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component'),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component'),
  },
  {
    path: '**',
    redirectTo: '/',
  }
];

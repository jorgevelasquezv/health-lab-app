import { AuthService } from './../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public login() {
    const email: string = this.loginForm.value.email as string;
    const password: string = this.loginForm.value.password as string;
    if (this.loginForm.valid) {
      this.authService.login(email, password).subscribe({
        next: (user) => {
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido!',
            text: `Bienvenido ${user.name} ${user.lastName}`,
          });
          this.router.navigate(['/']);
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          });
        },
      });
    }
  }
}

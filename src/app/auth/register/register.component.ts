import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Gender } from '../../domain/enums/gender.enum';
import { IdentificationType } from '../../domain/enums/identification-type.enum';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export default class RegisterComponent implements OnDestroy {
  private AuthService: AuthService = inject(AuthService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private registerSubscribe: Subscription = new Subscription();

  public registerForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    gender: ['', [Validators.required]],
    address: ['', [Validators.required, Validators.minLength(4)]],
    country: ['', [Validators.required, Validators.minLength(3)]],
    city: ['', [Validators.required, Validators.minLength(3)]],
    identificationType: ['', [Validators.required]],
    identificationNumber: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnDestroy(): void {
    this.registerSubscribe.unsubscribe();
  }

  public register() {
    const name: string = this.registerForm.value.name as string;
    const lastName: string = this.registerForm.value.lastName as string;
    const gender: Gender = this.registerForm.value.gender as Gender;
    const address: string = this.registerForm.value.address as string;
    const country: string = this.registerForm.value.country as string;
    const city: string = this.registerForm.value.city as string;
    const identificationType: IdentificationType = this.registerForm.value
      .identificationType as IdentificationType;
    const identificationNumber: string = this.registerForm.value
      .identificationNumber as string;
    const email: string = this.registerForm.value.email as string;
    const password: string = this.registerForm.value.password as string;
    const confirmPassword: string = this.registerForm.value
      .confirmPassword as string;
    console.log(this.registerForm.valid && password === confirmPassword);

    if (this.registerForm.valid && password === confirmPassword) {
      this.registerSubscribe = this.AuthService.register({
        name,
        lastName,
        gender,
        address,
        country,
        city,
        identificationType,
        identificationNumber,
        email,
        password,
      }).subscribe({
        next: (user) => {
          this.router.navigate(['/']);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Usuario ${user.name} ${user.lastName} registrado`,
            showConfirmButton: false,
            timer: 1500,
          });
        },
        error: (error) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          });
        },
      });
    }
  }

  get name() {
    return this.registerForm.get<string>('name');
  }

  get lastName() {
    return this.registerForm.get<string>('lastName');
  }

  get email() {
    return this.registerForm.get<string>('email');
  }

  get gender() {
    return this.registerForm.get<string>('gender');
  }

  get address() {
    return this.registerForm.get<string>('address');
  }

  get country() {
    return this.registerForm.get<string>('country');
  }

  get city() {
    return this.registerForm.get<string>('city');
  }

  get identificationType() {
    return this.registerForm.get<string>('identificationType');
  }

  get identificationNumber() {
    return this.registerForm.get<string>('identificationNumber');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get nameInvalid() {
    if (!this.name) return false;
    return this.name.invalid && this.name.touched;
  }

  get lastNameInvalid() {
    if (!this.lastName) return false;
    return this.lastName.invalid && this.lastName.touched;
  }

  get genderInvalid() {
    if (!this.gender) return false;
    return this.gender.invalid && this.gender.touched;
  }

  get addressInvalid() {
    if (!this.address) return false;
    return this.address.invalid && this.address.touched;
  }

  get countryInvalid() {
    if (!this.country) return false;
    return this.country.invalid && this.country.touched;
  }

  get cityInvalid() {
    if (!this.city) return false;
    return this.city.invalid && this.city.touched;
  }

  get identificationTypeInvalid() {
    if (!this.identificationType) return false;
    return this.identificationType.invalid && this.identificationType.touched;
  }

  get identificationNumberInvalid() {
    if (!this.identificationNumber) return false;
    return (
      this.identificationNumber.invalid && this.identificationNumber.touched
    );
  }

  get emailInvalid() {
    if (!this.email) return false;
    return this.email.invalid && this.email.touched;
  }

  get passwordInvalid() {
    if (!this.password) return false;
    return this.password.invalid && this.password.touched;
  }

  get confirmPasswordInvalid() {
    if (!this.confirmPassword) return false;
    if (this.confirmPassword.value !== this?.password?.value) return true;
    return this.confirmPassword.invalid && this.confirmPassword.touched;
  }
}

import { UserService } from './../auth/services/user.service';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { User } from '../domain/models/user.model';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'physic',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './physic.component.html',
  styleUrl: './physic.component.css',
})
export default class PhysicComponent implements OnInit {
  private userService: UserService = inject(UserService);
  private formBuilder = inject(FormBuilder);

  public user: Signal<User | undefined> = computed(() =>
    this.userService.user()
  );

  public fullName = computed(
    () => this.user()?.name + ' ' + this.user()?.lastName
  );

  public physicForm = this.formBuilder.group({
    patientName: [
      this.fullName(),
      [Validators.required, Validators.minLength(3)],
    ],
    medications: this.formBuilder.array([]),
  });

  ngOnInit(): void {
    if (this.medications.length === 0) this.addMedication();
  }

  get medications(): FormArray {
    return this.physicForm.get('medications') as FormArray;
  }

  private createMedicationGroup() {
    return this.formBuilder.group({
      medication: ['', [Validators.required, Validators.minLength(3)]],
      dosage: ['', [Validators.required, Validators.minLength(3)]],
      reason: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  public addMedication(): void {
    this.medications.push(this.createMedicationGroup());
  }

  public removeMedication(index: number): void {
    this.medications.removeAt(index);
  }

  public fieldInvalid(field: AbstractControl<any, any>, name: string): boolean {
    const validField: AbstractControl<any, any> | null = field.get(name);
    if (!validField) return false;
    return validField.invalid && validField.touched;
  }

  public fieldMinLengthInvalid(field: AbstractControl<any, any>, name: string): boolean {
    const validField: AbstractControl<any, any> | null = field.get(name);
    if (!validField) return false;
    return validField.errors?.["minlength"] && validField.touched;
  }

  public onSubmit() {
    if (this.physicForm.invalid) {
      this.physicForm.markAllAsTouched();
      this.medications.controls.forEach((control) =>
        control.markAllAsTouched()
      );
      return;
    }
    Swal.fire({
      icon: 'success',
      title: 'Receta enviada!',
      text: 'La receta fue enviada correctamente',
    });

    this.physicForm.reset();
    this.physicForm.get('patientName')?.setValue(this.fullName());
    this.medications.clear();
    this.addMedication();
  }
}

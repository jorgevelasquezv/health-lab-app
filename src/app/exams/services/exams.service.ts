import { Exam } from '../../domain/models/exam.model';
import { MedicalRecordService } from './../../medical-record/services/medical-record.service';
import { computed, inject, Injectable, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExamsService {
  private medicalRecordService: MedicalRecordService =
    inject(MedicalRecordService);

  public exams: Signal<Exam[] | undefined> = computed(
    () => this.medicalRecordService.medicalRecord()?.exams
  );

  constructor() {}
}

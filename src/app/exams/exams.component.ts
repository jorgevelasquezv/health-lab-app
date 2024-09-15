import { CommonModule } from '@angular/common';
import { Component, computed, inject, Signal } from '@angular/core';
import { Exam } from '../domain/models/exam.model';
import { ExamsService } from './services/exams.service';
import { DownloadPdfService } from '../shared/services/download-pdf.service';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.css',
})
export default class ExamsComponent {
  private downloadPdfService: DownloadPdfService = inject(DownloadPdfService);
  private examsServices: ExamsService = inject(ExamsService);
  public exams: Signal<Exam[]> = computed(
    () => this.examsServices.exams() ?? []
  );

  public downloadExam(exam: Exam): void {
    const path = exam.path ?? 'Physical_Examination.pdf';
    this.downloadPdfService.download(path);
  }
}

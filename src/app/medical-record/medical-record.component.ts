import { CommonModule } from '@angular/common';
import { Component, computed, inject, Signal } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MedicalRecordService } from './services/medical-record.service';
import { DownloadPdfService } from '../shared/services/download-pdf.service';
import { MedicalRecord } from '../domain/models/medical-record.model';

@Component({
  selector: 'medical-record',
  standalone: true,
  imports: [CommonModule, PdfViewerModule],
  templateUrl: './medical-record.component.html',
  styleUrl: './medical-record.component.css',
})
export default class MedicalRecordComponent {
  private downloadPdfService: DownloadPdfService = inject(DownloadPdfService);
  private medicalRecordService: MedicalRecordService =
    inject(MedicalRecordService);
  public medicalRecord: Signal<MedicalRecord | undefined> = computed(() =>
    this.medicalRecordService.medicalRecord()
  );
  public pdfSrc = computed(() =>
    this.medicalRecord()?.path
      ? `/assets/pdfs/${this.medicalRecord()?.path}`
      : '/assets/pdfs/MedicalRecord.pdf'
  );

  downloadPdf() {
    this.downloadPdfService.download(this.pdfSrc());
  }
}

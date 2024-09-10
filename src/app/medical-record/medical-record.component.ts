import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'medical-record',
  standalone: true,
  imports: [CommonModule, PdfViewerModule],
  templateUrl: './medical-record.component.html',
  styleUrl: './medical-record.component.css',
})
export default class MedicalRecordComponent {
  pdfSrc = '/assets/pdfs/MedicalRecord.pdf';

  downloadPdf() {
    const link = document.createElement('a');
    link.href = this.pdfSrc;
    link.download = 'medical-record.pdf';
    link.click();
  }
}

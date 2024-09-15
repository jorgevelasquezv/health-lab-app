import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DownloadPdfService {
  public download(path: string){
    const link = document.createElement('a');
    link.href = `assets/pdfs/${path}`;
    link.download = path;
    link.click();
  }
}

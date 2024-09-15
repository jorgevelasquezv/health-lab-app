import {
  computed,
  inject,
  Injectable,
  OnDestroy,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { MedicalRecord } from './../../domain/models/medical-record.model';
import { environment } from '../../../environments/environment';
import { UserService } from '../../auth/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class MedicalRecordService implements OnDestroy {
  private http: HttpClient = inject(HttpClient);
  private API_URL: string = environment.apiUrl;
  private userService: UserService = inject(UserService);
  private idMedicalRecord: string | undefined =
    this.userService.user()?.idMedicalRecord;
  private subscritionMedicalRecord: Subscription = new Subscription();
  private _medicalRecord: WritableSignal<MedicalRecord | undefined> =
    signal(undefined);
  public medicalRecord: Signal<MedicalRecord | undefined> = computed(() =>
    this._medicalRecord()
  );

  constructor() {
    this.subscritionMedicalRecord = this.getMedicalRecord().subscribe(
      (medicalRecord) => this._medicalRecord.set(medicalRecord)
    );
  }

  ngOnDestroy(): void {
    this.subscritionMedicalRecord.unsubscribe();
  }

  private getMedicalRecord(): Observable<MedicalRecord> {
    return this.http.get<MedicalRecord>(
      `${this.API_URL}/medicalRecords/${this.idMedicalRecord}`
    );
  }
}

import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../../domain/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: WritableSignal<User | undefined> = signal<User | undefined>(
    undefined
  );
  public user = computed(() => this._user());

  constructor() { }

  public setUser(user: User | undefined): void {
    this._user.set(user);
  }
}

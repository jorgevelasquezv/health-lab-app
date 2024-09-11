import { HttpClient } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  OnDestroy,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { catchError, map, Observable, of, Subscription, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { AuthStatus } from '../../domain/enums/auth-status.enum';
import { User } from '../../domain/models/user.model';
import { Role } from '../../domain/enums/role.enum';
import { UserService } from './user.service';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private API_URL: string = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);
  private userService: UserService = inject(UserService);
  private verifiUserLocalStorageSubscription: Subscription = new Subscription();
  private _authStatus: WritableSignal<AuthStatus> = signal<AuthStatus>(
    AuthStatus.checking
  );
  public authStatus: Signal<AuthStatus> = computed(() => this._authStatus());
  private _users: WritableSignal<User[] | undefined> = signal<
    User[] | undefined
  >(undefined);
  public users: Signal<User[]> = computed(() => this._users() ?? []);

  constructor() {
    this.verifiUserLocalStorageSubscription =
      this.checkAuthStatus().subscribe();
  }

  ngOnDestroy(): void {
    this.verifiUserLocalStorageSubscription.unsubscribe();
  }

  private checkAuthStatus() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.logout();
      return of(null);
    }
    return this.findUserById(userId).pipe(
      map((user) => {
        this.setAuthentication(user);
        return user;
      }),
      catchError(() => {
        this.logout();
        return of(null);
      })
    );
  }

  public login(email: string, password: string): Observable<User> {
    return this.http
      .get<[User]>(`${this.API_URL}/users`, { params: { email, password } })
      .pipe(map((users) => users[0]))
      .pipe(
        map((user) => {
          if (!user) throw new Error('Credenciales invalidas');
          if (!user.isActive) throw new Error('Usuario inactivo');
          if (user.password !== password)
            throw new Error('Credenciales invalidas');
          this.setAuthentication(user);
          return user;
        })
      );
  }

  private setAuthentication(user: User): boolean {
    this.userService.setUser(user);
    this._authStatus.set(AuthStatus.authenticated);
    if (user.id) localStorage.setItem('userId', user.id);
    return true;
  }

  public register(user: User): Observable<User> {
    user.role = Role.User;
    return this.findUserByEmail(user.email)
      .pipe(
        map((users) => {
          if (users.length) throw new Error('El email ya esta registrado');
          return user;
        })
      )
      .pipe(
        switchMap(() => {
          this.setAuthentication(user);
          return this.createUser(user);
        })
      );
  }

  private createUser(user: User): Observable<User> {
    user.id = uuidv4();
    user.isActive = true;
    if (!user.role) user.role = Role.User;
    return this.http.post<User>(`${this.API_URL}/users`, user);
  }

  private findUserByEmail(email: string): Observable<[User]> {
    return this.http.get<[User]>(`${this.API_URL}/users`, {
      params: { email },
    });
  }

  public findUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/users`).pipe(
      map((users) => {
        this._users.set(users);
        return users;
      })
    );
  }

  public setUsers(users: User[]) {
    this._users.set(users);
  }

  public findUserById(id: string): Observable<User> {
    return this.http
      .get<[User]>(`${this.API_URL}/users/`, { params: { id } })
      .pipe(map((users) => users[0]))
      .pipe(
        map((user) => {
          if (!user) throw new Error('Usuario no encontrado');
          return user;
        })
      );
  }

  public updtaeUser(user: User): Observable<User> {
    if (!user.id) throw new Error('Usuario no encontrado');
    return this.http.put<User>(`${this.API_URL}/users/${user.id}`, user);
  }

  public deleteUser(user: User): Observable<User> {
    if (!user.id) throw new Error('Usuario no encontrado');
    return this.http.delete<User>(`${this.API_URL}/users/${user.id}`);
  }

  public logout(): void {
    localStorage.removeItem('userId');
    this.userService.setUser(undefined);
    this._authStatus.set(AuthStatus.unauthenticated);
  }
}

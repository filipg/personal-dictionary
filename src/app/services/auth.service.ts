import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../interfaces/auth-response';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Subject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponse>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD2TZ9Arcxek6JBWLoNVrths5G-qG0vN3Y', {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      catchError(errorResp => throwError(errorResp)),
      tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn))
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD2TZ9Arcxek6JBWLoNVrths5G-qG0vN3Y', {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      catchError(errorResp => throwError(errorResp)),
      tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn))
    );
  }

  logout() {
    this.user.next(null);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(
      new Date().getTime() + +expiresIn * 1000
    );
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
  }

}

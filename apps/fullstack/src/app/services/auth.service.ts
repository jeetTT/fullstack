import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  constructor(private _http: HttpClient) { }


  loginIn(user: User) {
    let { email, password } = user;
    return this._http.post<User>(`${this.baseUrl}login`, { email, password });
  }
  signUp(user: User) {
    let { name, email, password } = user;
    return this._http.post<User>(`${this.baseUrl}register`, { name, email, password });
  }
  forgotPassword(user: User) {
    let { email } = user;
    return this._http.post<User>(`${this.baseUrl}checkEmail`, { email });
  }
  resetPassword(user: User) {
    let { password, email } = user;
    return this._http.post<User>(`${this.baseUrl}reset-password`, { password, email });
  }
  logout(user: User) {
    return this._http.get<User>(`${this.baseUrl}logout`, {});
  }
  getUser(user: User) {
    let header = new HttpHeaders().set(
      "Authorization", 'Bearer ' + user.token
    )
    return this._http.get<User>(`${this.baseUrl}users`, { headers: header });
  }
}
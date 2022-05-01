import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { User } from '../../interfaces/request/user.request.interface';
import { LoginResponse } from '../../interfaces/response/login.response.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //private apiUrl = "https://endotest-app.herokuapp.com/user"
  private apiUrl = "http://localhost:8080/user"

  constructor(private http: HttpClient) { }

  login(userData: User): Observable<LoginResponse>{
    const url = `${ this.apiUrl }/login`;
    return this.http.post<LoginResponse>(url,userData);
  }
}

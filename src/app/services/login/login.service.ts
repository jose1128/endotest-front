import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { User } from '../../interfaces/request/user.request.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = "https://endotest-app.herokuapp.com/user"

  constructor(private http: HttpClient) { }

  login(userData: User): Observable<any>{
    const url = `${ this.apiUrl }/login`;
    return this.http.post(url,userData);
  }
}

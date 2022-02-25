import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from 'src/app/interfaces/gender.interface';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  private apiUrl = "https://endotest-app.herokuapp.com"

  constructor(private http: HttpClient) { }

  getGenders(): Observable<Gender[]>{
    const url = `${this.apiUrl}/gender`;
    return this.http.get<Gender[]>(url);
  }
}

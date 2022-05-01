import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EpsResponse } from 'src/app/interfaces/response/eps.response.interface';

@Injectable({
  providedIn: 'root'
})
export class EpsService {

  private apiUrl = "http://localhost:8080/eps";

  constructor(private http: HttpClient) { }

  getAllEps(): Observable<EpsResponse[]>{
    return this.http.get<EpsResponse[]>(this.apiUrl);
  }

  getById(idEps: String): Observable<EpsResponse>{
    const url = `${this.apiUrl}/${idEps}`;
    console.log(url)
    return this.http.get<EpsResponse>(url);
  }
}
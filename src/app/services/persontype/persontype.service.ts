import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonTypeResponse } from 'src/app/interfaces/response/persontype.response.interface';

@Injectable({
  providedIn: 'root'
})
export class PersontypeService {

  private apiUrl = "http://localhost:8080/persontype"

  constructor(private http: HttpClient) { }

  findPersonTypeByDescription(description: String): Observable<PersonTypeResponse>{
    const url = `${this.apiUrl}/${description}`;
    return this.http.get<PersonTypeResponse>(url);
  }
}

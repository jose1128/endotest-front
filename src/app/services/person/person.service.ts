import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../../interfaces/person.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = "https://endotest-app.herokuapp.com"

  constructor(private http: HttpClient) { }

  findPersonByDocumentNumber(documentNumber: Number) : Observable<Person>{
    const url = `${this.apiUrl}/person/${documentNumber}`;
    return this.http.get<Person>(url);
  }

  
}
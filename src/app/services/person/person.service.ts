import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../../interfaces/person.interface';
import { PersonRequest } from '../../interfaces/request/person.request.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = "https://endotest-app.herokuapp.com/person"
  //private apiUrl = "http://localhost:8080/person"

  constructor(private http: HttpClient) { }

  findPersonByDocumentNumber(documentNumber: Number) : Observable<Person>{
    const url = `${this.apiUrl}/${documentNumber}`;
    return this.http.get<Person>(url);
  }

  createPerson(personData: PersonRequest): Observable<Person>{
    return this.http.post<Person>(this.apiUrl, personData);
  }
}
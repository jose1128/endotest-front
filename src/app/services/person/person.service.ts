import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../../interfaces/response/person.response.interface';
import { PersonRequest } from '../../interfaces/request/person.request.interface';
import { PatienceResponse } from 'src/app/interfaces/response/patience.response.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  //private apiUrl = "https://endotest-app.herokuapp.com/person"
  private apiUrl = "http://localhost:8080/person"

  constructor(private http: HttpClient) { }

  findPersonByDocumentNumber(documentNumber: Number) : Observable<PatienceResponse>{
    const url = `${this.apiUrl}/${documentNumber}`;
    return this.http.get<PatienceResponse>(url);
  }

  createPerson(personData: PersonRequest): Observable<Person>{
    return this.http.post<Person>(this.apiUrl, personData);
  }
}
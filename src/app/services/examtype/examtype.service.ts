import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamTypeResponse } from 'src/app/interfaces/response/examtype.response.interface';

@Injectable({
  providedIn: 'root'
})
export class ExamtypeService {

  private apiUrl = "http://localhost:8080/examtype"

  constructor(private http: HttpClient) { }

  getExamTypes(): Observable<ExamTypeResponse[]>{
    return this.http.get<ExamTypeResponse[]>(this.apiUrl);
  }
}

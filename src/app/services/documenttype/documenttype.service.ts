import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentType } from 'src/app/interfaces/documenttype.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumenttypeService {
  //private apiUrl = "https://endotest-app.herokuapp.com"
  private apiUrl = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  getDocumentTypes(): Observable<DocumentType[]>{
    const url = `${this.apiUrl}/documenttype`;
    return this.http.get<DocumentType[]>(url);
  }
}

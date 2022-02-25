import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Diagnostic } from '../../interfaces/diagnostic.interface'
import { Observable} from 'rxjs';
import { DiagnosticResponse } from 'src/app/interfaces/response.diagnostic.interface';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticService {
  private apiUrl = "https://endotest-app.herokuapp.com"
  //private apiUrl = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  createDiagnostic(diagnosticData : Diagnostic) : Observable<DiagnosticResponse>{
    const url = `${ this.apiUrl }/exam`;

    let httpOptions = {
      headers: new HttpHeaders({
        'eps': diagnosticData.eps,
        'antecedent': diagnosticData.antecedent,
        'reasonForConsultation': diagnosticData.reasonForConsultation,
        'physicalExam': diagnosticData.physicalExam,
        'observations':  diagnosticData.observations,
        'idPatient': diagnosticData.idPatient,
        'idSpecialist': diagnosticData.idSpecialist
      }),
    };

    const formData = new FormData()
  
    formData.append("image1", diagnosticData.filesToUpload[0]);
    formData.append("image2", diagnosticData.filesToUpload[1]);
    formData.append("image3", diagnosticData.filesToUpload[2]);
    return this.http.post<DiagnosticResponse>(url, formData, httpOptions);
  }

  getAllDiagnostics() : Observable<Diagnostic[]>{
    const url = `${ this.apiUrl }/exam`;
    return this.http.get<Diagnostic[]>(url);
  }

  getDiagnosticsOfClientByDocumentNumber(documentNumber:  String) : Observable<DiagnosticResponse[]>{
    const url = `${ this.apiUrl }/exam/${documentNumber }/client`;
    return this.http.get<DiagnosticResponse[]>(url);
  }
}
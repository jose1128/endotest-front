import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiagnosticResponse } from 'src/app/interfaces/response.diagnostic.interface';
import { DiagnosticService } from 'src/app/services/diagnostic/diagnostic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public findDiagnostic: FormGroup;
  public diagnosticList: DiagnosticResponse[] = [];


  constructor(private formBuilder: FormBuilder,
              public diagnosticService: DiagnosticService) {}

  ngOnInit(): void {
    this.buildFindDiagnostic();
  }

  searchClient(){
    if(this.findDiagnostic.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El Nro. Documento se encuentra vacio',
      })
      return;
    }

    const documentNumber = this.findDiagnostic.value.clientDocument;
    this.diagnosticService.getDiagnosticsOfClientByDocumentNumber(documentNumber).subscribe({
      next: response => {
        this.diagnosticList = response
        this.findDiagnostic.reset();
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.error}`,
        })
        this.findDiagnostic.reset();
      }
    });
  }

  private buildFindDiagnostic(){
    this.findDiagnostic = this.formBuilder.group({
      clientDocument: [, Validators.required]
    });
  }
}

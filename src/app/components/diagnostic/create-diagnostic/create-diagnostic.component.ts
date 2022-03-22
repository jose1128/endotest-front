import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiagnosticService } from '../../../services/diagnostic/diagnostic.service';
import Swal from 'sweetalert2';
import { Diagnostic } from '../../../interfaces/diagnostic.interface';
import { PersonService } from '../../../services/person/person.service';
import { DiagnosticResponse } from '../../../interfaces/response.diagnostic.interface';

@Component({
  selector: 'app-create-diagnostic',
  templateUrl: './create-diagnostic.component.html',
  styleUrls: ['./create-diagnostic.component.css']
})
export class CreateDiagnosticComponent implements OnInit {

  public diagnosticForm : FormGroup;
  public findPatienceForm: FormGroup;
  public files: Array<File> = [];
  public customerFound : Boolean;
  public idPerson: Number;
  public image: String;
  public diagnosticData: DiagnosticResponse;
  public isVisibleFindUser: Boolean;

  constructor(
    public diagnosticService : DiagnosticService,
    public personService : PersonService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildFormDiagnostic();
    this.buildFormFindClient();
    this.customerFound = false;
    this.isVisibleFindUser = true;
  }

  createDiagnostic(){
    if(this.diagnosticForm.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Alguno de los campos se encuentra vacio',
      })
    }
    const diagnosticInfo : Diagnostic = {
      eps : this.diagnosticForm.value.eps,
      antecedent: this.diagnosticForm.value.antecedent,
      reasonForConsultation : this.diagnosticForm.value.reasonForConsultation,
      physicalExam: this.diagnosticForm.value.physicalExam,
      observations: this.diagnosticForm.value.observations,
      idPatient : this.idPerson.toString(),
      idSpecialist: '2',
      filesToUpload: this.files
    }
    
    this.diagnosticService.createDiagnostic(diagnosticInfo).subscribe({
      next: (diagnosticResponse: DiagnosticResponse) => {
        Swal.fire(
          `El diagnostico fue creado exitosamente`,
          '',
          'success'
        );
        this.diagnosticForm.reset();
        this.customerFound = false;
        this.diagnosticData = diagnosticResponse;
        this.customerFound = false;
      },
      error: (e) => {
        console.log(e)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrio un error creando el diagnostico',
        })
        this.diagnosticForm.reset();
        this.customerFound = false;
      }
    });
  }

  searchClient(){
    if(this.findPatienceForm.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El Nro. Documento se encuentra vacio',
      })
      return;
    }

    const documentNumber = this.findPatienceForm.value.documentNumberPatience;
    this.personService.findPersonByDocumentNumber(documentNumber).subscribe({
      next: (patienceResponse) => {
        console.log(patienceResponse)
        Swal.fire({
          title: `El cliente encontrado es: ${patienceResponse.name} `,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Si',
          denyButtonText: `No`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('Crear Diagnostico', '', 'success')
            this.findPatienceForm.reset();
            this.customerFound = true;
            this.isVisibleFindUser = false;
            this.idPerson = patienceResponse.id;
            this.diagnosticForm.controls['idPatient'].setValue(patienceResponse.documentNumber);
            this.findPatienceForm.reset();
          } else if (result.isDenied) {
            Swal.fire('Si el cliente no fue encontrado, intentalo de nuevo', '', 'info')
            this.findPatienceForm.reset();
            this.customerFound = false;
          }
        })
      },
      error: (e) => {
         Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${e.error}`,
        })
        console.log(e);
        this.findPatienceForm.reset();
      }
    });
  }

  handleFileInput(event: any) {
    Array.from(event.target.files).forEach((image: any) => {
      console.log(image)
      this.files.push(image);
    });
  }

  fieldIsValid(field: string){
    return this.diagnosticForm.controls[field].errors && this.diagnosticForm.controls[field].touched;
  }

  private buildFormDiagnostic(){
    this.diagnosticForm = this.formBuilder.group({
      eps: [, Validators.required],
      reasonForConsultation: [, Validators.required],
      observations: [, Validators.required],
      physicalExam: [, Validators.required],
      antecedent: [, Validators.required],
      idPatient: [, Validators.required],
      files: [, Validators.required]
    });
  }

  private buildFormFindClient(){
    this.findPatienceForm = this.formBuilder.group({
      documentNumberPatience: [, Validators.required]
    });
  }
} 
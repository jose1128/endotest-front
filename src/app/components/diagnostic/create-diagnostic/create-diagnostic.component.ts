import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiagnosticService } from '../../../services/diagnostic/diagnostic.service';
import Swal from 'sweetalert2';
import { Diagnostic } from '../../../interfaces/request/diagnostic.request.interface';
import { PersonService } from '../../../services/person/person.service';
import { DiagnosticResponse } from '../../../interfaces/response.diagnostic.interface';
import { ExamtypeService } from 'src/app/services/examtype/examtype.service';
import { ExamTypeResponse } from 'src/app/interfaces/response/examtype.response.interface';
import { EpsService } from 'src/app/services/eps/eps.service';
import { EpsResponse } from 'src/app/interfaces/response/eps.response.interface';
import { PatienceResponse } from 'src/app/interfaces/response/patience.response.interface';

@Component({
  selector: 'app-create-diagnostic',
  templateUrl: './create-diagnostic.component.html'
})
export class CreateDiagnosticComponent implements OnInit {

  public diagnosticForm : FormGroup;
  public findPatienceForm: FormGroup;
  public files: Array<File> = [];
  public customerFound : Boolean;
  public idPerson: String;
  public image: String;
  public diagnosticData: DiagnosticResponse;
  public isVisibleFindUser: Boolean;
  public loaderVisible: boolean;
  public examTypeList: ExamTypeResponse[];

  constructor(
    public diagnosticService : DiagnosticService,
    public personService : PersonService,
    public examTypeService: ExamtypeService,
    public epsService: EpsService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loaderVisible = true;
    this.buildFormDiagnostic();
    this.buildFormFindClient();
    this.loaderVisible = false;
    this.loadInitialData();
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
    
    this.loaderVisible = true;
    const idSpecialist = localStorage.getItem("idPerson");

    let observation: string = this.diagnosticForm.value.observations
    let antecedent: string = this.diagnosticForm.value.antecedent
    let reasonForConsultation: string = this.diagnosticForm.value.reasonForConsultation
    let physicalExam: string = this.diagnosticForm.value.physicalExam
    let examType: string = this.diagnosticForm.value.examType;

    const diagnosticInfo : Diagnostic = {
      antecedent: antecedent.replace(/(\r\n|\n|\r)/gm, "").trim(),
      reasonForConsultation : reasonForConsultation.replace(/(\r\n|\n|\r)/gm, "").trim(),
      physicalExam: physicalExam.replace(/(\r\n|\n|\r)/gm, "").trim(),
      observations: observation.replace(/(\r\n|\n|\r)/gm, "").trim(),
      idPatient : this.idPerson.toString(),
      idSpecialist: idSpecialist,
      idExamType: examType,
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
        this.diagnosticData = diagnosticResponse;
        this.customerFound = false;
        this.isVisibleFindUser = true;
        console.log(diagnosticResponse);
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
        this.isVisibleFindUser = true;
      }
    });
    this.loaderVisible = false;
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

    this.loaderVisible = true;
    const documentNumber = this.findPatienceForm.value.documentNumberPatience;
    this.personService.findPersonByDocumentNumber(documentNumber).subscribe({
      next: (patienceResponse: PatienceResponse) => {
        console.log(patienceResponse)
        Swal.fire({
          title: `El cliente encontrado es: ${patienceResponse.name} `,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Si',
          denyButtonText: `No`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.findPatienceForm.reset();
            this.customerFound = true;
            this.isVisibleFindUser = false;
            this.idPerson = patienceResponse.id;
            this.diagnosticForm.controls['idPatient'].setValue(patienceResponse.documentNumber);
            this.diagnosticForm.controls['namePatience'].setValue(patienceResponse.name);

            this.epsService.getById(patienceResponse.idEps.toString()).subscribe({
              next: (response: EpsResponse) =>  this.diagnosticForm.controls['eps'].setValue(response.description),
              error: (e) => console.log(e)
            });

            this.findPatienceForm.reset();
            console.log(patienceResponse);
          } else if (result.isDenied) {
            Swal.fire('Si el Paciente no fue encontrado, intentalo de nuevo', '', 'info')
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
    this.loaderVisible = false;
  }

  handleFileInput(event: any) {
    Array.from(event.target.files).forEach((image: any) => {
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
      namePatience: [, Validators.required],
      files: [, Validators.required],
      examType: [, Validators.required]
    });
  }

  private buildFormFindClient(){
    this.findPatienceForm = this.formBuilder.group({
      documentNumberPatience: [, Validators.required]
    });
  }

  private loadInitialData(){
    this.examTypeService.getExamTypes().subscribe({
      next: (dataResponse: ExamTypeResponse[]) => this.examTypeList =  dataResponse,
      error: (e) => console.log(e)
    });
  }
} 
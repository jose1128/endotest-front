import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentType } from 'src/app/interfaces/documenttype.interface';
import { Gender } from 'src/app/interfaces/gender.interface';
import { DocumenttypeService } from 'src/app/services/documenttype/documenttype.service';
import { GenderService } from '../../services/gender/gender.service';
import { PersonRequest } from '../../interfaces/request/person.request.interface';
import Swal from 'sweetalert2';
import { PersonService } from 'src/app/services/person/person.service';
import { Person } from 'src/app/interfaces/response/person.response.interface';
import { EpsService } from 'src/app/services/eps/eps.service';
import { EpsResponse } from 'src/app/interfaces/response/eps.response.interface';
import { PersontypeService } from 'src/app/services/persontype/persontype.service';
import { PersonTypeResponse } from 'src/app/interfaces/response/persontype.response.interface';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clientForm: FormGroup;
  genderList: Gender[];
  documentTypeList: DocumentType[];
  epsList: EpsResponse[];
  idPersonType: number;
  loaderVisible: boolean;

  constructor(public genderService: GenderService,
    public documentTypeService: DocumenttypeService,
    public personService: PersonService,
    public epsService: EpsService,
    public personTypeService: PersontypeService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loaderVisible = true
    this.buildFormClient();
    this.loadInitialData();
    this.loaderVisible = false;
  }

  createClient(){
    if(this.clientForm.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Alguno de los campos se encuentra vacio',
      })
      return;
    }

    const personData: PersonRequest = {
      name: this.clientForm.value.clientName,
      address: this.clientForm.value.clientAddress,
      documentNumber: this.clientForm.value.documentNumber,
      dateOfBirth: this.clientForm.value.dateOfBirth,
      idDocumentType: this.clientForm.value.documentType,
      idGender: this.clientForm.value.gender,
      idPersonType: this.idPersonType,
      idEps: this.clientForm.value.eps,
    }

    this.loaderVisible = true;
    this.personService.createPerson(personData).subscribe({
      next: (response: Person) => {
        console.log(response);
        Swal.fire(
          `El paciente ${personData.name} fue creado exitosamente`,
          '',
          'success'
        );
      },
      error: (e) => {
        console.log(e)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error creando el paciente, intentelo de nuevo',
        })
      }
    });
    this.clientForm.reset();
    this.loaderVisible = false;
  }

  private buildFormClient() {
    this.clientForm = this.formBuilder.group({
      clientName: [, Validators.required],
      clientAddress: [, Validators.required],
      documentNumber: [, Validators.required],
      telephone: [, Validators.required],
      documentType: [, Validators.required],
      gender: [, Validators.required],
      eps: [, Validators.required],
      dateOfBirth: [, Validators.required]
    });
  }

  private loadInitialData(){
    this.genderService.getGenders().subscribe({
      next: (data: Gender[]) => this.genderList = data,
      error: (e) => console.log(e)
    });

    this.documentTypeService.getDocumentTypes().subscribe({
      next: (data: DocumentType[]) => this.documentTypeList = data,
      error: (e) => console.log(e)
    });

    this.epsService.getAllEps().subscribe({
      next: (data: EpsResponse[]) => this.epsList = data,
      error: (e) => console.log(e)
    });

    this.personTypeService.findPersonTypeByDescription("Paciente").subscribe({
      next: (data: PersonTypeResponse) => this.idPersonType = data.id,
      error: (e) => console.log(e)
    });
  }
}

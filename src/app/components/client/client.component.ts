import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentType } from 'src/app/interfaces/documenttype.interface';
import { Gender } from 'src/app/interfaces/gender.interface';
import { DocumenttypeService } from 'src/app/services/documenttype/documenttype.service';
import { GenderService } from '../../services/gender/gender.service';
import { PersonRequest } from '../../interfaces/request/person.request.interface';
import Swal from 'sweetalert2';
import { PersonService } from 'src/app/services/person/person.service';
import { Person } from 'src/app/interfaces/person.interface';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {

  clientForm: FormGroup;
  genderList: Gender[];
  documentTypeList: DocumentType[];

  constructor(public genderService: GenderService,
    public documentTypeService: DocumenttypeService,
    public personService: PersonService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadGender();
    this.loadDocumentType();
    this.buildFormClient();
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
      idDocumentType: this.clientForm.value.documentType,
      idGender: this.clientForm.value.gender,
      idPersonType: 1
    } 

    this.personService.createPerson(personData).subscribe({
      next: (response: Person) => {
        console.log(response);
        Swal.fire(
          `El cliente ${personData.name} fue creado exitosamente`,
          '',
          'success'
        );
      },
      error: (e) => {
        console.log(e)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error creando el cliente, intentelo de nuevo',
        })
      }
    });
    this.clientForm.reset();
  }
 
  private loadGender() {
    this.genderService.getGenders().subscribe({
      next: (data: Gender[]) => this.genderList = data,
      error: (e) => console.log(e)
    });
  }
  

  private loadDocumentType() {
    this.documentTypeService.getDocumentTypes().subscribe({
      next: (data: DocumentType[]) => this.documentTypeList = data,
      error: (e) => console.log(e)
    });
  }

  private buildFormClient() {
    this.clientForm = this.formBuilder.group({
      clientName: [, Validators.required],
      clientAddress: [, Validators.required],
      eps: [, Validators.required],
      documentNumber: [, Validators.required],
      telephone: [, Validators.required],
      documentType: [, Validators.required],
      gender: [, Validators.required],
    });
  }
}
